import { useState, useEffect, useRef } from "react";
import {
    Container,
    Select,
    Title,
    Column,
    Message,
    Textarea,
    Button,
    Checkbox,
} from "rbx";


import { Toast } from 'primereact/toast';

import clipboard from "clipboard";

import Layout from "../components/Layout";
import data from "../data/data.json";
import scripts from "../data/scripts.json";

export default function Home() {
    const toast = useRef(null);

    const [ListaSituacoes, setListaSituacoes] = useState(data.situacoes);
    const [ListaDepositantes, setListaDepositantes] = useState(
        data.depositantes
    );

    const [InputSituacao, setInputSituacao] = useState(null);
    const [InputDepositante, setInputDepositante] = useState(null);
    const [InputDescricao, setInputDescricao] = useState("");
    const [InputNumeros, setInputNumeros] = useState("");
    const [isHistorico, setIsHistorico] = useState(true);

    useEffect(() => {
        // Ordena a lista em ordem alfabetica.
        setListaSituacoes(ListaSituacoes.sort());
        setInputSituacao(ListaSituacoes[0]);
        setInputDepositante(ListaDepositantes[0].id);
        console.log(InputSituacao + " " + InputDepositante);
    }, []);

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'SQL Gerado com Sucesso', detail: 'Eviado para o CTRL + V', life: 3000 });
    }

    const escolhaSitucao = (e) => {
        setInputSituacao(e.target.value);
    };

    const escolhaDepositante = (e) => {
        setInputDepositante(e.target.value);
    };

    const buttonGerar = (e) => {
        showSuccess()

        const quebra = InputNumeros.replaceAll('"', "").split("\n").filter(x => x != '');
        var aux = "";
        quebra.forEach((numero) => {
            isHistorico ? aux +=
                scripts.updateSituacaoPedido
                    .replace("{situacao}", InputSituacao)
                    .replace("{depositante_id}", InputDepositante)
                    .replace("{numero}", numero)
                    .replace("{descricao}", InputDescricao) + "\n" : null
            aux +=
                scripts.insertHistoricoPedido
                    .replace("{situacao}", InputSituacao)
                    .replace("{depositante_id}", InputDepositante)
                    .replace("{numero}", numero) + "\n\n";
        });

        
        copyToClipboard(aux);
    };

    const copyToClipboard = (text) => {
        var textField = document.createElement("textarea");
        textField.innerHTML = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand("copy");
        textField.remove();
    };



    return (
        <div>
            <Layout>
                <Container>
                    <br />
                    <Message>
                        <Message.Header>
                            <Title size={4} style={{ color: "white" }}>
                                Atualiza????o de Situa????o
                            </Title>
                        </Message.Header>
                        <Message.Body>
                            <Column.Group>
                                <Column>
                                    <Column.Group>
                                        <Column>
                                            <Title
                                                size={5}
                                                style={{ color: "black" }}
                                            >
                                                Situa????o:{" "}
                                            </Title>
                                            <Select.Container>
                                                <Select
                                                    onChange={(e) =>
                                                        escolhaSitucao(e)
                                                    }
                                                >
                                                    {ListaSituacoes.map(
                                                        (answer, i) => {
                                                            return (
                                                                <Select.Option
                                                                    key={i}
                                                                    value={
                                                                        answer
                                                                    }
                                                                >
                                                                    {answer}
                                                                </Select.Option>
                                                            );
                                                        }
                                                    )}
                                                </Select>
                                            </Select.Container>
                                        </Column>
                                        <Column>
                                            <Title size={5} style={{ color: "black" }} >
                                                Gerar Historico : {'  '}
                                                <Checkbox onChange={e => setIsHistorico(e.target.checked)}
                                                    checked={isHistorico}
                                                />
                                                {isHistorico ? ' SIM' : ' N??O'}
                                            </Title>
                                        </Column>
                                    </Column.Group>

                                    <Column.Group>
                                        <Column>
                                            <Title
                                                size={5}
                                                style={{ color: "black" }}
                                            >
                                                Depositante:{" "}
                                            </Title>
                                            <Select.Container>
                                                <Select
                                                    onChange={(e) =>
                                                        escolhaDepositante(e)
                                                    }
                                                >
                                                    {ListaDepositantes.map(
                                                        (answer, i) => {
                                                            return (
                                                                <Select.Option
                                                                    key={i}
                                                                    value={
                                                                        answer.id
                                                                    }
                                                                >
                                                                    {
                                                                        answer.nome
                                                                    }
                                                                </Select.Option>
                                                            );
                                                        }
                                                    )}
                                                </Select>
                                            </Select.Container>
                                        </Column>
                                    </Column.Group>
                                </Column>
                            </Column.Group>

                            {/* Segunda Coluna */}

                            <Column.Group>
                                <Column>
                                    <Column.Group>
                                        <Column>
                                            <Title
                                                size={5}
                                                style={{ color: "black" }}
                                            >
                                                Numeros Pedidos:{" "}
                                            </Title>
                                            <Textarea
                                                onChange={(e) =>
                                                    setInputNumeros(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Numero Pedidos"
                                            />
                                        </Column>
                                    </Column.Group>

                                    <Column.Group>
                                        <Column>
                                            <Title
                                                size={5}
                                                style={{ color: "black" }}
                                            >
                                                Descri????o:{" "}
                                            </Title>
                                            <Textarea
                                                onChange={(e) =>
                                                    setInputDescricao(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Descri????o"
                                            />
                                        </Column>
                                    </Column.Group>
                                </Column>
                            </Column.Group>

                            <Column.Group>
                                <Column>
                                    <Button
                                        onClick={(e) => buttonGerar(e)}
                                        color="success"
                                    >
                                        Gerar
                                    </Button>
                                </Column>
                            </Column.Group>
                        </Message.Body>
                    </Message>
                </Container>
            </Layout>
            <Toast ref={toast} />
        </div>
    );
}
