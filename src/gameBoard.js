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

        const newShip = createShip(length, orientation);
        ships.push(newShip);

        for (let i = 0; i < length; i++) {
            let segmentInfo = { ship: newShip, segmentIndex: i };
            if (orientation === 'horizontal') {
                board[y][x + i] = segmentInfo;
            } else {
                board[y + i][x] = segmentInfo;
            }
        }
        console.log(`Placed ship at (${x}, ${y}) with length ${length} and orientation ${orientation}.`);
    };

    const isValidPlacement = function (x, y, length, orientation) {
        for (let i = 0; i < length; i++) {
            if (orientation === 'horizontal') {
                if (x + i >= board[0].length || board[y][x + i]) return false;
            } else {
                if (y + i >= board.length || board[y + i][x]) return false;
            }
        }
        return true;
    };

    const getCell = function (x, y) {
        return board[y][x];
    };

    const receiveAttack = function (x, y) {
        const target = board[y][x];

        const coordStr = `${x.toString()},${y.toString()}`;
        if (prevMoves.includes(coordStr)) {
            return 'Illegal Move';
        }

        prevMoves.push(coordStr);

        if (target !== null) {
            console.log('Hit detected at:', x, y);
            target.ship.hit(target.segmentIndex);
            successfulHits.push({ x, y });
            return { result: 'hit', shipHit: target, position: { x, y } };
        } else {
            missedShots.push({ x, y });
            console.log('Missed shot at:', x, y);
            return { result: 'miss', position: { x, y } };
        }
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
