// A partir disso, a seguinte operação é feita:
// O país à frente da fila se apresenta, e o país imediatamente após ele é movido para a fila do próximo ciclo de apresentações
// Quando a lista tiver menos de 20 países, não será mais feita a remoção e eles se apresentam em ordem reversa

// Baseado nessa organização, desenvolva um algoritmo que crie uma lista descrevendo qual a ordem de apresentação dos países nos 4 ciclos.

// Exemplo:

// 1 - O país à frente da fila se apresenta,
// 2 - o país imediatamente após ele é movido para a fila do próximo ciclo.
// 3 - Quando a lista tiver menos de 20 países, não será mais feita a remoção e eles se apresentam em ordem reversa

// Exemplo:
// Os primeiros países da lista são os países da África paises = ["África do Sul", "Angola", "Argélia", "Benim", "Botsuana", ...)
// 1 - A "África do Sul" será o primeiro país da fila a se apresentar no primeiro ciclo de apresentações. ciclo_1 = ["África do Sul"]
// 2 - Após ela, a "Angola" será movida para a lista de apresentações do segundo ciclo. ciclo_2 = ["Angola"]
// 3 - O segundo país a se apresentar no primeiro ciclo, portanto, será a "Argélia". ciclo_1 = ["África do Sul", "Argélia"]
// 4 - Após ela, "Benim" será movido para a lista do segundo ciclo. ciclo_2 = ["Angola", "Benim"]
// 5 - E assim sucessivamente até o último país da Oceania se apresentar no primeiro ciclo.
// 6 - Só então o segundo ciclo começa, seguindo a mesma operação.

import { getSelecaoPaises } from "./selecaoPaises.js";

// Devido ao js trabalhar com referências, é necessário clonar o array para não alterar o original
const paisesParticipantes = [...getSelecaoPaises()];

// calcula a ordem de apresentação dos países nos 4 ciclos de apresentações
async function getShowGroups(paisesParticipantes) {
  const ciclos = [[], [], [], []];
  let cicloAtual = 0;

  while (paisesParticipantes.length > 20) {
    // Remove o país da frente da fila e o adiciona ao ciclo atual
    const paisAtual = paisesParticipantes.shift();
    ciclos[cicloAtual].push(paisAtual);

    // Remove o próximo país da fila e o adiciona ao próximo ciclo
    const proximoPais = paisesParticipantes.shift();
    ciclos[(cicloAtual + 1) % 4].push(proximoPais);

    // Se a lista tiver menos de 20 países, não será mais feita a remoção e eles se apresentam em ordem reversa
    if (paisesParticipantes.length <= 20) {
      const paisesRestantes = paisesParticipantes.reverse();
      ciclos[cicloAtual].push(...paisesParticipantes.reverse());
    }

    // Atualiza o ciclo atual
    cicloAtual = (cicloAtual + 1) % 4;
  }

  return ciclos;
}

// Chamamos a função e armazenamos o resultado
 export const ordemDeApresentacao = getShowGroups(paisesParticipantes);
  

// Exibimos a ordem de apresentação dos países nos 4 ciclos
// console.log("Ordem de apresentação dos países nos 4 ciclos:");
// ordemDeApresentacao.forEach((ciclo, index) => {
//   console.log(`Ciclo ${index + 1}:`, ciclo);
// });
