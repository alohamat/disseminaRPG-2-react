import { api } from "../services/ApiService";
import type { DadoCustomizado } from "../pages/DadosPage";

export async function Ver_Votacao(playerId: string) {
  try {
    const res = await api.get(`jogador/jogador${playerId}/votacao`);
    console.log("votacao: ", res.data)
    return res.data;
  } catch (err: any) {
    console.error("falhou em puxar votacao: ", err.response.data)
  }
}

export async function Deposita_Votos(playerId: string, opcao: string) {
  try {
    const res = await api.post(`jogador/jogador${playerId}/votacao/${opcao}`);
    console.log("mandei depositar: ", res.data);
  } catch(err: any) {
    console.error("erro ao depositar voto: ", err.response.data)
  }
}

export async function Rolar_todos(playerId: string) {
  try {
    const res = await api.post(`jogador/jogador${playerId}/rolaTodos`);
    console.log("rolei todos os dados: ", res.data);
    return res.data; // []
  } catch (err: any) {
    console.error("erro ao rolar todos os dados: ", err.response.data);
    throw new Error("Rolagem bloqueada pelo mestre.");
  }
}

export async function Inicia_rolagens(playerId: string, bonus: number, dadosCustomizados: DadoCustomizado[]) {
  try {
    const payload = {
      "bonus_acao": bonus,
      "dados": dadosCustomizados,
    }
    console.log("enviando", payload);
    const res = await api.post(`mestre/jogador${playerId}/iniciaRolagens`, payload)
    return res.data;
  } catch (err: any) {
    console.error("erro: ", err.response.data)
  }
}

export async function Cria_Votacao(playerId: string, opcao: string[]) {
  const data = JSON.stringify({"opcoes": opcao})
  console.log("criando votacao com: ", data);
  try {
    const res = await api.post(`mestre/jogador${playerId}/criaVotacao`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("Criei uma votação!", res.data)
  } catch (err: any) {
    console.error("Erro ao criar votacao", err.response.data)
  }
}

export async function Exibe_rolagem(playerId: string) {
  try {
    const res = await api.get(`mestre/jogador${playerId}/exibeRolagem`);
    console.log("recebi a rolagem: ", res.data)
    return res.data;
    } catch(err: any) {
      console.error("erro ao exibir rolagem: ", err.response.data);
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
    const res = await api.get(`mestre/jogador${playerId}/exibeVotacao`);
    console.log("estado da votacao: ", res.data);
    return res.data;
  } catch (err:any) {
    console.error("votacao estado erro: ", err.response.data)
  }
}
