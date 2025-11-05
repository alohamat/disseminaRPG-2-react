import { api } from "../services/ApiService";
import type { DadoCustomizado } from "../pages/DadosPage";

export interface DadoVotacao {
  lados: number;
  quantidade: number;
  name: string;
  bonus?: number;
}

export interface OpcaoComDado {
  name: string;
  dados: DadoVotacao;
}

export interface ResultadoVotacao {
  name: string;
  votos: number;
  rolagens?: {
    name: string;
    moda: number | number[];
  };
}

// Função para ver votação (agora suporta ambos os tipos)
export async function Ver_Votacao(playerId: string) {
  try {
    const res = await api.get(`jogador/jogador${playerId}/votacao`);
    console.log("Resposta da votação:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("erro: ", err.response?.data || err.message);
    throw err;
  }
}

// Função para votação normal
export async function Deposita_Votos(playerId: string, voto: string) {
  try {
    const uid = localStorage.getItem("uid");
    const res = await api.post(`jogador/jogador${playerId}/votacao/${voto}`, { uid });
    console.log("Voto depositado:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("erro: ", err.response?.data || err.message);
    throw err;
  }
}

// Nova função para votação com dados
export async function Deposita_Votos_Com_Dado(playerId: string, voto: string) {
  try {
    const uid = localStorage.getItem("uid");
    const res = await api.post(`jogador/jogador${playerId}/votacaoComDado/${voto}`, { uid });
    console.log("Voto com dado depositado:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("erro: ", err.response?.data || err.message);
    throw err;
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
