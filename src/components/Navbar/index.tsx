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
    { icon: "/nav/Increase.png", link: ".", name: "Dashboards", aba: "padrao" },
    { icon: "/nav/man.png", link: ".", name: "Manutenção", aba: "manutencao" },
    { icon: "/nav/List.png", link: ".", name: "Operacional", aba: "padrao" },
    { icon: "/nav/Warehouse.png", link: ".", name: "Patrimônio", aba: "padrao" },
    { icon: "/nav/Boxes.png", link: ".", name: "Inventário", aba: "padrao" },
    { icon: "/nav/Agreement.png", link: ".", name: "Contratos", aba: "padrao" },
    { icon: "/nav/Manual.png", link: ".", name: "Base Con.", aba: "padrao" },
    { icon: "/nav/Paper.png", link: ".", name: "NTPs", aba: "padrao" },
    {
      icon: "/nav/plataforma.png",
      link: "/plataformas",
      name: "Plataformas",
      aba: "padrao",
    },
  ],
  manutencao: [
    { icon: "/nav/ticket.png", link: "/ticket", name: "Ticket", aba: "padrao" },
    {
      icon: "/nav/desconto.png",
      link: "/desconto",
      name: "Descontos",
      aba: "padrao",
    },
    {
      icon: "/nav/localidade.png",
      link: "/localidades",
      name: "Localidades",
      aba: "padrao",
    },
    {
      icon: "/nav/estacao.png",
      link: "/estacoes",
      name: "Estações",
      aba: "padrao",
    },
    { icon: "/nav/equipe.png", link: "/lideres", name: "Líderes", aba: "padrao" },
    {
      icon: "/nav/tech.png",
      link: "/tecnicos",
      name: "Técnicos",
      aba: "padrao",
    },
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
          GMP
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
