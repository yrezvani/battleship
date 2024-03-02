const createGameboard = require('./gameBoard');
const player = require('./player');

const controller = function () {
    const playerGameboard = createGameboard();
    const aiGameboard = createGameboard();

    const huPlayer = player();
    const aiPlayer = player();
    let playerTurn = true;

    const playerAttack = function (x, y) {
        const coordStr = `${x.toString()},${y.toString()}`;
        if (!playerGameboard.prevMoves.includes(coordStr)) {
            playerGameboard.prevMoves.push(coordStr);
            aiGameboard.receiveAttack(x, y);
            if (checkWin(huPlayer)) {
                console.log('Player wins');
            } else playerTurn = !playerTurn;
        } else {
            console.log('Illegal move! Try again.');
        }
    };

    const aiAttack = function (x, y) {
        const attCoord = aiPlayer.generateRandCoordinates();
        playerGameboard.receiveAttack(attCoord.x, attCoord.y);

        if (checkWin(aiPlayer)) {
            console.log('AI Wins!');
        } else playerTurn = !playerTurn;
    };

    const checkWin = function (player) {
        if (player === huPlayer) {
            return aiGameboard.allSunk();
        } else {
            return playerGameboard.allSunk();
        }
    };

    return {
        playerGameboard,
        aiGameboard,
        huPlayer,
        aiPlayer,
        playerTurn,
        playerAttack,
        aiAttack,
        checkWin,
    };
};

module.exports = controller;
