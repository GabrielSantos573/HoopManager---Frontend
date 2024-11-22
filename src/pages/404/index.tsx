import Image from "next/image";
import styled from "styled-components";

const ButtonVoltar = styled.a`
  background: white;
  color: #2a71b1;
  border: 1px solid #2a71b1;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: ease-in-out 200ms;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 50px;

  :hover {
    background: #2a71b1;
    color: white;
  }
`;

export default function Home() {

  return (
    <div 
      style={{display: 'flex',
              flexDirection: 'column', 
              width: '100%', 
              height: '100vh', 
              color: '#0B4E99', 
              alignItems: 'center',
              fontSize: '38px',
              fontWeight: '700',
              textAlign: 'center',
      }}>
      <Image src="/LOGO_HORIZONTAL SLIDA MARGEM.png" alt="logo_header" width={399} height={110} />
      <div style={{margin: 'auto'}}>
        <p>ERRO 404</p>
        <p>PÁGINA NÃO ENCONTRADA</p>
      </div>
      <ButtonVoltar href="/ticket">Voltar</ButtonVoltar>
    </div>
  );
}
