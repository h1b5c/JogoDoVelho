var Tabuleiro = Array(4).fill().map(() => Array(4).fill(0));

var labelJogador1 = document.getElementById("jogador1");
var labelJogador2 = document.getElementById("jogador2");

var Jogadas = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
];

var CasaRoubada = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
];

var PodeRoubar = [1, 1];

var simbolo;
var jogadorAtual = 1;

labelJogador1.textContent = "→ Jogador 1: X";
labelJogador1.style.color = "#0000ff7b";



for (var i = 0; i < 4; i++)
{
        for (var j = 0; j < 4; j++)
        {
                Tabuleiro[i][j] = document.getElementsByClassName("Casa")[i * 4 + j];
        }
}

function Limpar()
{
        for (var i = 0; i < 4; i++)
        {
                for (var j = 0; j < 4; j++)
                {
                        simbolo = Tabuleiro[i][j].getContext("2d");
                        simbolo.clearRect(0, 0, Tabuleiro[i][j].width, Tabuleiro[i][j].height);
                }
        }      
        
        Jogadas = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        ];

        CasaRoubada = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        ];

        PodeRoubar = [1, 1];

        // window.location.reload();
}

function DesenharX(quadrado)
{
        var canvas = quadrado.getContext("2d");
        
        canvas.fillStyle = "rgba(0, 0, 255, 0.5)";
        canvas.fillRect(0, 0, quadrado.width, quadrado.height);

        canvas.beginPath();
        canvas.moveTo(5, 5);
        canvas.lineTo(quadrado.width - 5, quadrado.height - 5);
        canvas.stroke();

        canvas.moveTo(quadrado.width - 5, 5);
        canvas.lineTo(5, quadrado.height - 5);
        canvas.stroke();
}

function DesenharO(quadrado)
{
        var canvas = quadrado.getContext("2d");

        canvas.fillStyle = "rgba(255, 0, 0, 0.5)";
        canvas.fillRect(0, 0, quadrado.width, quadrado.height);

        canvas.beginPath();
        canvas.arc((quadrado.width / 2), (quadrado.height/ 2), 45, 0, Math.PI * 2, false);
        canvas.stroke();
}

function DesenharNaCasa(quadrado)
{
        if (jogadorAtual === 1)
        {
                DesenharX(quadrado);
                jogadorAtual = 2;


                labelJogador1.textContent = "Jogador 1: X  ";
                labelJogador2.textContent = "→ Jogador 2: O";

                labelJogador1.style.color = "#fff";
                labelJogador2.style.color = "#ff00007b";
        }
        else
        {
                DesenharO(quadrado);
                jogadorAtual = 1;


                labelJogador1.textContent = "→ Jogador 1: X";
                labelJogador2.textContent = "  Jogador 2: O";

                labelJogador1.style.color = "#0000ff7b";
                labelJogador2.style.color = "#fff";
        }
}

function Jogar(numero)
{
        var quadrado = Tabuleiro[Math.floor(numero / 4)][numero % 4];

        if (Jogadas[Math.floor(numero / 4)][numero % 4] !== jogadorAtual)
        {
                if (Jogadas[Math.floor(numero / 4)][numero % 4] !== 0 && (PodeRoubar[jogadorAtual - 1] === 0 || CasaRoubada[Math.floor(numero / 4)][numero % 4] !== 0))
                {
                        if (CasaRoubada[Math.floor(numero / 4)][numero % 4] !== 0)
                        {
                                window.alert("A casa já foi roubada pelo jogador " + CasaRoubada[Math.floor(numero / 4)][numero % 4] + "! Você não pode roubar essa casa.");
                        }
                        else
                        {
                                window.alert("Limite de roubo atingido! Você não pode roubar mais casas.");
                        }
                }
                else
                {
                        if (Jogadas[Math.floor(numero / 4)][numero % 4] !== 0)
                        {
                                PodeRoubar[jogadorAtual - 1] = 0;
                                CasaRoubada[Math.floor(numero / 4)][numero % 4] = jogadorAtual;
                        }

                        Jogadas[Math.floor(numero / 4)][numero % 4] = jogadorAtual;
                        DesenharNaCasa(quadrado);
                }
                
        }
        else
        {
                window.alert("Essa casa já está ocupada pelo seu símbolo! Escolha outra casa.");
        }            
}