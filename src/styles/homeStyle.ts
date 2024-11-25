import styled from "styled-components";

export const Navbar = styled.nav`
  background: #161618; /* Cinza escuro para a navegação */
  color: #ffa500; /* Laranja inspirado no basquete */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  height: 60px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const SidebarLogo = styled.img`
  width: 90px;
  height: auto;
`;

export const Container = styled.div`
  background-image: url('/LOGO_HORIZONTAL SLIDA MARGEM.png'); /* Substitua pela imagem correta */
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: calc(100vh - 60px); /* Remove altura da navbar */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentContainer = styled.div`
  background: rgba(0, 0, 0, 0.8); /* Fundo semitransparente */
  padding: 30px 40px;
  border-radius: 10px;
  text-align: center;
  color: white;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #ffa500;
  margin-bottom: 20px;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #fff;
`;
