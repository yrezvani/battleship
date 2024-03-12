const controller = require('./controller');

describe('controller', () => {
    it('initiates ai and player gameboards', () => {
        const gameController = controller();

        expect(gameController.aiGameboard).toBeTruthy();
        expect(gameController.playerGameboard).toBeTruthy();
    });

    it('resets aiGameboard and playerGameBoard', () => {
        const gameController = controller();
        gameController.resetGame();

        expect(gameController.aiGameboard).toBeTruthy();
        expect(gameController.playerGameboard).toBeTruthy();
    });
});
