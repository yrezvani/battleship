const createShip = require('./ship');

const createGameboard = function () {
    let board = Array(10)
        .fill(null)
        .map(() => Array(10).fill(null));
    let ships = [];
    let missedShots = [];
    let successfulHits = [];
    let prevMoves = [];

    const placeShip = function (x, y, length, orientation) {
        if (!isValidPlacement(x, y, length, orientation)) {
            console.log('Invalid placement');
            return false;
        }

        const newShip = createShip(length, orientation, x, y);
        ships.push(newShip);

        for (let i = 0; i < length; i++) {
            let segmentInfo = { ship: newShip, segmentIndex: i };
            if (orientation === 'Horizontal') {
                board[y][x + i] = segmentInfo;
            } else {
                board[y + i][x] = segmentInfo;
            }
        }
        console.log(`Placed ship at (${x}, ${y}) with length ${length} and orientation ${orientation}.`);
        return true;
    };

    const isValidPlacement = function (x, y, length, orientation) {
        if (!orientation === 'Horizontal' && !orientation === 'Vertical') {
            console.log('Invalid orientation');
            return false;
        }
        // Loop through each segment of the new ship to check for valid placement
        for (let i = 0; i < length; i++) {
            let newX = orientation === 'Horizontal' ? x + i : x;
            let newY = orientation === 'Vertical' ? y + i : y;

            // Boundary check: Ensure the ship doesn't go beyond the game board
            if (newX > 9 || newY > 9) {
                console.log(`Invalid placement: Ship exceeds boundaries at (${newX}, ${newY})`);
                return false;
            }

            // Overlap check: Ensure the ship doesn't overlap with existing ships
            for (const ship of ships) {
                let { startX, startY, orientation: shipOrientation } = ship.coordinates;

                // Check each segment of the existing ships
                for (let j = 0; j < ship.length; j++) {
                    let shipX = shipOrientation === 'Horizontal' ? startX + j : startX;
                    let shipY = shipOrientation === 'Vertical' ? startY + j : startY;

                    if (newX === shipX && newY === shipY) {
                        console.log(`Overlap detected with ship at (${startX}, ${startY})`);
                        return false;
                    }
                }
            }
        }

        // If no boundary issues or overlaps were detected, the placement is valid
        return true;
    };

    const getCell = function (x, y) {
        return board[y][x];
    };

    const receiveAttack = function (x, y) {
        let hitMade = false;

        ships.forEach((ship) => {
            let { startX, startY, orientation } = ship.coordinates;

            for (let i = 0; i < ship.length; i++) {
                let shipX = orientation === 'Horizontal' ? startX + i : startX;
                let shipY = orientation === 'Vertical' ? startY + i : startY;

                if (x === shipX && y === shipY) {
                    ship.hit(i);
                    successfulHits.push({ x: x, y: y });
                    console.log('Hit detected at:', x, y);
                    hitMade = true;
                    break;
                }
            }
        });

        if (!hitMade) {
            missedShots.push({ x: x, y: y });
            console.log('Missed shot at:', x, y);
            return false;
        }

        return hitMade;
    };

    const getMissedShots = function () {
        return missedShots;
    };

    const getSuccessfulHits = function () {
        return successfulHits;
    };

    const getShips = function () {
        return ships;
    };

    const allSunk = function () {
        for (const ship of ships) {
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    };

    return {
        placeShip,
        getCell,
        receiveAttack,
        getMissedShots,
        getSuccessfulHits,
        allSunk,
        getShips,
    };
};

module.exports = createGameboard;
