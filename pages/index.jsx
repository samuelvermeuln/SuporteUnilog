import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";

import { AnimateSharedLayout } from "framer-motion"
import { Card } from 'primereact/card';
import { motion } from "framer-motion";
import styled from 'styled-components';

import clipboard from "clipboard";
import Layout from './../components/Layout';

export default function index() {

    const [CardsObj, setCardsObj] = useState(null)

    useEffect(async () => {
        var localHost = typeof window !== 'undefined' && window.location.href ? window.location.href : '';
        localHost += 'api/cards'

        const { data } = await axios.get(`${localHost}`)
        setCardsObj(data);
    }, [])

    const StyleCard = styled.div`
        #Card-Custom:hover{
            -webkit-box-shadow: 0px 1px 11px 3px rgb(247, 9, 1);
            box-shadow: 0px 1px 11px 3px rgb(255, 255, 255);
        }
    `

    return (
        <>
            <Layout>
                <div className="card-container indigo-container overflow-hidden card-style" >
                    <div className="flex" style={{marginLeft:'50px'}}>
                        {
                            CardsObj?.map(value => {
                                return (
                                    <Link href={value.caminho}>
                                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1 }}>
                                            <div className="flex-1 md:flex-none flex align-items-center justify-content-center font-bold text-white m-2 px-5 py-3 border-round" >
                                                <StyleCard>
                                                    <Card
                                                        title={value.title}
                                                        style={{ width: '25rem', marginBottom: '2em', backgroundColor:`${value.color}` }}
                                                        id="Card-Custom"
                                                    >
                                                        <p className="m-0" style={{ lineHeight: '1.5' }}>{value.subTitle}</p>
                                                    </Card>
                                                </StyleCard>
                                            </div>
                                        </motion.div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </Layout>

        </>
    )
}
