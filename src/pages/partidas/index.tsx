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
    placar_time: "0",
    placar_time_adversario: "0",
    status: "",
  });

  // Funções para buscar dados do backend
  const fetchMatches = async () => {
    try {
      const response = await axios.get("http://localhost:8000/get_partidas/");
      setMatches(response.data);
    } catch (error) {
      console.error("Erro ao buscar partidas:", error);
    }
  };

  const fetchTimes = async () => {
    try {
      const response = await axios.get<TimesType[]>("http://localhost:8000/get_times/");
      const timesData = response.data;
  
      const extractedArenas: ArenaType[] = timesData
        .filter((time) => time.arena && time.arena.nome)
        .map((time) => ({
          id: time.id, // ID do time gerenciado
          nome: time.arena!.nome,
          local: time.arena!.local,
          capacidade: time.arena!.capacidade,
        }));
  
      setTimes(timesData);
      setArenas(extractedArenas);
    } catch (error) {
      console.error("Erro ao buscar times:", error);
    }
  };

  const handleCreateMatch = async () => {
    try {
      if (!newMatch.data || !newMatch.arena || !newMatch.time_adversario) {
        alert("Preencha todos os campos obrigatórios.");
        return;
      }
  
      const payload = {
        ...newMatch,
        placar_time_casa: parseInt(newMatch.placar_time), // Converte para número
        placar_time_adversario: parseInt(newMatch.placar_time_adversario), // Converte para número
      };
  
      const response = await axios.post("http://localhost:8000/create_partida/", payload);
      alert("Partida cadastrada com sucesso!");
      setNewMatch({
        data: "",
        arena: "",
        time: "",
        time_adversario: "",
        placar_time: "0", // Reseta como string
        placar_time_adversario: "0", // Reseta como string
        status: "",
      });
      fetchMatches();
    } catch (error) {
      console.error("Erro ao cadastrar partida:", error);
      alert("Erro ao cadastrar partida. Verifique os dados e tente novamente.");
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
            placeholder="Data e Hora"
          />
          <SelectField
            value={newMatch.arena}
            onChange={(e) => {
              const arenaId = e.target.value;

              if (arenaId === "Visitante") {
                setNewMatch({ ...newMatch, arena: arenaId, time: "", time_adversario: "" });
              } else {
                const selectedArena = arenas.find((arena) => arena.id.toString() === arenaId);
                const selectedTime = times.find((time) => time.id.toString() === selectedArena?.id.toString());

                setNewMatch({
                  ...newMatch,
                  arena: arenaId,
                  time: selectedTime?.id.toString() || "",
                  time_adversario: "",
                });
              }
            }}
          >
            <option value="">Selecione uma Arena</option>
            {arenas.map((arena) => (
              <option key={arena.id} value={arena.id}>
                {arena.nome}
              </option>
            ))}
            <option value="Visitante">Visitante</option>
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
            <option value="Norte">Agendada</option>
            <option value="Nordeste">Em Andamento</option>
            <option value="Nordeste">Finalizada</option>
          </SelectField>

          {newMatch.arena !== "Visitante" && (
            <p>Time Casa: {times.find((time) => time.id.toString() === newMatch.time)?.nome || "Time Gerenciado"}</p>
          )}

          {newMatch.arena === "Visitante" && (
            <p>Time Casa: {"Time Adversario"}</p>
          )}

          <SubmitButton onClick={handleCreateMatch}>Cadastrar Partida</SubmitButton>
        </FormContainer>

        {/* Lista de partidas */}
        {matches.length > 0 ? (
          <MatchGrid>
            {matches.map((match) => (
              <MatchCard key={match.data}>
                <div className="teams">
                  <h2>
                    {match.arena?.time_casa?.nome || "Time Casa"} <span>vs</span> {match.time_adversario || "Time Visitante"}
                  </h2>
                </div>
                <MatchInfo>
                  <p>
                    <strong>Data:</strong> {new Date(match.data).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Local:</strong> {match.arena?.nome || "Arena Não Definida"}
                  </p>
                  <p>
                    <strong>Placar:</strong> {match.placar_time} - {match.placar_time_adversario}
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
