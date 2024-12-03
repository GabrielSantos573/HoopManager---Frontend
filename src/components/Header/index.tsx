/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { LogoutButton } from "../logout";
import { Container, TextContainer, HeaderWrapper, LogoContainer, LogoutContainer } from "./style";
import { useEffect, useState } from "react";
import Image from "next/image";

interface HeaderProps {
  pag: string;
}

export const Header: React.FC<HeaderProps> = ({ pag }) => {
    const [user, setUser] = useState('');

    useEffect(() => {
        
          (async () => {
            try {
              const { data } = await axios.get("http://localhost:8000/home/", {
                headers: {
                  "Content-Type": "application/json",
                  // Incluindo o token de acesso no cabeçalho da solicitação.
                  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
              });
              setUser(data)
            } catch (e) {
              // Se ocorrer um erro (por exemplo, o usuário não está autenticado), registra "not auth" no console.
              console.log("not auth");
            }
          })();

      }, []);
      return (
        <HeaderWrapper>
          <Container>
            <TextContainer>
              <h1>{pag}</h1>
              <p>Bem-vindo, {user}!</p>
            </TextContainer>
            <LogoutContainer>
              <LogoContainer>
                <Image src="/logo_login.png" alt="Logo HoopManager" width={50} height={50} />
              </LogoContainer>
              <LogoutButton />
            </LogoutContainer>
          </Container>
        </HeaderWrapper>
      );
    };
