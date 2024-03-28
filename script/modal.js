import { getData } from "../service/service.js";
import { ordemDeApresentacao } from "./sorteioPaises.js";

const ENDPOINT_PAISES = "./api/v1/paises.json";

let paisesJson = [];

getData(ENDPOINT_PAISES)
  .then((paises) => {
    paisesJson = paises;
  })
  .catch((error) => {
    console.error("Erro ao carregar imagens dos países:", error);
  });

const ancorButton = document.querySelectorAll(".ancor-button");

ancorButton.forEach((elemento, index) => {
  elemento.addEventListener("click", () => {
    const modal = document.createElement("div");
    modal.id = `open-modal${index}`;
    modal.classList.add("modal-window");
    modal.innerHTML = `
      <div>
        <a href="#" title="Close" class="modal-close">Fechar</a>
        <div id="bandeiras-container"></div>
      </div>
    `;
    document.body.appendChild(modal);

    const containerBandeiras = modal.querySelector("#bandeiras-container");
    animacaoBandeiras(index, containerBandeiras);
  });
});

async function animacaoBandeiras(index, containerBandeiras) {
  const grupos = await ordemDeApresentacao;

  const grupo = grupos[index];

  for (let i = 0; i < grupo.length; i++) {
    const pais = grupo[i];

    console.log(`País ${i + 1}:`, pais);

    const bandeirasAnimadas = Object.values(paisesJson).filter((nomeDoPais) =>
      pais.includes(nomeDoPais.pais)
    );

    // grupoContainer.classList.add("grupo-bandeiras");
    // grupoContainer.style.top = `${i  * 100}px`; // Ajuste conforme necessário

    const img = document.createElement("img");
    img.src = bandeirasAnimadas[0].img;

    img.classList.add("bandeira");
    img.style.animationDelay = `${i * 0.5}s`; // Ajuste o delay conforme necessário
    containerBandeiras.appendChild(img);

    containerBandeiras.appendChild(img);
  }
}
