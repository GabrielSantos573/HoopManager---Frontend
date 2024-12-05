import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/Layout";
import useAuth from "../../hook/withAuth";
import { Dropdown, HeaderArea, JogadorRow, JogadorRowContainer } from "../../styles/timesStyle";
import { JogadorType, TimesType } from "../../types/types";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default function Times() {
  const [times, setTimes] = useState<TimesType[]>([]);
  const [jogadores, setJogadores] = useState<JogadorType[]>([]);
  const [selectedTime, setSelectedTime] = useState<TimesType | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null); // Armazena o ID do jogador selecionado


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
    setSelectedPlayer(selectedPlayer === id ? null : id); // Expande ou fecha as informações
  };

  const buscaJogadores = async (timeId: number) => {
    try {
      const response = await axios.get(`http://localhost:8000/get_jogadores/${timeId}/`);
      setJogadores(response.data);
    } catch (error) {
      console.error(`Erro ao buscar jogadores: ${error}`);
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

        {selectedTime && (
          <HeaderArea>
            <div>
              <Image
                src={selectedTime.logo ? `http://127.0.0.1:8000${selectedTime.logo}` : "http://127.0.0.1:8000/media/times/logos/default-logo.png"}
                width={100}
                height={100}
                alt={`${selectedTime.nome} logo`}
              />
              <h1>{selectedTime.nome}</h1>
              <p>
                Região: {selectedTime.regiao} | Treinador: {selectedTime.treinador} | Jogadores: {selectedTime.numero_jogadores}
              </p>
              <p>
                Vitórias: {selectedTime.vitorias} | Derrotas: {selectedTime.derrotas} | Descrição: {selectedTime.descricao}
              </p>
            </div>
          </HeaderArea>
        )}

        <Dropdown>
          <label htmlFor="time-select">Selecione um time:</label>
          <select
            id="time-select"
            onChange={(e) => {
              const selected = times.find((time) => time.id === parseInt(e.target.value));
              setSelectedTime(selected || null);
            }}
          >
            {times.map((time) => (
              <option key={time.id} value={time.id}>
                {time.nome}
              </option>
            ))}
          </select>
        </Dropdown>

        <JogadorRowContainer>
          {jogadores.map((jogador, index) => (
            <JogadorRow key={index}>
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
      </div>
    </Layout>
  );
}
