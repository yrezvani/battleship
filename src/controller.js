const createGameboard = require('./gameBoard');
const player = require('./player');

// const createGrid = function (side) {
//     const grid = document.querySelector(`.${side}`);

//     for (let i = 0; i < 10; i++) {
//         const row = document.createElement('div');
//         row.classList.add('row');

//         for (let j = 0; j < 10; j++) {
//             const cell = document.createElement('div');
//             cell.classList.add('cell');
//             row.append(cell);
//         }

//         grid.append(row);
//     }
// };

// createGrid('left-grid');
// createGrid('right-grid');

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
