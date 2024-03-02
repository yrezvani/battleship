const player = require('./player');

describe('player', () => {
    let testPlayer;

    beforeEach(() => {

        testPlayer = player();
    });

    it('returns unique coordinates within range', () => {
        const coordinatesSet = new Set();
        const attempts = 100;

        for (let i = 0; i < attempts; i++) {
            const coords = testPlayer.generateRandCoordinates();
            const coordsStr = `${coords.x},${coords.y}`;
            expect(coords.x).toBeGreaterThanOrEqual(0)
            expect(coords.x).toBeLessThanOrEqual(10)
            expect(coords.y).toBeGreaterThanOrEqual(0)
            expect(coords.y).toBeLessThanOrEqual(10)
    
            expect(coordinatesSet.has(coordsStr)).toBeFalsy();
            coordinatesSet.add(coordsStr);
        }

    })

});

