import styled from "styled-components";

export const JogadorRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  padding: 10px;
  background: linear-gradient(90deg, #fff5e6, #ffe6d5); /* Gradiente no fundo */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
`;


export const JogadorRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
    background: linear-gradient(135deg, #ffe6d5, #fff5e6); /* Gradiente ao passar o mouse */
  }

  img {
    margin-right: 15px;
    cursor: pointer;
    border: 2px solid #ff6200;
    border-radius: 50%;
  }

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;

    td {
      margin: 0;
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
  }

  .details {
    margin-top: 10px;
    padding: 10px;
    background: #ffe6d5;
    border-radius: 8px;
    color: #333;
    font-size: 14px;
  }
`;

// Dropdown para seleção de times
export const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 16px;
    font-weight: bold;
    color: #ff6200;
  }

  select {
    height: 40px;
    width: 230px;
    background: #fff;
    border: 2px solid #ff6200;
    border-radius: 8px;
    color: #333;
    font-size: 16px;
    padding: 8px;

    &:focus {
      outline: none;
      border-color: #ff8c32; /* Cor ao focar */
    }
  }
`;


// Estilo para a tabela de jogadores
type PageProps = {
  ativo?: boolean;
};

export const Tabela = styled.table`
  font-family: "Inter", sans-serif;
  min-width: 1000px;
  width: 100%;
  height: 500px;
  max-height: 500px;
  display: grid;
  margin: 0 auto;
  clear: both;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 0.9em;
  border-bottom: 1px solid #a6c9e2;
  color: #000;
  font-weight: 500;
  text-align: center;
  position: relative;

  tbody {
    overflow: auto;
  }
  thead{
    
  }

  .cabeca {
    background-color: #fff !important;
    width: 100%;
    border-bottom: 1px solid #a6c9e2 !important;
    font-weight: 700;
    font-size: 16px;
  }

  tr {
    height: 45px;
  }

  td {
    width: 300px;
  }

  tr:nth-child(odd) {
    background-color: #f9f9f9;
  }
`;

export const HeaderArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  text-align: left;
  margin-bottom: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #ffe6d5, #fff5e6); /* Gradiente de fundo */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

  h1 {
    font-size: 24px;
    color: #ff6200;
    margin: 0;
  }

  p {
    margin: 5px 0;
    color: #333;
    font-size: 14px;
  }

  img {
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }
`;


export const BuscaInput = styled.input`
  border: 1px #2a71b1 solid;
  background: transparent;
  display: flex;
  padding: 8px;
  padding-left: 30px;
  border-radius: 3px;
  color: #2a71b1;
  width: 250px;

  ::placeholder {
    color: #2a71b1;
  }

  :focus {
    outline: none;
  }
`;

export const QuantidadeTicket = styled.span`
  text-align: center;
  color: #2A71B1;
  font-size: 16px;
  font-weight: 500;
  align-self: center;
`;

export const DowloadButton = styled.button`
  width: 40px;
  height: 40px;
  align-self: end;
  justify-self: end;
  background: #fff;
  display: flex;
  padding: 10px;
  border: #2A71B1 2px solid;
  border-radius: 6px;
  cursor: pointer;
  transition: ease-in-out 200ms;

  :hover {
    background-color: #2A71B1;
    
    .hover_color {
      stroke: #fff;
    }
  }
`;

export const UploadButton = styled.label`
  height: 40px;
  background: #fff;
  display: flex;
  padding: 10px;
  padding-left: 30px;
  border: #2A71B1 2px solid;
  border-radius: 6px;
  cursor: pointer;
  transition: ease-in-out 200ms;
  color: #2A71B1;

  :hover {
    background-color: #2A71B1;
    color: #fff;
    
    .hover_color {
      stroke: #fff;
    }
  }
`;

export const SelectArea = styled.select`
  height: 40px;
  width: 230px;
  align-self: end;
  justify-self: end;
  background: #fff;
  display: flex;
  padding: 10px;
  border: #2A71B1 2px solid;
  border-radius: 6px;
  color: #2A71B1;
  cursor: pointer;
  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  :focus {
    outline: none;
  }
`

export const CountArea = styled.select`
  height: 40px;
  width: 66px;
  align-self: end;
  justify-self: end;
  background: #fff;
  display: flex;
  padding: 10px;
  border: #2A71B1 2px solid;
  border-radius: 6px;
  color: #2A71B1;
  cursor: pointer;
  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin-left: 50px;

  :focus {
    outline: none;
  }
`;

export const PagContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  text-align: center;
  gap: 10px;
  transition: ease-in-out 200ms;

  span {
    color: #2a71b1;
    font-size: 16px;
    margin-left: 10px;
    margin-right: 10px;
    font-weight: 700;
  }
`;

export const PagButton = styled.button<PageProps>`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background: ${props => props.ativo ? "#2a71b1" : "#FFF"};
  border: none;
  color: ${props => props.ativo ? "#FFF" : "#2a71b1"};
  cursor: pointer;
  filter: drop-shadow(0 4px 4px rgba(0,0,0,.25));
  z-index: 1;
`;

export const NavButton = styled.button`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: none;
  color: #2a71b1;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
`;

export const SemTicketMessagem = styled.div`
  font-family: "Inter", sans-serif;
  min-width: 1000px;
  width: 100%;
  height: 500px;
  max-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 42px;
  font-weight: 700;
  color: #2a71b1;
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5); /* Fundo escuro com opacidade */
  backdrop-filter: blur(5px);
  z-index: 999;
  gap: 10px;

  .X-no-peito {
    font-size: 52px;
    font-weight: bold;
    color: #ff6200;
    align-self: flex-start;
    margin-top: 80px;
    cursor: pointer;

    &:hover {
      color: #ff8c32; /* Cor mais clara ao passar o mouse */
    }
  }
`;


export const FilterModal = styled.div`
  grid-template-columns: 1fr 1fr;
  position: absolute;
  width: 400px;
  background: #FFF;
  top: 50px;
  padding: 10px;
  line-height: 1cm;
  border: 1px solid #2a71b1;
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0,0,0,.25);

  span {
    font-size: 16px;
    font-weight: bold;
  }

  button {
    align-self: flex-end;
    background: white;
    color: #2a71b1;
    border: 1px solid #2a71b1;
    border-radius: 25px;
    padding: 6px 10px;
    cursor: pointer;
    transition: ease-in-out 200ms;
    font-size: 16px;

    :hover {
      background: #2a71b1;
      color: white;
    }
  }
`;