import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import {
    Container,
    Select,
    Title,
    Column,
    Message,
    Textarea,
    Button,
} from "rbx";

import clipboard from "clipboard";

import data from "../data/data.json";
import scripts from "../data/scripts.json";

export default function Home() {
    const [ListaSituacoes, setListaSituacoes] = useState(data.situacoes);
    const [ListaDepositantes, setListaDepositantes] = useState(
        data.depositantes
    );

    const [InputSituacao, setInputSituacao] = useState(null);
    const [InputDepositante, setInputDepositante] = useState(null);
    const [InputDescricao, setInputDescricao] = useState("");
    const [InputNumeros, setInputNumeros] = useState("");

    useEffect(() => {
        // Ordena a lista em ordem alfabetica.
        setListaSituacoes(ListaSituacoes.sort());
        setInputSituacao(ListaSituacoes[0]);
        setInputDepositante(ListaDepositantes[0].id);
        console.log(InputSituacao + " " + InputDepositante);
    }, []);

    const escolhaSitucao = (e) => {
        setInputSituacao(e.target.value);
    };

    const escolhaDepositante = (e) => {
        setInputDepositante(e.target.value);
    };

    const buttonGerar = (e) => {
        const quebra = InputNumeros.replaceAll('"', "").split("\n").filter(x => x != '');

        console.log(quebra);

        var aux = "";
        quebra.forEach((numero) => {
            aux +=
                scripts.updateSituacaoPedido
                    .replace("{situacao}", InputSituacao)
                    .replace("{depositante_id}", InputDepositante)
                    .replace("{numero}", numero)
                    .replace("{descricao}", InputDescricao) + "\n";
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
                                Atualização de Situação
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
                                                Situação:{" "}
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
                                                Descrição:{" "}
                                            </Title>
                                            <Textarea
                                                onChange={(e) =>
                                                    setInputDescricao(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Descrição"
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
        </div>
    );
}
