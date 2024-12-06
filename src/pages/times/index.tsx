import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/Layout";
import useAuth from "../../hook/withAuth";
import { Dropdown, HeaderArea, JogadorRow, JogadorRowContainer } from "../../styles/timesStyle";
import { JogadorType, TimesType } from "../../types/types";
import { FormContainer, InputField, TextAreaField, SelectField, PlayerCard, SubmitButton } from "../../styles/timesStyle";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default function Times() {
  const [times, setTimes] = useState<TimesType[]>([]);
  const [jogadores, setJogadores] = useState<JogadorType[]>([]); // Já existente
  const [selectedTime, setSelectedTime] = useState<TimesType | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  // Estado para criação de time
  const [newTime, setNewTime] = useState<Omit<TimesType, "id" | "numero_jogadores" | "vitorias" | "derrotas" | "campeonatos_vencidos"> & { numero_jogadores?: number }>({
    nome: "",
    regiao: "",
    treinador: "",
    descricao: "",
    logo: null,
  });

  useAuth();

  const atualizaTimes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/get_times/");
      setTimes(response.data);
      if (response.data.length > 0) setSelectedTime(response.data[0]);
    } catch (error) {
      console.error(`Erro ao buscar times: ${error}`);
    }
  };

  const togglePlayerDetails = (id: number) => {
    setSelectedPlayer(selectedPlayer === id ? null : id);
  };

  const buscaJogadores = async (timeId: number) => {
    try {
      const response = await axios.get(`http://localhost:8000/get_jogadores/${timeId}/`);
      setJogadores(response.data);
    } catch (error) {
      console.error(`Erro ao buscar jogadores: ${error}`);
    }
  };

  const handleNumeroJogadoresChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numero = parseInt(e.target.value) || 0;
    setNewTime({ ...newTime, numero_jogadores: numero });

    // Atualiza o estado jogadores com slots para os novos jogadores
    const newJogadores = Array.from({ length: numero }, (_, index) => ({
      nome: "",
      idade: 0,
      posicao: "PG",
      status: "Ativo",
      altura: "",
      foto: null,
      time: null, // Será associado posteriormente
    }));
    setJogadores(newJogadores as JogadorType[]);
  };

  const handleCreateTimeWithPlayers = async () => {
    try {
      const formData = new FormData();
      formData.append("nome", newTime.nome);
      formData.append("regiao", newTime.regiao);
      formData.append("treinador", newTime.treinador);
      formData.append("descricao", newTime.descricao);
      formData.append("numero_jogadores", newTime.numero_jogadores?.toString() || "0");
      if (newTime.logo) {
        formData.append("logo", newTime.logo);
      }
      formData.append("jogadores", JSON.stringify(jogadores));

      console.log("FormData enviado:", Object.fromEntries(formData.entries()));

      const response = await axios.post("http://localhost:8000/create_time/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);
      atualizaTimes();
    } catch (error) {
      console.error("Erro ao criar time e jogadores:", error);

      if (axios.isAxiosError(error) && error.response) {
        console.error("Detalhes do erro:", error.response.data);
        alert(`Erro: ${error.response.data.error || "Algo deu errado no servidor"}`);
      } else {
        alert("Erro desconhecido. Verifique o console para mais detalhes.");
      }
    }
  };

  useEffect(() => {
    atualizaTimes();
  }, []);

  useEffect(() => {
    if (selectedTime) buscaJogadores(selectedTime.id);
  }, [selectedTime]);

  return (
    <Layout pag={"TIMES"}>
      <div style={{ margin: "auto", width: "100%", padding: "10px", display: "grid", gap: "10px" }}>
        <ToastContainer />

        {/* Detalhes do time selecionado */}
        {selectedTime && (
          <HeaderArea>
            <div className="header-content">
              <Image
                src={
                  selectedTime.logo
                    ? `http://127.0.0.1:8000${selectedTime.logo}`
                    : "http://127.0.0.1:8000/media/times/logos/default-logo.png"
                }
                width={120}
                height={120}
                alt={`${selectedTime.nome} logo`}
                className="team-logo"
              />
              <div className="team-details">
                <h1>{selectedTime.nome}</h1>
                <p>
                  <strong>Região:</strong> {selectedTime.regiao}
                </p>
                <p>
                  <strong>Treinador:</strong> {selectedTime.treinador}
                </p>
                <p>
                  <strong>Jogadores:</strong> {selectedTime.numero_jogadores}
                </p>
              </div>
            </div>
            <div className="team-stats">
              <p>
                <strong>Vitórias:</strong> {selectedTime.vitorias} |{" "}
                <strong>Derrotas:</strong> {selectedTime.derrotas}
              </p>
              <p>
                <strong>Descrição:</strong> {selectedTime.descricao}
              </p>
            </div>
          </HeaderArea>

        )}

        {/* Dropdown de seleção de time */}
        <Dropdown>
          <label htmlFor="time-select">Selecione um time:</label>
          <select
            id="time-select"
            onChange={(e) => {
              const selected = times.find((time) => time.id === parseInt(e.target.value));
              setSelectedTime(selected || null);
            }}
          >
            <option value="">Selecione um time</option>
            {times.map((time) => (
              <option key={time.id} value={time.id}>
                {time.nome}
              </option>
            ))}
          </select>
        </Dropdown>

        <JogadorRowContainer>
          {jogadores.map((jogador) => (
            <JogadorRow key={jogador.id}>
              <Image
                src={jogador.foto ? `http://127.0.0.1:8000${jogador.foto}` : "http://127.0.0.1:8000/media/jogadores/fotos/default-player.png"}
                width={50}
                height={50}
                alt={`${jogador.nome} foto`}
                style={{ borderRadius: "50%", cursor: "pointer" }}
                onClick={() => togglePlayerDetails(jogador.id)}
              />
              <div style={{ flex: 1 }}>
                <td><strong>{jogador.nome}</strong></td>
                <td>| Posição: {jogador.posicao}</td>
                <td>| Idade: {jogador.idade}</td>
              </div>
              {selectedPlayer === jogador.id && (
                <div className="details">
                  <p>Status: {jogador.status}</p>
                  <p>Altura: {jogador.altura}</p>
                  <p>Pontos: {jogador.pontos}</p>
                  <p>Rebotes: {jogador.rebotes}</p>
                  <p>Assistências: {jogador.assistencias}</p>
                  <p>Turnovers: {jogador.turnovers}</p>
                  <p>Roubos de Bola: {jogador.roubos_bola}</p>
                  <p>Número de Jogos: {jogador.num_jogos}</p>
                </div>
              )}
            </JogadorRow>
          ))}
        </JogadorRowContainer>


        {/* Formulário de cadastro de time */}
        {/* Formulário de cadastro de time */}
        <FormContainer>
          <h2>Cadastrar Novo Time</h2>
          <InputField
            type="text"
            placeholder="Nome"
            value={newTime.nome}
            onChange={(e) => setNewTime({ ...newTime, nome: e.target.value })}
          />
          <InputField
            type="text"
            placeholder="Região"
            value={newTime.regiao}
            onChange={(e) => setNewTime({ ...newTime, regiao: e.target.value })}
          />
          <InputField
            type="text"
            placeholder="Treinador"
            value={newTime.treinador}
            onChange={(e) => setNewTime({ ...newTime, treinador: e.target.value })}
          />
          <InputField
            type="number"
            placeholder="Número de Jogadores"
            value={newTime.numero_jogadores}
            onChange={handleNumeroJogadoresChange}
          />
          <TextAreaField
            placeholder="Descrição"
            value={newTime.descricao}
            onChange={(e) => setNewTime({ ...newTime, descricao: e.target.value })}
          />
          <InputField
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              setNewTime({ ...newTime, logo: file });
            }}
          />

          {jogadores.map((jogador, index) => (
            <PlayerCard key={index}>
              <h4>Jogador {index + 1}</h4>
              <InputField
                type="text"
                placeholder="Nome"
                value={jogador.nome}
                onChange={(e) => {
                  const updated = [...jogadores];
                  updated[index].nome = e.target.value;
                  setJogadores(updated);
                }}
              />
              <InputField
                type="number"
                placeholder="Idade"
                value={jogador.idade}
                onChange={(e) => {
                  const updated = [...jogadores];
                  updated[index].idade = parseInt(e.target.value);
                  setJogadores(updated);
                }}
              />
              <SelectField
                value={jogador.posicao}
                onChange={(e) => {
                  const updated = [...jogadores];
                  updated[index].posicao = e.target.value;
                  setJogadores(updated);
                }}
              >
                <option value="PG">Armador</option>
                <option value="SG">Ala-Armador</option>
                <option value="SF">Ala</option>
                <option value="PF">Ala-Pivô</option>
                <option value="C">Pivô</option>
              </SelectField>
              <InputField
                type="text"
                placeholder="Altura (0.00)"
                value={jogador.altura}
                onChange={(e) => {
                  const updated = [...jogadores];
                  updated[index].altura = e.target.value;
                  setJogadores(updated);
                }}
              />
              <InputField
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const updated = [...jogadores];
                  updated[index].foto = e.target.files ? e.target.files[0] : null;
                  setJogadores(updated);
                }}
              />
            </PlayerCard>
          ))}

          <SubmitButton onClick={handleCreateTimeWithPlayers}>
            Cadastrar Time e Jogadores
          </SubmitButton>
        </FormContainer>
      </div>
    </Layout>
  );
}
