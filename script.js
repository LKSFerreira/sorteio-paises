import { getSelecaoPaises } from "./script/selecaoPaises.js";
import { getData } from "./service/service.js";

const ENDPOINT_PAISES = "./api/v1/paises.json";

getData(ENDPOINT_PAISES)
  .then((paises) => {
    adicionarImagensAoCarrossel(paises);
  })
  .catch((error) => {
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
    const img = document.createElement("img");
    img.width = 150;
    img.height = 100;
    img.src = pais.img;
    img.alt = pais.pais;
    scrollerInner.appendChild(img);
  });
}
