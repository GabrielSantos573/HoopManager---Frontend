import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../../components/Layout";
import useAuth from "../../hook/withAuth";
import {
  BuscaInput, CountArea,
  HeaderArea, NavButton,
  PagButton, PagContainer, QuantidadeTicket, SelectArea, SemTicketMessagem, Tabela
} from "../../styles/timesStyle";
import { AxiosData, EstacaoType } from "../../types/types";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const qs = require('qs');

export default function Home() {
  const [estacoes, setEstacoes] = useState<EstacaoType[]>([]);
  const [estacoesBack, setEstacoesBack] = useState<EstacaoType[]>([]);
  const [select, isSelect] = useState(false);
  const [count, isCount] = useState(false);
  const [countEstacao, isCountEstacao] = useState(10);
  const [pagina, isPagina] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const [sortField, setSortField] = useState('');
  const [estado, isEstado] = useState("AC");
  const [altera, setAltera] = useState(true);
  useAuth();

  const sortEstacao = async(field: keyof EstacaoType, inverte: Boolean) => {
    setSortField(field);
    const sortedEstacoes = [...estacoes].sort((a: EstacaoType, b: EstacaoType) => {
      let valueA: any, valueB: any;
      if (field === 'codigo' || field === 'localidade' || field === 'estado' || field === 'descricao' || field === 'tipo' 
        || field === 'status' || field === 'latitude' || field === 'longitude' || field === 'cedente' || field === 'cm' || field === 'os_padtec') {
        valueA = a[field];
        valueB = b[field];
      }
      if (inverte){
        return isAscending ? valueA - valueB : valueB - valueA;
      }
      else{
        return !isAscending ? valueA - valueB : valueB - valueA;
      }
    });
  
    setEstacoes(sortedEstacoes);

    const sortedEstacoes2 = [...estacoesBack].sort((a: EstacaoType, b: EstacaoType) => {
      let valueA: any, valueB: any;
      if (field === 'codigo' || field === 'localidade' || field === 'estado' || field === 'descricao' || field === 'tipo' 
        || field === 'status' || field === 'latitude' || field === 'longitude' || field === 'cedente' || field === 'cm' || field === 'os_padtec') {
        valueA = a[field];
        valueB = b[field];
      }
      if (inverte){
        return isAscending ? valueA - valueB : valueB - valueA;
      }
      else{
        return !isAscending ? valueA - valueB : valueB - valueA;
      }
    });

    setEstacoesBack(sortedEstacoes2);
    if (inverte){
      setIsAscending(!isAscending);
    }
  }

  const atualizaEstacoes = async () => {
    try {
      let data: AxiosData = {};
      if (estado !== '') data.estado = estado;
  
      const config = {
        method: 'post',
        url: 'http://localhost:8000/get_estacoes/',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
      };
  
      const response = await axios(config);
      setEstacoes(response.data);
      setEstacoesBack(response.data);
      setAltera(!altera);
      
    } catch (error) {
      console.error(`Erro ao buscar localidades: ${error}`);
    }
  };

  // Usando 'useEffect' para executar o código dentro da função quando o componente é montado.
  useEffect(() => {
    // Verificando se o token de acesso existe no armazenamento local.
    
      (atualizaEstacoes)();
    // eslint-disable-next-line
  }, [estado]);

  useEffect(() => {
      if (sortField === 'codigo'){
        sortEstacao('codigo', true);
      }
      if (sortField === 'localidade'){
        sortEstacao('localidade', true);
      } 
      if (sortField === 'estado'){
        sortEstacao('estado', true);
      }
      if (sortField === 'descricao'){
        sortEstacao('descricao', true);
      }
      if (sortField === 'tipo'){
        sortEstacao('tipo', true);
      }
      if (sortField === 'status'){
        sortEstacao('status', true);
      }
      if (sortField === 'latitude'){
        sortEstacao('latitude', true);
      }
      if (sortField === 'longitude'){
        sortEstacao('longitude', true);
      }
      if (sortField === 'cedente'){
        sortEstacao('cedente', true);
      }
      if (sortField === 'cm'){
        sortEstacao('cm', true);
      }
      if (sortField === 'os_padtec'){
        sortEstacao('os_padtec', true);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [altera]);

  const alteraSelect = async () => {
    if(select == true){
      isSelect(false);
    }
    if(count == true){
      isCount(false);
    }
  }

  const totalBotoes = Math.ceil(estacoes.length / countEstacao);

  // Cria um array com os números das páginas
  const paginas = Array.from({ length: totalBotoes }, (_, index) => index + 1);

  const alteraPagCont = async (e: { target: { value: any; }; }) =>{
    isCountEstacao(Number(e.target.value));
    isPagina(Number(0));
  }

  const alteraEstado = async(e: { target: { value: any; }; }) =>{
    isEstado(String(e.target.value));
  }


  function buscaTabela(e: any){
    const estacaoBusca = estacoesBack;
    const busca = e.toString().toUpperCase()
    const result = estacaoBusca.filter(estacaoBusca => estacaoBusca.codigo.toString().toUpperCase().indexOf(busca) !== -1 
    || estacaoBusca.descricao.toString().toUpperCase().indexOf(busca) !== -1 || estacaoBusca.localidade.toString().toUpperCase().indexOf(busca) !== -1 || estacaoBusca.status.toString().toUpperCase().indexOf(busca) !== -1);
    setEstacoes(result);
    if (busca == ""){
      setEstacoes(estacoesBack);
    }
  }


  return (
    <Layout onClick={alteraSelect} pag={"TIMES"}>
        <div style={{margin: "auto", width: "100%", padding: "20px", display: "grid", gap: "20px"}}>
        <ToastContainer />

          <HeaderArea>
            <div style={{position: "relative"}}>
              <BuscaInput onChange={(e) => buscaTabela(e.target.value)} id="busca" placeholder="Busca" />
              <label htmlFor="busca" style={{position: "absolute", top: "10px", left: "8px"}}>
                <Image src={"/search.png"} width={15}  height={16} alt="busca_icon" />
              </label>
            </div>

            <div style={{display: "flex", gap: "8px"}}>
              <QuantidadeTicket>
                {(countEstacao * (pagina + 1)) - countEstacao+ 1}
                {(countEstacao * (pagina + 1)) > estacoes.length && <> até {estacoes.length} de </>} 
                {(countEstacao * (pagina + 1)) <= estacoes.length && <> até {countEstacao * (pagina + 1)} de </>} 
                {estacoes.length} TIMES
              </QuantidadeTicket>
              <CountArea 
                className={count? "aberto" : "fechado"} 
                onClick={() => isCount(!count)}
                value={countEstacao}
                onChange={alteraPagCont}
              >
                <option value={"10"} onClick={() => isCountEstacao(10)}>10</option>
                <option value={"25"} onClick={() => isCountEstacao(25)}>25</option>
                <option value={"50"} onClick={() => isCountEstacao(50)}>50</option>
              </CountArea>
              <SelectArea 
                className={select? "aberto" : "fechado"} 
                onClick={() => isSelect(!select)}
                onChange={alteraEstado}
                defaultValue={"TODOS"}
              >
               {/* {Estados.map((estado, index) => <option value={estado} key={index}>{estado}</option>)}*/}
              </SelectArea>
            </div>
            
          </HeaderArea>
          {estacoes.length != 0 && 
            <Tabela role="grid">
              <thead>
                <tr className="cabeca">
                  <td>Código</td>
                  <td>Descrição</td>
                  <td>Localidade</td>
                  <td>Tipo</td>
                  <td>Status</td>
                  <td>Lider</td>
                </tr>
              </thead>
              <tbody>
                {estacoes.slice(pagina * countEstacao, countEstacao * (pagina + 1)).map(( station,index) => 
                  <tr key={station.codigo} role="row">
                    <td className="ticket">
                      <Link href={`/estacao-detalhe/${station.codigo}`}>{station.codigo}</Link>
                    </td>
                    <td>{station.descricao}</td>
                    <td>{station.localidade}</td>
                    <td>{station.tipo}</td>
                    <td>
                      <span className="categoria" data-category={station.status}>{station.status}</span>
                      
                      {station.os_padtec && (
                        <span>     |     </span>
                      )}
                      {station.os_padtec && (
                        <span className="categoria" data-category="OS Padtec">{station.os_padtec ? "OS PADTEC" : ""}</span>
                      )}
                    </td>
                    <td>{station.lider}</td>
                  </tr>
                )}
              </tbody>
            </Tabela>
          }
          {estacoes.length === 0 && <SemTicketMessagem>Sem Times</SemTicketMessagem>}
          
          <PagContainer>
            
            {pagina > 0 && 
              <NavButton onClick={() => isPagina(pagina -1)}>&lt;</NavButton>
            }
            {paginas.map((pagNu, index) => {
                if (pagNu >= pagina - 1 && pagNu <= pagina + 3) {
                    // Renderiza os números ao redor da página atual
                    return (
                        <PagButton
                            onClick={() => isPagina(pagNu - 1)}
                            ativo={pagina + 1 === pagNu}
                            key={pagNu}
                        >
                            {pagNu}
                        </PagButton>
                    );
                } else if (pagNu === pagina + 4 || pagNu === pagina - 2) {
                    // Renderiza "..." antes e depois dos números ao redor da página atual
                    return <span key={`ellipsis${pagNu}`}>...</span>;
                } else if (pagNu === 1 || pagNu === paginas.length) {
                    // Renderiza o primeiro e último número
                    return (
                        <PagButton
                            onClick={() => isPagina(pagNu - 1)}
                            ativo={pagina + 1 === pagNu}
                            key={pagNu}
                        >
                            {pagNu}
                        </PagButton>
                    );
                }
                return null; // Ignora outros números
            })}
            {pagina < totalBotoes - 1 && 
              <NavButton onClick={() => isPagina(pagina + 1)}>&gt;</NavButton>
            }
            {pagina == totalBotoes - 1 && 
              <NavButton style={{cursor: "default"}} />
            }
          </PagContainer>

        </div>
    </Layout>
  );
}
