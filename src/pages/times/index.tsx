import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/Layout";
import useAuth from "../../hook/withAuth";
import {
  Dropdown,
  HeaderArea,
  Tabela
} from "../../styles/timesStyle";
import { JogadorType, TimesType } from "../../types/types";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default function Times() {
  const [times, setTimes] = useState<TimesType[]>([]);
  const [jogadores, setJogadores] = useState<JogadorType[]>([]);
  const [selectedTime, setSelectedTime] = useState<TimesType | null>(null);

  useAuth();

  const atualizaTimes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/get_times/");
      setTimes(response.data);
      // Selecionar o primeiro time por padrão
      if (response.data.length > 0) setSelectedTime(response.data[0]);
    } catch (error) {
      console.error(`Erro ao buscar times: ${error}`);
    }
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
                src={`http://127.0.0.1:8000${selectedTime.logo}` || "/default-logo.png"}
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

        <Tabela>
          {/* <thead>
            <tr>
              <td>Nome</td>
              <td>Posição</td>
              <td>Status</td>
              <td>Altura</td>
              <td>Pontos</td>
              <td>Rebotes</td>
              <td>Assistências</td>
            </tr>
          </thead> */}
          <tbody>
            {jogadores.map((jogador, index) => (
              <tr key={index}>
                <td>{jogador.nome}</td>
                <td>{jogador.posicao}</td>
                <td>{jogador.status}</td>
                <td>{jogador.altura}</td>
                <td>{jogador.pontos}</td>
                <td>{jogador.rebotes}</td>
                <td>{jogador.assistencias}</td>
              </tr>
            ))}
          </tbody>
        </Tabela>
      </div>
    </Layout>
  );
}
