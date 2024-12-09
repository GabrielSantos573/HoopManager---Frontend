import router from "next/router";
import { useEffect } from "react";
import useAuth from "../hook/withAuth";
import { Container, ContentContainer, Navbar, SidebarLogo, Subtitle, Title } from "../styles/homeStyle";

export default function Home() {
    useAuth();

    useEffect(() => {
        // Adiciona um atraso de 3 segundos antes de redirecionar
        const timeout = setTimeout(() => {
            router.push("/times");
        }, 3000); // 3000ms = 3 segundos

        return () => clearTimeout(timeout); // Limpa o timeout se o componente desmontar
    }, []);

    return (
        <>
            <Navbar>
                <SidebarLogo src="/logo_header.png" alt="HoopManager Logo" />
                <h1>HOOPMANAGER</h1>
            </Navbar>
            <Container>
                <ContentContainer>
                    <Title>Bem-vindo ao HoopManager</Title>
                    <Subtitle>
                        Gerencie suas ligas e equipes de basquete com eficiência
                        e estilo.
                    </Subtitle>
                </ContentContainer>
            </Container>
        </>
    );
}
