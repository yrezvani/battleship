const controller = require('./controller');

jest.mock('./gameBoard', () => {
    return jest.fn().mockImplementation(() => {
        return {
            prevMoves: [],
            receiveAttack: jest.fn().mockImplementation((x, y) => {
                return true;
            }),
            allSunk: jest.fn().mockImplementation(false),
        };
    });
});

jest.mock('./player', () => {
    return jest.fn().mockImplementation(() => {
        return {
            generateRandCoordinates: jest.fn(),
            prevMoves: [],
        };
    });
});

describe('controller', () => {
    let testController;

    beforeEach(() => {
        jest.clearAllMocks();
        testController = controller();
    });

    it('Makes a hit and toggles turn', () => {
        testController.playerAttack(0, 0);

        expect(testController.aiGameboard.receiveAttack).toHaveBeenCalledWith(0, 0);

        expect(testController.playerTurn).toBe(true);
    });

    it('returns true when all AI ships are sunk', () => {
        testController.aiGameboard.allSunk.mockReturnValue(true);

        const result = testController.checkWin(testController.huPlayer);

        expect(result).toBe(true);
    });
});
