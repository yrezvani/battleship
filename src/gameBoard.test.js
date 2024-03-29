const createGameboard = require('./gameBoard');

describe('Gameboard', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = createGameboard();
    });

    it('places a ship Horizontally', () => {
        gameboard.placeShip(0, 0, 3, 'Horizontal');
        expect(gameboard.getCell(0, 0)).not.toBeNull();
        expect(gameboard.getCell(1, 0)).not.toBeNull();
        expect(gameboard.getCell(2, 0)).not.toBeNull();
        expect(gameboard.getCell(3, 0)).toBeNull();
    });

    it('places a ship Vertically', () => {
        gameboard.placeShip(0, 0, 4, 'Vertical');
        expect(gameboard.getCell(0, 0)).not.toBeNull();
        expect(gameboard.getCell(0, 1)).not.toBeNull();
        expect(gameboard.getCell(0, 2)).not.toBeNull();
        expect(gameboard.getCell(0, 3)).not.toBeNull();
        expect(gameboard.getCell(0, 4)).toBeNull();
    });

    it('prevents overlap of ships', () => {
        gameboard.placeShip(0, 0, 3, 'Horizontal');
        expect(gameboard.placeShip(0, 0, 3, 'Vertical')).toBe(false);

        expect(gameboard.getCell(0, 0)).not.toBeNull();
        expect(gameboard.getCell(1, 0)).not.toBeNull();
        expect(gameboard.getCell(2, 0)).not.toBeNull();
    });

    it('records a missed shot', () => {
        gameboard.receiveAttack(0, 0);
        expect(gameboard.getMissedShots()).toContainEqual({ x: 0, y: 0 });
    });

    it('records a hit on a ship', () => {
        gameboard.placeShip(0, 0, 3, 'Horizontal');
        gameboard.receiveAttack(0, 0);
        expect(gameboard.getSuccessfulHits()).toContainEqual({ x: 0, y: 0 });
    });

    it('checks if all ships are sunk', () => {
        gameboard.placeShip(0, 0, 3, 'Horizontal');
        gameboard.placeShip(4, 4, 3, 'Vertical');
        gameboard.receiveAttack(0, 0);
        gameboard.receiveAttack(1, 0);
        gameboard.receiveAttack(2, 0);
        gameboard.receiveAttack(4, 4);
        gameboard.receiveAttack(4, 5);
        gameboard.receiveAttack(4, 6);

        // Log the status of ships to see if they are correctly marked as hit
        console.log('Ship 1 Hits:', gameboard.getShips()[0].hits);
        console.log('Ship 2 Hits:', gameboard.getShips()[1].hits);

        // Log the result of allSunk to see what it returns before the assertion
        console.log('All ships sunk:', gameboard.allSunk());

        expect(gameboard.allSunk()).toBe(true);
    });

    it('rejects illegal moves', () => {
        gameboard.receiveAttack(0, 0);
        expect(gameboard.receiveAttack(0, 0)).toBe(false);
    });
});
