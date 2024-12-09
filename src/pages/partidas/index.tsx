import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import {
  PageContainer,
  Header,
  MatchGrid,
  MatchCard,
  MatchInfo,
  NoMatches,
} from "../../styles/matchStyles";

export default function Partidas() {
  const [matches, setMatches] = useState([]);

  const fetchMatches = async () => {
    try {
      const response = await axios.get("http://localhost:8000/get_partidas/");
      setMatches(response.data);
    } catch (error) {
      console.error("Erro ao buscar partidas:", error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <Layout pag="PARTIDAS">
      <PageContainer>
        <Header>
          <h1>Partidas</h1>
          <p>Veja as últimas partidas e acompanhe os resultados.</p>
        </Header>
        {matches.length > 0 ? (
          <MatchGrid>
            {matches.map((match) => (
              <MatchCard key={match.id}>
                <div className="teams">
                  <h2>{match.time_casa} <span>vs</span> {match.time_visitante}</h2>
                </div>
                <MatchInfo>
                  <p><strong>Data:</strong> {match.data}</p>
                  <p><strong>Local:</strong> {match.arena}</p>
                  <p><strong>Placar:</strong> <span>{match.placar_casa} - {match.placar_visitante}</span></p>
                </MatchInfo>
              </MatchCard>
            ))}
          </MatchGrid>
        ) : (
          <NoMatches>Nenhuma partida encontrada.</NoMatches>
        )}
      </PageContainer>
    </Layout>
  );
}
