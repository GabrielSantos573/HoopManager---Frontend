/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Container, NavA } from "./style";
import { Burger } from "./Burger";
import Image from "next/image";

type NavLinkItem = {
  icon: string;
  link: string;
  name: string;
  aba: string;
};

type NavLinkType = {
  [key: string]: NavLinkItem[];
};

const navlink: NavLinkType = {
  padrao: [
    { icon: "/nav/time-basquete.png", link: ".", name: "Time", aba: "time" },
    { icon: "/nav/tabela-basquete.png", link: ".", name: "Partidas", aba: "manutencao" },
    { icon: "/nav/quadra-basquete.png", link: ".", name: "Treinos", aba: "treinos" },
  ],
  time: [
    { icon: "/nav/cesta-de-basquete.png", link: "/ticket", name: "Ver time", aba: "padrao" },
    { icon: "/nav/jogador-de-basquete.png", link: "/desconto", name: "Editar time", aba: "padrao", },
    { icon: "/nav/quadra-de-basquete.png", link: "/localidades", name: "Jogadores", aba: "padrao", },
    { icon: "/nav/voltar.png", link: ".", name: "Voltar", aba: "padrao" },
  ],
  manutencao: [
    { icon: "/nav/cesta-de-basquete.png", link: "/ticket", name: "Ver partidas", aba: "padrao" },
    { icon: "/nav/jogador-de-basquete.png", link: "/desconto", name: "Criar Partidas", aba: "padrao", },
    { icon: "/nav/quadra-de-basquete.png", link: "/localidades", name: "Editar Partidas", aba: "padrao", },
    { icon: "/nav/voltar.png", link: ".", name: "Voltar", aba: "padrao" },
  ],
  treinos: [
    { icon: "/nav/cesta-de-basquete.png", link: "/ticket", name: "Dias de treino", aba: "padrao" },
    { icon: "/nav/jogador-de-basquete.png", link: "/desconto", name: "Videos e jodadas", aba: "padrao", },
    { icon: "/nav/quadra-de-basquete.png", link: "/localidades", name: "Treinos extras", aba: "padrao", },
    { icon: "/nav/quadra-de-basquete.png", link: ".", name: "Avisos", aba: "padrao", },
    { icon: "/nav/voltar.png", link: ".", name: "Voltar", aba: "padrao" },
  ],
};

export const Navbar = () => {
  const [aberto, setAberto] = useState(false);
  const [listaSelecionada, SetListaSelecionada] = useState("padrao");

  return (
    <Container estado={aberto}>
      <NavA className="top">
        <Burger open={aberto} setOpen={setAberto} />
        <span
          style={{
            textAlign: "center",
            width: "100%",
            opacity: aberto ? 1 : 0,
            maxHeight: aberto ? "100px" : "0",
            transition: "opacity 200ms ease-in-out, max-height 200ms ease-in-out",
          }}
        >
          Gestão do Time
        </span>
      </NavA>

      <div
        style={{
          background: "#fff",
          width: aberto ? "300px" : "59px",
          height: "1px",
          transition: "ease-in-out 200ms",
        }}
      />
      {navlink[listaSelecionada].map((index) => (
        <NavA
          className={index.name}
          estado={aberto}
          key={index.name}
          href={index.link}
          onClick={(event) => {
            if (index.link === ".") {
              SetListaSelecionada(index.aba);
              event.preventDefault();
            }
          }}
        >
          <Image
            alt={index.name}
            src={index.icon}
            width={aberto ? 50 : 30}
            height={aberto ? 50 : 30}
          />
          <span
            style={{
              opacity: aberto ? 1 : 0,
              maxHeight: aberto ? "100px" : "0",
              pointerEvents: aberto ? "all" : "none",
              whiteSpace: "nowrap",
              transition:
                "opacity 100ms ease-in-out, max-height 100ms ease-in-out",
            }}
          >
            {index.name}
          </span>
        </NavA>
      ))}
    </Container>
  );
};
