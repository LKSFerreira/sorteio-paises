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
        <a href="#" title="Fechar" class="modal-close">[ X ]</a>
        <div id="bandeiras-container"></div>
      </div>
    `;
    document.body.appendChild(modal);

    const containerBandeiras = modal.querySelector("#bandeiras-container");
    carregarBandeirasNoModal(index, containerBandeiras);
  });
});

async function carregarBandeirasNoModal(index, containerBandeiras) {
  const grupos = await ordemDeApresentacao;
  const grupo = grupos[index];

  for (let i = 0; i < grupo.length; i++) {
    const pais = grupo[i];

    const bandeirasAnimadas = Object.values(paisesJson).filter((nomeDoPais) =>
      pais.includes(nomeDoPais.pais)
    );

    const img = document.createElement("img");

    img.src = bandeirasAnimadas[0].img;
    img.classList.add("bandeira");
    img.style.animation = `bandeira-animacao 1s ease-in-out ${i * 0.2}s backwards`;

    containerBandeiras.appendChild(img);
  }

}
