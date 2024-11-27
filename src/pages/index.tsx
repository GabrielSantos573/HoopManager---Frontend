import router from "next/router";
import { useEffect } from "react";
import useAuth from "../hook/withAuth";
import { Container, ContentContainer, Navbar, SidebarLogo, Subtitle, Title } from "../styles/homeStyle";

export default function Home() {
  useAuth();

   useEffect(() => {
     router.push("/times");
   });

  return (
    <>
      <Navbar>
        <SidebarLogo src="/logo_header.png" alt="HoopManager Logo" />
        <h1>HOOPMANAGER</h1>
      </Navbar>
      <Container>
        <ContentContainer>
          <Title>Bem-vindo ao HoopManager</Title>
          <Subtitle>Gerencie suas ligas e equipes de basquete com eficiência e estilo.</Subtitle>
        </ContentContainer>
      </Container>
    </>
  );
}
