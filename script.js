// script.js
import { getSelecaoPaises } from "./script/selecaoPaises.js";
import { getData } from "./service/service.js";

// Defina o endpoint correto para os dados dos países
const ENDPOINT_PAISES = "./api/v1/paises.json";

// Chama a função getData e passa o endpoint dos países
getData(ENDPOINT_PAISES)
  .then((paises) => {
    // Chama a função para adicionar as imagens ao carrossel
    adicionarImagensAoCarrossel(paises);
  })
  .catch((error) => {
    // Caso ocorra algum erro, exibe no console
    console.error("Erro ao carregar imagens dos países:", error);
  });

async function adicionarImagensAoCarrossel(paises) {
  const scrollerInner = document.querySelector(".scroller__inner");

  const selecaoPaises = getSelecaoPaises();

  // Com os objetos paises e selecaoPaises, podemos filtrar para um novo objetos os paises que estão na selecaoPaises
  const paisesParticipantes = Object.values(paises).filter((nomeDoPais) =>
    selecaoPaises.includes(nomeDoPais.pais)
  );

  // Itera sobre cada país no objeto de dados
  paisesParticipantes.forEach((pais) => {
    // Cria um novo elemento de imagem
    const img = document.createElement("img");
    img.width = 150;
    img.height = 100;
    // Define o atributo 'src' com a URL da imagem
    img.src = pais.img;
    // Define o atributo 'alt' com o nome do país
    img.alt = pais.pais;
    // Adiciona a imagem ao elemento 'scroller__inner'
    scrollerInner.appendChild(img);
  });
}
