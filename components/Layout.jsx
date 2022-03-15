import React from "react";
import Head from "next/head";
import { Container, Navbar, Title, Footer, Content } from "rbx";

export default function Layout({ children }) {
    return (
        <div>
            <Head>
                <title>Suporte e Projetos</title>
                <meta
                    name="description"
                    content="Suporte e Projetos"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar color="dark">
                <Navbar.Brand>
                    <Navbar.Item href="/">
                        <Title style={{ color: "white" }}>
                            Bem-vindo ao Sistema do Time De Projetos
                        </Title>
                    </Navbar.Item>
                </Navbar.Brand>
            </Navbar>

            <Container className='container-default' >
                {children}
            </Container>

        </div>
    );
}
