import React from 'react';
import { Card } from 'primereact/card';


export function CardPersonalizado(props){
    return (
        <>
            <Card title={props.title ?? 'teste'} style={{ width: '15rem', marginRight: '2em',marginBottom: '2em',marginTop: '2em',
            backgroundColor:`${props.color ?? '#000'}`
        }}>
                <div style={{ display: 'flex'}}>
                    {props.icon}

                    <div >
                        <h1 style={{color: '#fff'}} >{props.value}</h1>
                    </div>

                </div>

            </Card>
        </>
    )
}
