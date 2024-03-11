const createGameboard = require('./gameBoard');
const player = require('./player');

const controller = function () {
    let playerGameboard = createGameboard();
    let aiGameboard = createGameboard();

    function resetGame() {
        playerGameboard = createGameboard();
        aiGameboard = createGameboard();
    }

    return {
        playerGameboard,
        aiGameboard,
        resetGame,
    };
};

module.exports = controller;
