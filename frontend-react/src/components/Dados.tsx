import { api } from "../services/ApiService";

export async function Ver_Votacao(playerId: string) {
  try {
    const res = await api.post(`jogador/jogador${playerId}/votacao`);
    console.log("votacao: ", res.data)
    return res.data as string[];
  } catch (err: any) {
    console.error("falhou em puxar votacao: ", err.data)
  }
}

export async function Deposita_Votos(playerId: string, opcao: string) {
  try {
    const res = await api.post(`jogador/jogador${playerId}/votacao/${opcao}`);
    console.log("mandei depositar: ", res.data);
  } catch(err: any) {
    console.error("erro ao depositar voto: ", err.data)
  }
}

export async function Rolar_todos(playerId: string) {
  try {
    const res = await api.get(`jogador/jogador${playerId}/rolaTodos`);
    console.log("rolei todos os dados: ", res.data);
    return res.data;
  } catch (err: any) {
    console.error("erro ao rolar todos os dados: ", err.data);
  }
}

export async function Inicia_rolagens(playerId: string) {
  try {
    const res = await api.post(`mestre/jogador${playerId}/iniciaRolagens`)
    console.log("reseta dados: ", res.data)
    return res.data;
  } catch (err: any) {
    console.error("erro: ", err.data)
  }
}

export async function Cria_Votacao(playerId: string, opcao: string[]) {
  const data = JSON.stringify({"opcao": opcao})
  try {
    const res = await api.post(`mestre/jogador${playerId}/criaVotacao`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("Criei uma votação!", res.data)
  } catch (err: any) {
    console.error("Erro ao criar votacao", err.data)
  }
}

export async function Tranca_dados(playerId: string, bonus: number) {
  try {
    console.log("Enviando bonus para API:", bonus);
    const res = await api.post(`mestre/jogador${playerId}/exibeRolagem`, {
      bonus: bonus
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    console.log("Resposta da API:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("erro ao trancar dados: ", err.response?.data || err.message);
  }
}

// export async function Espera_Votacao(playerId: string, opcao: string[]) {
//   const data = JSON.stringify({"opcao": opcao})
//   console.log("mandando: ", data)
//   try {
//     const res = await api.post(`mestre/jogador${playerId}/esperaVotacao`, data, {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//     console.log("Mandei opcao: ", res.data)
//   } catch (err: any) {
//     console.error("deu ruim ao mandar opcao: ", err.data)
//   }
// }

export async function Votacao_Estado(playerId: string) {
  try {
    const res = await api.get(`mestre/jogador${playerId}/votacaoEstado`);
    console.log("estado da votacao: ", res.data);
  } catch (err:any) {
    console.error("votacao estado erro: ", err.data)
  }
}
