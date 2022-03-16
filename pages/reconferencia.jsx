import React, { useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import { BiCategoryAlt, BiChevronDownCircle, BiCustomize, BiWindowClose, BiDna } from "react-icons/bi";
import { Button } from 'primereact/button';
import Layout from "../components/Layout";
import { PickList } from 'primereact/picklist';
import { CardPersonalizado } from "../components/Cards";
import { Botao } from "../components/botao";
import { Dialog } from 'primereact/dialog';

export default function Reconferencia() {

    const [origen, setOrigem] = useState([]);
    const [destino, setDestino] = useState([]);
    const [isModal, setIsModal] = useState(false);

    const onChange = (event) => {
        setOrigem(event.source);
        setDestino(event.target);
    }



    const itemTemplate = (item) => {
        return (
            <div className="product-item">
                <div className="product-list-detail">
                    <h5 className="mb-2">{item.roles}</h5>
                </div>
            </div>
        );
    }

    return (
        <>
            <Layout>

                <div style={{ display: 'flex' }}>
                    <CardPersonalizado title="Numero onda" color="#ff6e49" icon={<BiCategoryAlt size={50} />} value='123' />
                    <CardPersonalizado title="Total" color="#ce3762" icon={<BiChevronDownCircle size={50} />} value='123' />
                    <CardPersonalizado title="Falta" color="#9d007a" icon={<BiWindowClose size={50} />} value='123' />
                    <CardPersonalizado title="outra coisa" color="#2f1335" icon={<BiCustomize size={50} />} value='123' />

                </div>

                <PickList
                    source={origen}
                    target={destino}
                    itemTemplate={itemTemplate}
                    sourceHeader="Permissões"
                    targetHeader="Permissões"
                    sourceStyle={{ height: '250px' }}
                    targetStyle={{ height: '250px' }}
                    onChange={onChange}
                    showSourceControls={false}
                    showTargetControls={false}
                    style={{ marginTop: '40px' }}
                />

                {/* <Botao nomeBotao={'Finalizar Conferencia'}/> */}

                <Button label="Finalizar Conferencia" className="p-button-danger" onClick={() => { console.log('Chava a fun. aqui KARAI'),setIsModal(true) }} />


                <Dialog
                    visible={isModal}
                    style={{ width: '50vw' }}
                    footer={''}
                    position={'center'}
                    onHide={() => setIsModal(false)}
                ></Dialog>


            </Layout>
        </>
    );
}
