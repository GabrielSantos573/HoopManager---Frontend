import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    width: 1200px;
    height: 700px;
    background: white;
    border: #2A71B1 1px solid;
    border-radius: 8px;
    padding: 8px;
    gap: 10px;
    box-shadow: 0 4px 4px rgba(0,0,0, 0.25);
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;

    .formTicket {
      top: 40px;
      right: 50px;
      height: 170px;
      z-index: 1;
    }
`;

export const InfoCard = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    width: 100%;
    height: 150px;
    padding-bottom: 8px;
    border: 1px solid #2A71B1;
    border-radius: 4px;
    text-align: start;
    line-height: 0.5cm;
    box-shadow: 0 4px 4px rgba(0,0,0, 0.25);
    background: #F9F9F9;

    .esquerda {
        font-weight: bold;
        color: #0D3080;
        padding-left: 12px;
    }

    .titulo {
        border-bottom: 1px solid #2A71B1;
        margin-bottom: 8px;
        padding-top: 8px;
        padding-bottom: 8px;
        background: #fff;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
        height: 36px;
        font-weight: bold;
    }
`;

export const TituloCard = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #0D3080;
    color: #0D3080;
    font-weight: bold;
`;

export const Tabela = styled.table`
  font-family: "Inter", sans-serif;
  min-width: 1000px;
  width: 100%;
  display:block;
  margin: 0 auto;
  clear: both;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 0.9em;
  border-bottom: 1px solid #a6c9e2;
  color: #000;
  font-weight: 500;
  font-size: 14px;
  text-align: center;

  .cabeca {
    background-color: #fff !important;
    width: 100%;
    border-bottom: 1px solid #a6c9e2 !important;
    font-weight: 700;
    font-size: 16px;
  }

  .sort {
    cursor: pointer;
    transition: ease-in-out 200ms;

    :hover {
      color: #2a71b1;
    }
  }

  tr{
    height: 30px;
  }

  td{
    width: 300px;
  }

  tr:nth-child(odd){
    background-color: #F9F9F9;
  }

  .ticket {
    color: blue;
    cursor: pointer;
  }

  .categoria {
    text-align: center;
    padding: 4px 8px;
    background: #0D3080;
    border-radius: 18px;
    color: #fff;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .aprovado {
    text-align: center;
    padding: 4px 8px;
    background: #5f8118;
    border-radius: 18px;
    color: #fff;
  }
  .pendente {
    text-align: center;
    padding: 4px 8px;
    background: gray;
    border-radius: 18px;
    color: #fff;
  }

`;

export const FormularioDesconto = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  align-items: start;
  position: absolute;
  bottom: 100px;
  right: 100px;
  background: rgba(0, 0, 0, .5);
  backdrop-filter: blur(5px);
  gap: 10px;
  color: white;
  border-radius: 8px;
  font-size: 16px;

  label{
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  textarea {
    width: 170px;
    background: #fff;
    color: #000;
  }

  input {
    width: 170px;
    background: #fff;
    color: #000;
  }

  select {
    width: 170px;
    background: #fff;
    color: #000;
  }

  button {
    border: 2px solid #0D3080;
    border-radius: 4px;
    color: #0D3080;
    background: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: 100ms ease-in-out;

    :hover{
      color: #fff;
      background: #0D3080;
    }
  }
`;
