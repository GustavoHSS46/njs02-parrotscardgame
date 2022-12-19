let jogadas = 0;
let Ganhou = 0;


let Quantidade = prompt("Escolha A Quantidade Cartas de 4 a 12");

if (Quantidade % 2 == 0 && Quantidade >= 4 && Quantidade <= 12) {
  console.log("Tudo Certo");
} else {
  alert('Por Favor Entre Com Um Numero PAR De 4 A 12')
  location.reload();
}


document.querySelector(
  ".quantas-cartas"
).innerText = `VOCÊ ESTA JOGANDO COM ${Quantidade} CARTAS.`;

let imagesCards = [
  "./lib/imgs/bobrossparrot.gif",
  "./lib/imgs/explodyparrot.gif",
  "./lib/imgs/fiestaparrot.gif",
  "./lib/imgs/metalparrot.gif",
  "./lib/imgs/revertitparrot.gif",
  "./lib/imgs/tripletsparrot.gif",
  "./lib/imgs/unicornparrot.gif",
  "./lib/imgs/bobrossparrot.gif",
  "./lib/imgs/explodyparrot.gif",
  "./lib/imgs/fiestaparrot.gif",
  "./lib/imgs/metalparrot.gif",
  "./lib/imgs/revertitparrot.gif",
  "./lib/imgs/tripletsparrot.gif",
  "./lib/imgs/unicornparrot.gif",
];

Cartas();

function Game() {
  if (Ganhou == Quantidade / 2) {

    const decisao = prompt(`MEUS PARABENS VOCE GANHOU! TOTAL DE JOGADAS (CARTAS) : ${jogadas}
                    
        DESEJA JOGAR NOVAMENTE? SIM // NÃO`);

    if (decisao == "sim" || decisao == "SIM") {
      alert(`COMEÇANDO UM NOVO JOGO`);
      location.reload();
    }
  }
}

function check() {
  const Sorteio = imagesCards;
  Sorteio.sort(() => Math.random() - 0.5);
}

function Cartas() {
  const cartinha = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];

  for (let y = 0; y < Quantidade; y++) {
    let p = Math.trunc(Math.random() * Quantidade);
    let aux = cartinha[p];
    cartinha[p] = cartinha[y];
    cartinha[y] = aux;
  }

  for (let y = 0; y < Quantidade; y++) {
    if (cartinha[y] === cartinha[y + 1]) {
      let aux = cartinha[y + 1];
      cartinha[y] = cartinha[0];
      cartinha[0] = aux;
    }
  }
  for (let i = 0; i < Quantidade; i++) {
    document.querySelector(".content").innerHTML += `
        <div class="card" data-card="${imagesCards[cartinha[i]]}">
            
              <img class="front" src="./lib/imgs/front.png" width="100px" height="110px">      
           
            
              <img class="back" src="${
                imagesCards[cartinha[i]]
              }" width="100px" height="120px">          
            
        </div>`;
  }
}

function Igualdade() {
  let Certo = carta1.dataset.card === carta2.dataset.card;

  if (!Certo) {
    Desvira();
  } else {
    reseta(Certo);
    Ganhou += 1;
    setTimeout(Game, 1500);
  }
}

const cards = document.querySelectorAll(".card");
let carta1, carta2, cartinha, cartinha02;
let travaZap = false;

function vira() {
  if (travaZap) return false;
  this.classList.add("flip");

  jogadas += 1;

  if (!carta1) {
    carta1 = this;
    cartinha = carta1;
    cartinha = carta1.querySelector(".back");
    cartinha.classList.add("show");
    return false;
  }

  carta2 = this;
  cartinha02 = carta2;

  cartinha02 = cartinha02.querySelector(".back");
  cartinha02.classList.add("show");
  Igualdade();
}

function Desvira() {
  travaZap = true;
  setTimeout(() => {
    carta1.classList.remove("flip");
    carta2.classList.remove("flip");
    cartinha.classList.remove("show");
    cartinha02.classList.remove("show");
    reseta();
  }, 1500);
}

function reseta(Certo = false) {
  if (Certo) {
    carta1.removeEventListener("click", vira);
    carta2.removeEventListener("click", vira);
  }

  [carta1, carta2, travaZap] = [null, null, false];
}

cards.forEach((card) => card.addEventListener("click", vira));
