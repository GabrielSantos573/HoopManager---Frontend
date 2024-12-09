import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #1c1c1c; /* Fundo escuro para destaque */
  min-height: 100vh;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(45deg, #444444, #000000);
  color: #ffa500; /* Laranja para os textos */
  border-radius: 10px;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #ffffff; /* Branco para o título */
  }

  p {
    font-size: 1.2rem;
    color: #b5b5b5; /* Cinza claro para subtítulo */
  }
`;


export const MatchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

export const MatchCard = styled.div`
  background-color: #1f1f1f; /* Fundo mais escuro */
  color: white;
  border: 1px solid #ff6a00; /* Bordas laranja mais sutil */
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    border-color: #ffa500; /* Mudança de borda ao hover */
  }

  .teams {
    text-align: center;
    margin-bottom: 15px;

    h2 {
      font-size: 1.5rem;
      font-weight: bold;

      span {
        color: #ff6a00; /* Laranja vibrante */
        font-weight: normal;
      }
    }
  }
`;


export const MatchInfo = styled.div`
  p {
    margin: 5px 0;
    font-size: 1rem;

    strong {
      color: #ffa500;
    }

    span {
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
`;

export const NoMatches = styled.div`
  text-align: center;
  color: #ff6a00; /* Laranja mais escuro para texto de aviso */
  font-size: 1.5rem;
  margin-top: 50px;
  font-weight: bold;
`;

