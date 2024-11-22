/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { LogoutButton } from "../logout";
import { Container, TextContainer } from "./style";
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
        <Container>
            <Image src="/logo_header.png" alt="logo_header" width={242} height={49} />
            <TextContainer>{pag}</TextContainer>
            <div style={{display: "flex",gap: "10px", alignItems: "center", textAlign: "center"}}>
                <span style={{color: "#fff", textTransform: "capitalize", fontSize: "18px", fontWeight: "600", pointerEvents: "none"}}>{user} |</span>
                <LogoutButton />
            </div>
            
        </Container>
    );
};
