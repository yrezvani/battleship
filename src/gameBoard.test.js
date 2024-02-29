const createGameboard = require('./gameBoard');

describe('Gameboard', () => {
    let gameboard;

    beforeEach(() => {

        gameboard = createGameboard();
    });

    it('places a horizontal ship correctly and checks cells', () => {
        gameboard.placeShip(0, 0, 3, 'horizontal');
        expect(gameboard.getCell(0, 0)).not.toBeNull();
        expect(gameboard.getCell(1, 0)).not.toBeNull();
        expect(gameboard.getCell(2, 0)).not.toBeNull();

        expect(gameboard.getCell(3, 0)).toBeNull();
    });

    it('places a vertical ship correctly and checks cells', () => {
        gameboard.placeShip(0, 0, 4, 'vertical');
        expect(gameboard.getCell(0, 0)).not.toBeNull();
        expect(gameboard.getCell(0, 1)).not.toBeNull();
        expect(gameboard.getCell(0, 2)).not.toBeNull();
        expect(gameboard.getCell(0, 3)).not.toBeNull();

        expect(gameboard.getCell(0, 4)).toBeNull();
    });

    it('prevents placement outside of the board', () => {
        expect(gameboard.placeShip(8, 8, 4, 'horizontal')).toBe(false);
    });

    it('prevents overlap of ships', () => {
        gameboard.placeShip(0, 0, 3, 'horizontal');
        expect(gameboard.placeShip(0, 0, 3, 'vertical')).toBe(false);

        expect(gameboard.getCell(0, 0)).not.toBeNull();
        expect(gameboard.getCell(1, 0)).not.toBeNull();
        expect(gameboard.getCell(2, 0)).not.toBeNull();
    });

    it('allows ships to be attacked', () => {
        gameboard.placeShip(0, 0, 3, 'horizontal');
        expect(gameboard.receiveAttack(0, 0)).toBe(true);
    });

    it('correctly records a hit on a ship', () => {
        gameboard.placeShip(0, 0, 3, 'horizontal');
        const hit = gameboard.receiveAttack(0, 0);
        expect(hit).toBe(true);
        const ship = gameboard.getCell(0, 0);
        expect(ship.hits).toBe(1); 
    });

    it('records misses when attacking empty cells', () => {
        const miss = gameboard.receiveAttack(9, 9);
        expect(miss).toBe(false);
        const missedShots = gameboard.getMissedShots();
        expect(missedShots).toContainEqual({x: 9, y: 9});
    })

    it('checks if all ships have been sunk', () => {
        gameboard.placeShip(0, 0, 3, 'horizontal');
        gameboard.placeShip(4, 4, 3, 'vertical');
    
        gameboard.receiveAttack(0, 0);
        gameboard.receiveAttack(1, 0);
        gameboard.receiveAttack(2, 0);
    
        expect(gameboard.allSunk()).toBe(false);
    
        gameboard.receiveAttack(4, 4);
        gameboard.receiveAttack(4, 5);
        gameboard.receiveAttack(4, 6);
    
        expect(gameboard.allSunk()).toBe(true);
    });
});