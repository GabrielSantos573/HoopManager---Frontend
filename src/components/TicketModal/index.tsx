import axios from "axios";
import { Container, FormularioDesconto, InfoCard, Tabela, TituloCard } from "./style";
import { Chart } from "react-google-charts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPenToSquare, faSquarePlus, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { DescontoType, TicketType } from "../../types/types";
import Trash from "../../icons/trash";
import Editar from "../../icons/editar";

export const TicketModal = (props: { numeroTicket: number }) => {
  const [ticket, setTicket] = useState<TicketType>({
    ticket: 4149820,
    estacao: "BAPRI0TC001",
    descricao: "Falha Terceiros - Fornecedor EILD",
    prioridade: "Alta",
    sla: "05:00:00",
    inicio: "14/03/2024 18:12:04",
    fim: "18/03/2024 18:03:08",
    atendimento: "67:58:02",
    atendimento_back: "67:58:02",
    mes: "Março - 2024",
    categoria: "IP",
    status: "ABERTO",
    filas: [
      {
        nome: "N1 - TELECOM",
        entrada: "2024-03-15T15:30:46.000Z",
        saida: "2024-03-15T15:34:36.000Z",
      },
    ],
    descontos: [],
  });
  const [inicio, setInicio] = useState('2024-04-01T00:00');
  const [fim, setFim] = useState('2024-04-01T00:00');
  const [categoria, setCategoria] = useState('Outros');
  const [observacao, setObservacao] = useState('');
  const [aplicado, setAplicado] = useState(false);
  const [idDesconto, setIdDesconto] = useState(2);
  const [formDesc, setFormDesc] = useState(false);
  const [formType, setFormType] = useState('novo');
  const [aprova, setAprova] = useState(false);
  const [formTicket, setFormTicket] = useState(false);
  const [categoriaTicket, setCategoriaTicket] = useState(ticket.categoria);
  const [prioridadeTicket, setPrioridadeTicket] = useState(ticket.prioridade);
  const [neutralizaTicket, setNeutralizaTicket] = useState(false);

  function convertDateFormat(dateStr: String) {
    let [date, time] = dateStr.split(' ');
  
    let [day, month, year] = date.split('/');
    let newDateStr = `${year}-${month}-${day}T${time}`;
  
    let dateObj = new Date(newDateStr);
    return dateObj.toISOString();
  }

  function convertDateFormat2(dateStr: String) {
    let [date, time] = dateStr.split(' ');
  
    let [day, month, year] = date.split('/');
    let [hour, minute, second] = time.split(':')
    let newDateStr = `${year}-${month}-${day}T${hour}:${minute}`;
  
    return newDateStr;
  }

  function convertDateBack(dateStr: string){
    let [date, time] = dateStr.split('T');
    let [year, month, day] = date.split('-');
    let [hour, minute] = time.split(':')
    let novaData = `${day}/${month}/${year} ${hour}:${minute}:00`

    return novaData;
  }

  function convertDateTimeline(dateStr: string){
    let [date, time] = dateStr.split(' ');
    let [day, month, year] = date.split('/');
    let [hour, minute, second] = time.split(':');
    let novaData = `${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`

    return novaData;
  }

  useEffect(() => {
    console.log(props.numeroTicket)
    axios.get(`http://localhost:8000/busca_ticket/?q=${props.numeroTicket}`)
    .then(function (response) {
      // handle success
      console.log(response.data[0]);
      setTicket(response.data[0]);
      if (ticket.status == 'ABERTO'){
        setNeutralizaTicket(false);
      } else if (ticket.status == 'NEUTRALIZADO'){
        setNeutralizaTicket(true);
      }
    })
    .catch(function (error) {
      // handle error
      console.error(error);
    });
  }, [formDesc, aprova, formTicket])
  
  const columns = [
    {type: "string", id: "Ticket"},
    {type: "string", id: "name"},
    {type: "string", role: "tooltip"},
    {type: "date", id: "Start"},
    {type: "date", id: "End"},
  ]

  const row = [];
  
  row.push(["Ticket", 
            ticket.ticket.toString(), 
            `<div style="white-space: nowrap; padding: 4px; display: flex; aling-items: start; font-size: 14px; gap: 4px;"><b>Incidente ${ticket.ticket}</b></div>
             <div style="white-space: nowrap; padding: 4px; display: flex; aling-items: start; font-size: 14px; gap: 4px;"><b>Ticket:</b> ${ticket.inicio} - ${ticket.fim}</div>
             <div style="white-space: nowrap; padding: 4px; display: flex; aling-items: start; font-size: 14px; gap: 4px;"><b>Período:</b> ${ticket.atendimento}</div>` ,
            new Date(convertDateFormat(ticket.inicio)), new Date(convertDateFormat(ticket.fim))
          ]);

  console.log(ticket)

  for (let i = 0; i < ticket.filas.length; i++) {
    let fila = ticket.filas[i];
    let entrada = new Date(fila.entrada);
    entrada.setHours(entrada.getHours() + 3);
    let saida = new Date(fila.saida);
    saida.setHours(saida.getHours() + 3);
    let diff = saida.getTime() - entrada.getTime();
    let hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    let mins = Math.floor(diff / (1000 * 60));
    diff -= mins * (1000 * 60);
    let secs = Math.floor(diff / (1000));
    let total = hours.toString().padStart(2, '0') + ':' + mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');
    row.push([fila.nome, 
              "", 
              `<div style="white-space: nowrap; padding: 4px; display: flex; aling-items: start; font-size: 14px; gap: 4px;"><b>${fila.nome}:</b> ${convertDateBack(fila.entrada)} - ${convertDateBack(fila.saida)}</div>
              <div style="white-space: nowrap; padding: 4px; display: flex; aling-items: start; font-size: 14px; gap: 4px;"><b>Período:</b>${total}</div>` ,
              entrada, 
              saida
            ]);
}

  row.sort((a, b) => {
    if (a[2] instanceof Date && b[2] instanceof Date) {
      return a[2].getTime() - b[2].getTime();
    }
    return 0;
  });

  for (let i = 0; i < ticket.descontos.length; i++) {
    let desconto = ticket.descontos[i];
    let entrada = new Date(convertDateTimeline(desconto.inicio));
    entrada.setHours(entrada.getHours() + 3);
    let saida = new Date(convertDateTimeline(desconto.fim));
    saida.setHours(saida.getHours() + 3);
    if(desconto.aplicado){
      row.push(["Descontos", 
              "", 
              `<div style="white-space: nowrap; padding: 4px; display: flex; aling-items: start; font-size: 14px; gap: 4px;"><b>Desconto Aprovados: </b> ${desconto.inicio} - ${desconto.fim}</div>
              <div style="white-space: nowrap; padding: 4px; display: flex; aling-items: start; font-size: 14px; gap: 4px;"><b>Período:</b>${ticket.descontos[i].total}</div>` ,
              entrada, 
              saida
            ]);
    }else{
      row.push(["Descontos Pendentes", 
              "", 
              `<div style="white-space: nowrap; padding: 4px; display: flex; aling-items: start; font-size: 14px; gap: 4px;"><b>Desconto Aprovados: </b> ${desconto.inicio} - ${desconto.fim}</div>
              <div style="white-space: nowrap; padding: 4px; display: flex; aling-items: start; font-size: 14px; gap: 4px;"><b>Período:</b>${ticket.descontos[i].total}</div>` ,
              entrada, 
              saida
            ]);
    }
    
}

  console.log(row);

  const data = [columns, ...row];

  var timeline_options = {
    hAxis: {
      format:''
    },
    tooltip:{
      allowHtml: true,
      format: "MMM dd, yyyy"
    },
    vAxis: {
      format: 'long'
    }
  };

  
  
  const [user, setUser] = useState('');

    useEffect(() => {
        
          (async () => {
            try {
              const { data } = await axios.get("http://localhost:8000/home/", {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
              });
              setUser(data)
            } catch (e) {
              console.log("not auth");
            }
          })();

      }, []);

  function aprovaDesconto(desconto: DescontoType) {
    if (window.confirm('Tem certeza de que deseja aprovar este desconto?')) {
      axios.post(`http://localhost:8000/update_desconto/${desconto.id}/`, {
        "inicio": desconto.inicio,
        "fim": desconto.fim,
        "categoria": desconto.categoria,
        "aplicado": true,
        "observacao": desconto.observacao,
        "auditor": user,
      })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }
    setAprova(!aprova);
  }

  function deletaDesconto(descontoId: any) {
    if (window.confirm('Tem certeza de que deseja excluir este desconto?')) {
        axios.delete(`http://localhost:8000/delete_desconto/${descontoId}/`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }
    setAprova(!aprova);
  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log({ inicio, fim, categoria, observacao });
  };

  const handleSubmitTicket = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  function editarDesconto(desconto: DescontoType){
    setIdDesconto(desconto.id);
    setInicio(convertDateFormat2(desconto.inicio));
    setFim(convertDateFormat2(desconto.fim));
    setCategoria(desconto.categoria);
    setAplicado(desconto.aplicado);
    setObservacao(desconto.observacao);
    setFormType('editar');
    setFormDesc(!formDesc);
  }

  function request_editarDesconto() {
    console.log(idDesconto);
    let inicio_convertido = convertDateBack(inicio);
    let fim_convertido = convertDateBack(fim);
    console.log(inicio_convertido);
    console.log(fim_convertido);
    console.log(categoria);
    axios.post(`http://localhost:8000/update_desconto/${idDesconto}/`, {
      "inicio": inicio_convertido,
      "fim": fim_convertido,
      "categoria": categoria,
      "aplicado": aplicado,
      "audito": user,
    })
      .then(response => {
          console.log(response.data);
      })
      .catch(error => {
          console.error(error);
      });
      setFormDesc(!formDesc);
  }
  
  function criarDesconto(){
    setInicio('0000-00-00T00:00');
    setFim('0000-00-00T00:00');
    setCategoria('Aguardando CIGR');
    setFormType('novo');
    setFormDesc(!formDesc);
  }

  function requestCriarDesconto() {
    let inicio_convertido = convertDateBack(inicio);
    let fim_convertido = convertDateBack(fim);
    console.log(inicio_convertido);
    console.log(fim_convertido);
    console.log(categoria);
    axios.post(`http://localhost:8000/post_desconto/${ticket.ticket}/`, {
      "inicio": inicio_convertido,
      "fim": fim_convertido,
      "categoria": categoria,
      "aplicado": false,
      "observacao": observacao
    })
      .then(response => {
          console.log(response.data);
      })
      .catch(error => {
          console.error(error);
      });
      setFormDesc(!formDesc);
  }

  function deletaTicket(TicketId: any) {
    if (window.confirm('Tem certeza de que deseja excluir este Ticket?')) {
      axios.post(`http://localhost:8000/update_ticket/${TicketId}/`,{
        "prioridade": ticket.prioridade,
        "categoria": ticket.categoria,
        "status": "EXPURGADO",
      })
        .then(response => {
            console.log(response.data);
            setFormTicket(!formTicket);
        })
        .catch(error => {
            console.error(error);
        });
    }
    setAprova(!aprova);
  }
  
  function updateTicket() {
    let tickStatus = 'ABERTO'
    if (neutralizaTicket){
      tickStatus = 'NEUTRALIZADO'
    } else {
      tickStatus = 'ABERTO'
    }
    axios.post(`http://localhost:8000/update_ticket/${ticket.ticket}/`,{
      "prioridade": prioridadeTicket,
      "categoria": categoriaTicket,
      "status": tickStatus,
    })
        .then(response => {
            console.log(response.data);
            setFormTicket(!formTicket);
        })
        .catch(error => {
            console.error(error);
        });
  }


  return( 
    <Container>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "100px"}}>
        <InfoCard>
          <span className="esquerda titulo">Ticket: </span>
          <span className="titulo">{ticket.ticket}</span>
          <span className="esquerda">Site: </span>
          <span>{ticket.estacao}</span>
          <span className="esquerda">Causa: </span>
          <span>{ticket.descricao}</span>
          <span className="esquerda">Categoria: </span>
          <span>{ticket.categoria}</span>
          <span className="esquerda">Prioridade: </span>
          <span>{ticket.prioridade}</span>
          <span className="esquerda">Status: </span>
          <span>{ticket.status}</span>
        </InfoCard>
        <div style={{width: "100%", display: "flex", gap: "10px"}}>
          <InfoCard>
            <span className="esquerda titulo">SLA: </span>
            <span className="titulo">{ticket.sla}</span>
            <span className="esquerda">Abertura: </span>
            <span>{ticket.inicio}</span>
            <span className="esquerda">Fechamento: </span>
            <span>{ticket.fim}</span>
            <span className="esquerda">Atendimento: </span>
            {ticket.status == 'ABERTO' && <span>{ticket.atendimento}</span>}
            {ticket.status == 'EXPURGADO' && <span style={{color: 'gray'}}>{ticket.atendimento}</span>}
            {ticket.status == 'NEUTRALIZADO' && 
              <div>
                <span style={{textDecoration: 'line-through red', color: 'red'}}>{ticket.atendimento_back}</span>
                <span>  {ticket.atendimento}</span>
              </div>
            }
          </InfoCard>
          <div style={{display: 'flex', flexDirection: 'column', gap: '2px', height: '150px', position: 'relative'}}>
            <div onClick={() => deletaTicket(ticket.ticket)}>
              <Trash size={36} color="#0D3080" hoverColor="#fff" />
            </div>
            <div onClick={() => setFormTicket(!formTicket)}>
              <Editar size={36} color="#0D3080" hoverColor="#fff" />
            </div>
            {formTicket && 
              <FormularioDesconto className="formTicket" onSubmit={handleSubmitTicket}>
                <strong>EDITAR TICKET</strong>
                <label>
                  Categoria:
                  <select value={categoriaTicket} onChange={e => setCategoriaTicket(e.target.value)}>
                    <option value="DWDM">DWDM</option>
                    <option value="FIBRA">FIBRA</option>
                    <option value="INFRA">INFRA</option>
                    <option value="IP">IP</option>
                    <option value="RADIO">RADIO</option>
                    <option value="CLIENTE">CLIENTE</option>
                    <option value="VIASAT">VIASAT</option>
                    <option value="Desconhecido">Desconhecido</option>
                  </select>
                </label>
                <label>
                  Prioridade:
                  <select value={prioridadeTicket} onChange={e => setPrioridadeTicket(e.target.value)}>
                    <option value="Nível 0">Nível 0</option>
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                  </select>
                </label>
                <label style={{whiteSpace: 'nowrap', pointerEvents: 'none'}}>
                  Neutralizar Ticket:
                  <input type="checkbox" checked={neutralizaTicket} onChange={() => setNeutralizaTicket(!neutralizaTicket)} style={{pointerEvents: 'all', marginRight: '0px', width: '20px'}} />
                </label>
                <button type="submit" onClick={() => updateTicket()}>Editar Ticket</button>
              </FormularioDesconto>
            }
          </div>
        </div>
        
      </div>
      <Chart
        chartType="Timeline"
        data={data}
        width="100%"
        height="300px"
        options={timeline_options}
      />
      <TituloCard>
        <span>Descontos</span>
        <FontAwesomeIcon icon={faSquarePlus} size="2x" onClick={() => criarDesconto()} style={{cursor: "pointer"}} />
      </TituloCard>
      
      {ticket.descontos.length != 0 &&
        <Tabela role="grid">
          <thead>
            <tr className="cabeca">
            <th className="sort" tabIndex={0} rowSpan={1} colSpan={1}>Inicio</th>
              <th className="sort" tabIndex={0} rowSpan={1} colSpan={1}>Fim</th>
              <th tabIndex={0} rowSpan={1} colSpan={1}>Tempo Total</th>
              <th tabIndex={0} rowSpan={1} colSpan={1}>Observação</th>
              <th tabIndex={0} rowSpan={1} colSpan={1}>Auditor</th>
              <th tabIndex={0} rowSpan={1} colSpan={1}>Categoria</th>
              <th tabIndex={0} rowSpan={1} colSpan={1}>Status</th>
              <th tabIndex={0} rowSpan={1} colSpan={1}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {ticket.descontos.map((desconto, index) => 
              <tr key={index} role="row">
                <td>{desconto.inicio}</td>
                <td>{desconto.fim}</td>
                <td>{desconto.total}</td>
                <td>{desconto.observacao}</td>
                <td>{desconto.auditor}</td>
                <td><span className="categoria">{desconto.categoria}</span></td>
                <td>{desconto.aplicado ? 
                  <span className="aprovado">APROVADO</span> : 
                  <div><span className="pendente">PENDENTE</span></div>
                  }
                </td>
                <td style={{display: "flex", maxWidth: "120px", height: "32px", gap: "10px", alignItems: "center", justifyContent: "center"}}>
                  {!desconto.aplicado && <FontAwesomeIcon icon={faCircleCheck} size="2x" onClick={() => aprovaDesconto(desconto)} style={{color: "#0D3080", cursor: "pointer"}} />}
                  <FontAwesomeIcon icon={faPenToSquare} size="2x" onClick={() => editarDesconto(desconto)} style={{color: "#0D3080", cursor: "pointer"}}/>
                  <FontAwesomeIcon icon={faTrashCan} size="2x" onClick={() => deletaDesconto(desconto.id)} style={{color: "#0D3080", cursor: "pointer"}}/>
                </td>
                
              </tr>
            )}
          </tbody>
        </Tabela>
      }
      {ticket.descontos.length == 0 && <span style={{fontSize: "16px", fontWeight: "700", color: "#0D3080"}}>Sem Descontos</span> }
      
      {formDesc && 
        <FormularioDesconto onSubmit={handleSubmit}>
          <label>
            Início:
            <input type="datetime-local" value={inicio} onChange={e => setInicio(e.target.value)} />
          </label>
          <label>
            Fim:
            <input type="datetime-local" value={fim} onChange={e => setFim(e.target.value)} />
          </label>
          <label>
            Categoria:
            <select value={categoria} onChange={e => setCategoria(e.target.value)}>
              <option value="Acesso">Acesso</option>
              <option value="Aguardando CIGR">Aguardando CIGR</option>
              <option value="Área de Risco">Área de Risco</option>
              <option value="Atividade Agendada">Atividade Agendada</option>
              <option value="Falta de Energia">Falta de Energia</option>
              <option value="Sobressalente">Sobressalente</option>
              <option value="Terceiros">Terceiros</option>
              <option value="Falha Restabelecida">Falha Restabelecida</option>
              <option value="Outros">Outros</option>
            </select>
          </label>
          <label>
            Observação:
            <textarea value={observacao} onChange={e => setObservacao(e.target.value)} />
          </label>
          {formType == 'editar' && <button type="submit" onClick={() => request_editarDesconto()}>Atualizar Desconto</button>}
          {formType == 'novo' && <button type="submit" onClick={() => requestCriarDesconto()}>Criar Desconto</button>}
        </FormularioDesconto>
      }
      
    </Container>
  );
};
