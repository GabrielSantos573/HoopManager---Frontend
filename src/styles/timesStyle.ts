import styled from "styled-components";

export const JogadorRowContainer = styled.div`
  display: flex; /* Organiza o conteúdo em uma linha ou coluna */
  flex-direction: column; /* Alinha os itens em uma coluna */
  gap: 15px; /* Espaço entre os elementos */
  margin-top: 20px; /* Espaçamento superior */
  padding: 15px; /* Espaçamento interno */
  background: linear-gradient(90deg, #1c1c1c, #2a2a2a); /* Fundo escuro com gradiente */
  border-radius: 10px; /* Arredonda os cantos */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5); /* Sombra mais intensa para destacar */
  border: 1px solid #ff6200; /* Borda laranja destacada */
`;


export const JogadorRow = styled.div`
  display: flex; /* Alinha os itens em uma linha */
  flex-direction: row; /* Define orientação horizontal */
  align-items: center; /* Centraliza os itens verticalmente */
  background-color: #1c1c1c; /* Fundo escuro */
  border-radius: 10px; /* Cantos arredondados */
  padding: 15px; /* Espaçamento interno */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5); /* Sombra mais intensa */
  transition: transform 0.2s, background 0.3s; /* Animações suaves ao passar o mouse */

  &:hover {
    transform: scale(1.02); /* Aumenta levemente no hover */
    background: linear-gradient(135deg, #ff6200, #2a2a2a); /* Gradiente ao passar o mouse */
  }

  img {
    margin-right: 15px; /* Espaço ao lado da imagem */
    cursor: pointer; /* Cursor de clique */
    border: 2px solid #ff6200; /* Borda laranja */
    border-radius: 50%; /* Forma circular */
  }

  div {
    flex: 1; /* Ocupa o espaço restante */
    display: flex; /* Usa flexbox */
    flex-direction: column; /* Coluna */
    gap: 5px; /* Espaçamento entre itens */

    td {
      margin: 0;
      font-size: 16px; /* Tamanho da fonte */
      font-weight: bold; /* Negrito */
      color: #fff; /* Texto branco */
    }
  }

  .details {
    margin-top: 10px; /* Espaço superior */
    padding: 10px; /* Espaçamento interno */
    background: #2a2a2a; /* Fundo escuro */
    border-radius: 8px; /* Cantos arredondados */
    color: #ff6200; /* Texto laranja para destaque */
    font-size: 14px; /* Tamanho da fonte */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Sombra leve */
  }
`;



// Dropdown para seleção de times
export const Dropdown = styled.div`
  display: flex;
  flex-direction: column; /* Alinha os itens verticalmente */
  gap: 10px; /* Espaçamento entre os itens */

  label {
    font-size: 16px; /* Tamanho da fonte */
    font-weight: bold; /* Texto em negrito */
    color: #ffb400; /* Cor laranja escura da identidade visual */
  }

  select {
    height: 40px; /* Altura do seletor */
    width: 230px; /* Largura */
    background: #333; /* Fundo escuro */
    border: 2px solid #ffb400; /* Borda laranja escura */
    border-radius: 8px; /* Bordas arredondadas */
    color: #fff; /* Texto branco */
    font-size: 16px; /* Tamanho da fonte */
    padding: 8px; /* Espaço interno */
    transition: border-color 0.3s ease, background 0.3s ease;

    &:focus {
      outline: none; /* Remove a borda padrão */
      border-color: #ff8c32; /* Cor laranja clara ao focar */
      background: #444; /* Fundo um pouco mais claro ao focar */
    }

    &:hover {
      background: #444; /* Fundo mais claro ao passar o mouse */
    }
  }
`;




// Estilo para a tabela de jogadores - ver depois!!!!
type PageProps = {
  ativo?: boolean;
};

// voltar aqui
export const Tabela = styled.table`
  font-family: "Inter", sans-serif; /* Fonte consistente com o tema. */
  min-width: 1000px; /* Largura mínima da tabela. */
  width: 100%; /* Ocupa toda a largura disponível. */
  height: 500px; /* Altura fixa. */
  max-height: 500px; /* Altura máxima. */
  display: grid; /* Organização em grade. */
  margin: 0 auto; /* Centraliza horizontalmente. */
  border-collapse: collapse; /* Remove espaçamento entre células. */
  font-size: 0.9em; /* Tamanho da fonte ajustado. */
  color: #fff; /* Texto branco para contraste. */
  font-weight: 500; /* Espessura média. */
  text-align: center; /* Centraliza o texto. */
  background-color: #222; /* Fundo escuro para toda a tabela. */
  border-radius: 8px; /* Bordas arredondadas. */
  overflow: hidden; /* Garante que elementos adicionais não ultrapassem o contêiner. */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para destacar. */

  tbody {
    overflow: auto; /* Adiciona barra de rolagem se necessário. */
  }

  .cabeca {
    background-color: #333; /* Fundo mais escuro para o cabeçalho. */
    border-bottom: 2px solid #ff6200; /* Linha inferior laranja para destaque. */
    font-weight: 700; /* Texto em negrito. */
    color: #ff6200; /* Texto laranja para contraste. */
    font-size: 1em; /* Tamanho do texto no cabeçalho. */
  }

  tr {
    transition: background-color 0.3s ease; /* Suaviza a mudança de cor ao passar o mouse. */
  }

  tr:nth-child(odd) {
    background-color: #2a2a2a; /* Fundo alternado escuro. */
  }

  tr:nth-child(even) {
    background-color: #1e1e1e; /* Fundo alternado mais escuro. */
  }

  tr:hover {
    background-color: #444; /* Destaque ao passar o mouse. */
  }

  td {
    padding: 10px; /* Espaçamento interno das células. */
    color: #fff; /* Texto branco para contraste. */
    border-bottom: 1px solid #333; /* Linha divisória entre células. */
  }

  th {
    padding: 15px; /* Espaçamento interno das células do cabeçalho. */
    font-size: 1.1em; /* Texto maior no cabeçalho. */
  }
`;

export const HeaderArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background: linear-gradient(135deg, #1e1e1e, #121212); /* Fundo escuro com gradiente */
  border-radius: 12px; /* Cantos arredondados */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Sombra para destacar o container */

  .header-content {
    display: flex;
    gap: 20px;
    align-items: center;

    .team-logo {
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7); /* Sombra na logo */
    }

    .team-details {
      display: flex;
      flex-direction: column;
      gap: 10px;

      h1 {
        font-size: 28px;
        color: #ff6200; /* Título laranja vibrante */
        margin: 0;
        font-weight: bold;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8); /* Sombra no texto */
      }

      p {
        margin: 0;
        color: #e0e0e0; /* Texto cinza claro */
        font-size: 16px;
        line-height: 1.5;
      }

      strong {
        color: #ff8c32; /* Destaque em laranja */
      }
    }
  }

  .team-stats {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    p {
      margin: 0;
      color: #e0e0e0; /* Texto cinza claro */
      font-size: 16px;
      line-height: 1.5;

      strong {
        color: #ff6200; /* Destaque em laranja */
      }
    }
  }
`;


export const BuscaInput = styled.input`
  border: 1px solid #ff6200; /* Borda laranja vibrante */
  background: #1e1e1e; /* Fundo escuro */
  display: flex;
  padding: 8px;
  padding-left: 30px;
  border-radius: 6px; /* Bordas mais arredondadas */
  color: #e0e0e0; /* Texto claro */
  width: 250px;

  ::placeholder {
    color: #ff8c32; /* Placeholder com tom laranja suave */
    font-style: italic; /* Placeholder em itálico */
  }

  :focus {
    outline: none; /* Remove a borda padrão */
    border-color: #ff8c32; /* Borda laranja clara ao focar */
    box-shadow: 0 0 5px rgba(255, 98, 0, 0.7); /* Efeito de brilho ao focar */
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

export const FormContainer = styled.div`
  border: 1px solid #444;
  padding: 20px;
  border-radius: 8px;
  background-color: #1e1e1e;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  color: #fff;

  h2 {
    color: #ff6200;
    margin-bottom: 20px;
  }
`;

export const InputField = styled.input`
  background-color: #2e2e2e;
  color: #fff;
  border: 1px solid #ff6200;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 15px;
  font-size: 16px;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #ff8c32;
  }
`;

export const TextAreaField = styled.textarea`
  background-color: #2e2e2e;
  color: #fff;
  border: 1px solid #ff6200;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 15px;
  font-size: 16px;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #ff8c32;
  }
`;

export const SelectField = styled.select`
  background-color: #2e2e2e;
  color: #fff;
  border: 1px solid #ff6200;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 15px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #ff8c32;
  }
`;

export const PlayerCard = styled.div`
  border: 1px solid #555;
  padding: 15px;
  border-radius: 8px;
  background-color: #2e2e2e;
  margin-bottom: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  h4 {
    color: #ff6200;
    margin-bottom: 10px;
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: #ff6200;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff8c32;
  }
`;
