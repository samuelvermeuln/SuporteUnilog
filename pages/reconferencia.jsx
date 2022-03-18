import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { PickList } from 'primereact/picklist';
import React, { useEffect, useRef, useState } from "react";
import { BiCategoryAlt, BiChevronDownCircle, BiCustomize, BiWindowClose } from "react-icons/bi";
import { CardPersonalizado } from "../components/Cards";
import { ItemTamplate } from "../components/conferencia/conf-picklist";
import Layout from "../components/Layout";

import Alerta from "../components/alert/Alerta";
import api from "../service/api";

export default function Reconferencia() {

    // Modal.
    const [modalTabela, setModalTabela] = useState(false);
    const [modalCodigo, setModalCodigo] = useState(false);

    // Array de Conferencia.
    const [origem, setOrigem] = useState([]);
    const [destino, setDestino] = useState([]);
    const [checkout, setCheckout] = useState([]);

    // Contadores
    const [quantidadeOnda, setQuantidadeOnda] = useState(0);

    // Variaveis
    const [numeroOnda, setNumeroOnda] = useState(null);

    // Input Chave
    const inputChaveDanfeRef = useRef(null);
    const [inputChaveDanfe, setInputChaveDanfe] = useState(null);

    // Input Codigo da Onda
    const inputCodigoOndaRef = useRef(null);
    const [inputCodigoOnda, setInputCodigoOnda] = useState(null);


    // Quanto a pagina inicia
    useEffect(() => {
        setModalCodigo(true)
        setTimeout(() => inputCodigoOndaRef.current?.focus(), 1);
    }, []);

    // Funções e Controlers
    const buscaOndaInformada = async () => {
        if (inputCodigoOnda == null || inputCodigoOnda === '') {
            return Alerta.error("Erro Validação de Campo", "Codigo da onda não informado.")
        }

        try {
            const { data } = await api.get('/conferencia', {
                params: {
                    codigo: inputCodigoOnda
                }
            })

            const { codigo, pedidos } = data.onda;
            const quantidade = pedidos.length

            setQuantidadeOnda(quantidade)
            setNumeroOnda(codigo)
            setOrigem(pedidos)
            setDestino([])
            setCheckout([])

            setModalCodigo(false);
        } catch (error) {
            let resp = error?.response?.data
            Alerta.error("Erro API Request", resp.error)
        }

    }

    const conferirChaveDanfeInformada = async () => {
        if (inputChaveDanfe == null || inputChaveDanfe === '') {
            Alerta.error("Erro Validação de Campo", "Chave da Danfe não informada.")
            return;
        }

        var arrayOrigem = [...origem];
        var arrayDestino = [...destino];
        var arrayCheckout = [...checkout];

        if (arrayCheckout.includes(inputChaveDanfe)) {
            Alerta.warning("Erro Pedido Duplicado", "Esse pedido ja vou conferido.")
            return;
        } else {
            arrayCheckout.push(inputChaveDanfe)
        }



    }

    const buscaIndexChave = (chave, array) => {
        var index = 0;
        for (const item of array) {
            if (item[2] == chave) return index;
            index += 1;
        }
        return -1;
    }

    function removeIndexArray(arr, index) {
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }


    return (
        <>
            <Layout>

                {/* Cards da Pagina */}
                <div style={{ display: 'flex' }}>
                    <CardPersonalizado title="Onda" color="#ff6e49" icon={<BiCategoryAlt size={50} />} value={numeroOnda} />
                    <CardPersonalizado title="Total" color="#ce3762" icon={<BiChevronDownCircle size={50} />} value={quantidadeOnda} />
                    <CardPersonalizado title="Conferido" color="#9d007a" icon={<BiWindowClose size={50} />} value={destino.length} />
                    <CardPersonalizado title="Faltante" color="#2f1335" icon={<BiCustomize size={50} />} value={origem.length} />
                </div>

                {/* Input da Chave da Danfe */}
                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <h5><b>BIPAR CHAVE DANFE</b></h5>
                    <span className="p-input-icon-left" style={{ width: '100%' }}>
                        <i className="pi pi-search" />
                        <InputText
                            style={{ width: '100%' }}
                            value={inputChaveDanfe} onChange={(e) => setInputChaveDanfe(e.target.value)}
                            placeholder="Ler Chave Danfe"
                            ref={inputChaveDanfeRef}
                        />
                    </span>
                </div>

                {/* Picklist para mostrar */}
                <PickList
                    source={origem}
                    target={destino}
                    itemTemplate={ItemTamplate}
                    sourceHeader="Conferencia"
                    targetHeader="Conferidos"
                    sourceStyle={{ height: '250px' }}
                    targetStyle={{ height: '250px' }}
                    // onChange={onChange}
                    showSourceControls={false}
                    showTargetControls={false}
                    style={{ marginTop: '40px' }}
                />

                <Button label="Finalizar Conferencia" className="p-button-danger"
                    onClick={() => { console.log('Chava a fun. aqui KARAI'), setModalTabela(true) }}
                    style={{ marginTop: '10px' }}
                />

                <Dialog
                    name='modal-tabela'
                    visible={modalTabela}
                    style={{ width: '50vw' }}
                    footer={''}
                    position={'center'}
                    onHide={() => setModalTabela(false)}
                >

                </Dialog>

                <Dialog
                    name='modal-codigo'
                    visible={modalCodigo}
                    style={{ width: '50vw', zIndex: 0.1 }}
                    footer={''}
                    position={'center'}
                    onHide={() => setModalCodigo(false)}
                >
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <h2 style={{ marginBottom: '20px' }}>INFORME A ONDA</h2>
                        <span className="p-input-icon-left" style={{ width: '100%', marginBottom: '20px' }}>
                            <i className="pi pi-search" />
                            <InputText
                                style={{ width: '100%' }}
                                value={inputCodigoOnda} onChange={(e) => setInputCodigoOnda(e.target.value)}
                                placeholder="Informar codigo da onda"
                                ref={inputCodigoOndaRef}
                                onKeyPress={(e) => { if (e.charCode === 13) buscaOndaInformada() }}
                            />
                        </span>
                        <Button label="Busca Onda" className="p-button-success"
                            onClick={buscaOndaInformada}
                            style={{ marginTop: '10px' }}
                        />
                    </div>
                </Dialog>


            </Layout>
        </>
    );
}
