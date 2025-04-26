
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/*
  (x1, y1) - Posição atual
  (x2, y2) - Posição que preciso verificar
*/

function possivel(x1, y1, x2, y2) {
    // const posicao_atual = ;
    // const proxima_posicao = ;

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
    console.log("\n-------------- POSIÇÃO DO CAVALO NO TABULEIRO (EXERCICIO) --------------\n")

    console.log(`> Posição Atual: (${posicao_atual[0]}, ${posicao_atual[1]})`)
    console.log(`> Próxima Posição: (${proxima_posicao[0]}, ${proxima_posicao[1]})\n`)

    for (let linha = 0; linha < 8; linha++) {
        let rows = ""

        if ((linha % 8 !== 0) || (linha % 8 === 0))
            rows += ` y${linha + 1} `

        for (let coluna = 0; coluna < 8; coluna++) {
            let x2 = `x${Number(posicao_atual[1])}`; 
            let x1 = `x${linha + 1}`;
            
            let y1 = `y${coluna + 1}`;
            let y2 = `y${Number(posicao_atual[0])}`;

            ehParaExibirCavalo = ((x2 === x1) && (y2 === y1))

            // console.log(`ENTRADA: (${x2}, ${y2}), FOR: (${x1}, ${y1}), BOOLEAN: ${ehParaExibirCavalo}`)

            rows += `${ehParaExibirCavalo ? "♞  " : "-- "}`
        };

        console.log(rows)

        let ehUltimaLinha = ((linha + 1) === 8)
        if (ehUltimaLinha)
            console.log("    x1 x2 x3 x4 x5 x6 x7 x8\n")
    };

};

let continuar_jogando = 0;
let jogadaAtual = 0;

function perguntar(pergunta) {
    return new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}

async function jogo() {
    while (continuar_jogando === 0) {
        if (jogadaAtual === 0) 
            pmov(1, 1);

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