import React from "react";
import Head from "next/head";
import { Container, Navbar, Title, Footer, Content } from "rbx";

export default function Layout({ children }) {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar color="dark">
                <Navbar.Brand>
                    <Navbar.Item href="/">
                        <Title style={{ color: "white" }}>
                            Suporte Sistema
                        </Title>
                    </Navbar.Item>
                </Navbar.Brand>
            </Navbar>

            <Container>{children}</Container>

        </div>
    );
}
