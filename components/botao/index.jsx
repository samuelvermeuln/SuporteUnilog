import React, { useRef, useState } from "react";
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonSocial,
} from 'react-awesome-button';

export function Botao({nomeBotao}) {
    return (
        <AwesomeButton
            type="secondary"
            size="medium"
            loadingLabel={('loadingLabel', 'Aguarde...')}
            resultLabel={('resultLabel', 'Finalizado !')}
            action={(element, next) => {
                setTimeout(() => {
                    next(true, ' Finalizado ! ');
                }, 500)
            }}
        >
            <i className="pi pi-user" />&nbsp;
            {nomeBotao}
        </AwesomeButton>
    )
}
