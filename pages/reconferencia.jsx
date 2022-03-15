import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import React, { useRef, useState } from "react";
import Layout from "../components/Layout";
import { PickList } from 'primereact/picklist';

export default function Reconferencia() {



    return (
        <>
            <Layout>
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
                />
            </Layout>
        </>
    );
}
