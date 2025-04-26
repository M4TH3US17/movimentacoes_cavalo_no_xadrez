
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(pergunta) {
    return new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}

function possivel(x1, y1, x2, y2) {
    tabuleiro([x1, y1], [x2, y2]);
};

function pmov(x, y) {
    const posicao_atual = [2, 2]; // (x2, y2)

    //const ehPrimeiraJogada =

    if (x !== 0 && y !== 0) {
        possivel(x, y, posicao_atual[0], posicao_atual[1]);
    } else {
        possivel(x, y, posicao_atual[0], posicao_atual[1]);
    }
};

function tabuleiro(posicao_atual, proxima_posicao) {
    console.log("\n-------------- POSIÇÃO DO CAVALO NO TABULEIRO --------------\n");
    console.log(`> Posição Atual: (${posicao_atual[0]}, ${posicao_atual[1]})`);
    console.log(`> Próxima Posição: (${proxima_posicao[0]}, ${proxima_posicao[1]})\n`);

    for (let linha = 0; linha < 8; linha++) {
        let rows = `y${linha + 1} `; // Adiciona rótulo Y

        for (let coluna = 0; coluna < 8; coluna++) {
            rows += exibir_possibilidade(posicao_atual, coluna, linha);
        }

        console.log(rows);
    }

    console.log("   x1 x2 x3 x4 x5 x6 x7 x8\n");
}

function exibir_possibilidade(posicao_atual, coluna, linha) {
    const xCavalo = Number(posicao_atual[1]) - 1; // Convertendo para índice 0-7
    const yCavalo = Number(posicao_atual[0]) - 1;

    const xAtual = linha; // Já está em 0-7 (do loop)
    const yAtual = coluna;

    // Verifica se é a posição atual do cavalo
    if (xCavalo === xAtual && yCavalo === yAtual) {
        return "♞  ";
    }

    // Calcula a diferença absoluta
    const diffX = Math.abs(xAtual - xCavalo);
    const diffY = Math.abs(yAtual - yCavalo);

    // Verifica movimento em L (2-1 ou 1-2)
    const ehMovimentoValido = (diffX === 2 && diffY === 1) || (diffX === 1 && diffY === 2);

    return ehMovimentoValido ? "⏹︎  " : "-- "; // ◉ para movimentos válidos
};

async function jogo() {
    let continuar_jogando = 0;
    let jogadaAtual = 0;

    while (continuar_jogando === 0) {
        if (jogadaAtual === 0)
            pmov(2, 1);

        jogadaAtual += 1;

        const resposta = await perguntar('Deseja continuar jogando? (0 = Sim, 1 = Não): ');
        continuar_jogando = parseInt(resposta);

        if (continuar_jogando === 0) {
            const eixoX = await perguntar('Eixo X: ');
            const eixoY = await perguntar('Eixo Y: ');
            pmov(eixoX, eixoY); // Próxima jogada
        } else {
            rl.close();
            console.log("\n####################### FIM DE JOGO #######################\n")
        }
    }
}

jogo();