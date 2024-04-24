import { getSelecaoPaises } from "./selecaoPaises.js";
import { getData } from "../service/service.js";

const ENDPOINT_PAISES = "./api/v1/paises.json";

// Chama a função getData e passa o endpoint dos países
getData(ENDPOINT_PAISES)
  .then((paises) => {
    // Chama a função para adicionar as imagens ao carrossel e verificar países faltantes
    testPaises(paises);
  });

export async function testPaises(paises) {
  const selecaoPaises = getSelecaoPaises();

  // Filtra os países participantes
  const paisesParticipantes = Object.values(paises).filter((objetoPais) =>
    selecaoPaises.includes(objetoPais.pais)
  );

  // Encontra os países que estão faltando
  const paisesFaltantes = selecaoPaises.filter((paisSelecao) =>
    !paisesParticipantes.some((paisParticipante) => paisParticipante.pais === paisSelecao)
  );

  console.log('Paises participantes:', paisesParticipantes.map(pais => pais.pais));
  console.log('Paises faltantes:', paisesFaltantes);

}
