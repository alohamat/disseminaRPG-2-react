import { api } from "../services/ApiService";

export async function Player_Full(playerId: string) {
  try {
    const res = await api.post(`jogador/jogador${playerId}/full`)
    console.log("mandei um full", res.data)
  } catch (err: any) {
    console.error("erro: ", err.data)
  }
}

export async function Reseta_dados(playerId: string) {
  try {
    const res = await api.get(`mestre/jogador${playerId}/resetaDados`)
    console.log("reseta dados: ", res.data)
  } catch (err: any) {
    console.error("erro: ", err.data)
  }
}

export async function Cria_Votacao(playerId: string) {
  try {
    const res = await api.post(`mestre/jogador${playerId}/criaVotacao`);
    console.log("Criei uma votação!", res.data)
  } catch (err: any) {
    console.error("Erro ao criar votacao", err.data)
  }
}

export async function Espera_Votacao(playerId: string, opcao: string[]) {
  const data = JSON.stringify({"opcao": opcao})
  console.log("mandando: ", data)
  try {
    const res = await api.post(`mestre/jogador${playerId}/esperaVotacao`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log("Mandei opcao: ", res.data)
  } catch (err: any) {
    console.error("deu ruim ao mandar opcao: ", err.data)
  }
}

export async function Votacao_Estado(playerId: string) {
  try {
    const res = await api.get(`mestre/jogador${playerId}/votacaoEstado`);
    console.log("estado da votacao: ", res.data);
  } catch (err:any) {
    console.error("votacao estado erro: ", err.data)
  }
}