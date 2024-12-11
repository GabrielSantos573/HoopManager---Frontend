import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  Header,
  MatchCard,
  MatchGrid,
  MatchInfo,
  NoMatches,
  PageContainer,
} from "../../styles/matchStyles";
import { FormContainer, InputField, SelectField, SubmitButton } from "../../styles/timesStyle";
import { ArenaType, PartidaType, TimesType } from "../../types/types";

export default function Partidas() {
  const [matches, setMatches] = useState<PartidaType[]>([]);
  const [times, setTimes] = useState<TimesType[]>([]);
  const [arenas, setArenas] = useState<ArenaType[]>([]);
  const [newMatch, setNewMatch] = useState({
    data: "",
    arena: "",
    time: "",
    time_adversario: "",
    status: "",
    status_local: "",
  });

  // Funções para buscar dados do backend
  const fetchMatches = async () => {
    try {
      const response = await axios.get("http://localhost:8000/times/get_partidas/");
      setMatches(response.data);
    } catch (error) {
      console.error("Erro ao buscar partidas:", error);
    }
  };

  const fetchTimes = async () => {
    try {
      const response = await axios.get<TimesType[]>("http://localhost:8000/times/get_times/");
      const timesData = response.data;
  
      const extractedArenas: ArenaType[] = timesData
        .filter((time) => time.arena && time.arena.nome) // Filtra apenas os times com arenas associadas
        .map((time) => ({
          id: time.arena!.id, // ID da arena
          nome: time.arena!.nome,
          local: time.arena!.local,
          capacidade: time.arena!.capacidade,
          time: { id: time.id, nome: time.nome }, // Inclui o ID e nome do time associado
        }));
  
      setTimes(timesData);
      setArenas(extractedArenas);
  
      console.log("Times carregados:", timesData);
      console.log("Arenas extraídas:", extractedArenas);
    } catch (error) {
      console.error("Erro ao buscar times:", error);
    }
  };

  const handleCreateMatch = async () => {
    try {
      console.log("Estado atual de newMatch:", newMatch);

      if (!newMatch.time) {
        alert("Erro: Time não definido!");
        return;
      }
  
      const formData = new FormData();
      formData.append("data", newMatch.data);
      formData.append("arena", newMatch.arena); // Certifique-se de que está preenchido
      formData.append("time", newMatch.time); // Certifique-se de que está preenchido
      formData.append("time_adversario", newMatch.time_adversario);
      formData.append("status", newMatch.status);
      formData.append("status_local", newMatch.status_local);
  
      const response = await axios.post(
        "http://localhost:8000/times/create_partida/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      alert("Partida cadastrada com sucesso!");
      setNewMatch({
        data: "",
        arena: "",
        time: "",
        time_adversario: "",
        status: "",
        status_local: "",
      });
      fetchMatches();
    } catch (error) {
      console.error("Erro ao cadastrar partida:", error);
      if (axios.isAxiosError(error) && error.response) {
        alert(`Erro: ${error.response.data.error || "Erro desconhecido no servidor"}`);
      } else {
        alert("Erro ao cadastrar partida. Verifique o console para mais detalhes.");
      }
    }
  };
  
  
  // Carregamento inicial de dados
  useEffect(() => {
    fetchMatches();
    fetchTimes();
  }, []);

  return (
    <Layout pag="PARTIDAS">
      <PageContainer>
        <Header>
          <h1>Partidas</h1>
          <p>Veja as últimas partidas e acompanhe os resultados.</p>
        </Header>

        {/* Formulário de cadastro de partidas */}
        <FormContainer>
          <h2>Cadastrar Nova Partida</h2>
          <InputField
            type="datetime-local"
            value={newMatch.data}
            onChange={(e) => setNewMatch({ ...newMatch, data: e.target.value })}
            placeholder="DD/MM/AAAA HH:MM"
          />

<SelectField
  value={newMatch.status_local}
  onChange={(e) => {
    const statusLocal = e.target.value;

    if (statusLocal === "Em casa") {
      // Debug: Exibir arenas e time gerenciado
      console.log("Arenas disponíveis:", arenas);
      console.log("Time gerenciado:", times[0]);

      // Tenta localizar a arena associada ao time gerenciado
      const teamArena = arenas.find((arena) => arena.time?.id === times[0]?.id);

      // Debug: Exibe a arena encontrada
      console.log("Arena encontrada:", teamArena);

      if (!teamArena) {
        alert("Erro: Nenhuma arena associada ao time foi encontrada!");
        return;
      }

      // Atualiza o estado com a arena e o time
      setNewMatch({
        ...newMatch,
        status_local: statusLocal,
        arena: teamArena.id.toString(), // ID da arena
        time: times[0]?.id.toString() || "", // ID do time
      });

      // Debug: Verifica o estado atualizado
      console.log("Estado atualizado (newMatch):", {
        arena: teamArena.id,
        time: times[0]?.id,
      });
    } else {
      // Caso "Fora" seja selecionado
      setNewMatch({
        ...newMatch,
        status_local: statusLocal,
        arena: "",
        time: times[0]?.id.toString() || "",
      });

      console.log("Estado atualizado para Fora:", {
        arena: "",
        time: times[0]?.id.toString() || "",
      });
    }
  }}
>
  <option value="">Selecione o Local</option>
  <option value="Em casa">Em casa</option>
  <option value="Fora">Fora</option>
</SelectField>

          <InputField
            type="text"
            value={newMatch.time_adversario}
            onChange={(e) => setNewMatch({ ...newMatch, time_adversario: e.target.value })}
            placeholder="Nome do Time Adversário"
          />

          <SelectField
            value={newMatch.status}
            onChange={(e) => setNewMatch({ ...newMatch, status: e.target.value })}
          >
            <option value="">Selecione o status</option>
            <option value="Agendada">Agendada</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Finalizada">Finalizada</option>
          </SelectField>

          <SubmitButton onClick={handleCreateMatch}>Cadastrar Partida</SubmitButton>
        </FormContainer>

        {/* Lista de partidas */}
        {matches.length > 0 ? (
          <MatchGrid>
            {matches.map((match) => (
              <MatchCard key={match.id}>
                <div className="teams">
                  <h2>
                    {match.time?.nome || "Time Casa"} <span>vs</span> {match.time_adversario}
                  </h2>
                </div>
                <MatchInfo>
                  <p>
                    <strong>Data:</strong> {new Date(match.data).toLocaleString()}
                  </p>
                  <p>
                    <strong>Arena:</strong> {match.arena?.nome || "Jogo Fora"}
                  </p>
                  <p>
                    <strong>Status:</strong> {match.status}
                  </p>
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
