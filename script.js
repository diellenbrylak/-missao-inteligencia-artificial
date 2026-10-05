import { embaralhar, nomeAventureiro } from "./aleatorio.js";
import { perguntas } from "./perguntas.js";

const caixaPrincipal = document.querySelector(".caixa-principal");
const telaInicial = document.querySelector(".tela-inicial");
const areaJogo = document.querySelector(".area-jogo");

const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");

const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const botaoIniciar = document.querySelector(".iniciar-btn");
const botaoJogarNovamente = document.querySelector(".novamente-btn");

const contadorPergunta = document.querySelector(".contador-pergunta");
const barraProgresso = document.querySelector(".progresso");

let perguntaAtual = 0;
let historiaFinal = "";
let perguntasDaPartida = [];

botaoIniciar.addEventListener("click", iniciaJogo);

botaoJogarNovamente.addEventListener("click", jogaNovamente);


function iniciaJogo() {

    perguntaAtual = 0;
    historiaFinal = "";

    perguntasDaPartida = embaralhar(perguntas);

    telaInicial.classList.add("esconder");
    caixaResultado.classList.remove("mostrar");
    areaJogo.classList.add("mostrar");

    mostraPergunta();
}


function mostraPergunta() {

    if (perguntaAtual >= perguntasDaPartida.length) {
        mostraResultado();
        return;
    }

    const pergunta = perguntasDaPartida[perguntaAtual];

    caixaPerguntas.textContent = pergunta.enunciado;

    contadorPergunta.textContent =
        `Etapa ${perguntaAtual + 1} de ${perguntasDaPartida.length}`;

    atualizaProgresso();

    caixaAlternativas.innerHTML = "";

    mostraAlternativas(pergunta);
}


function mostraAlternativas(pergunta) {

    const alternativas = embaralhar(pergunta.alternativas);

    alternativas.forEach((alternativa) => {

        const botao = document.createElement("button");

        botao.classList.add("alternativa");

        botao.textContent = alternativa.texto;

        botao.addEventListener("click", () => {
            respostaSelecionada(alternativa);
        });

        caixaAlternativas.appendChild(botao);
    });
}


function respostaSelecionada(opcaoSelecionada) {

    const afirmacao =
        opcaoSelecionada.afirmacao[
            Math.floor(
                Math.random() * opcaoSelecionada.afirmacao.length
            )
        ];

    historiaFinal += afirmacao + " ";

    perguntaAtual++;

    mostraPergunta();
}


function atualizaProgresso() {

    const porcentagem =
        (perguntaAtual / perguntasDaPartida.length) * 100;

    barraProgresso.style.width = `${porcentagem}%`;
}


function mostraResultado() {

    areaJogo.classList.remove("mostrar");

    caixaResultado.classList.add("mostrar");

    barraProgresso.style.width = "100%";

    textoResultado.textContent =
        `${nomeAventureiro}, ${historiaFinal}`;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function jogaNovamente() {

    perguntaAtual = 0;
    historiaFinal = "";

    caixaResultado.classList.remove("mostrar");

    areaJogo.classList.add("mostrar");

    perguntasDaPartida = embaralhar(perguntas);

    mostraPergunta();
}
