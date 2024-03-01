const createShip = require('./battleship')

const createGameboard = function () {
    let board = Array(10).fill(null).map(() => Array(10).fill(null));
    let ships = [];
    let missedShots = [];
    let successfulHits = [];
    let prevMoves = [];

    const placeShip = function (x, y, length, orientation) {
        if (!isValidPlacement(x, y, length, orientation)) {
            console.log('Invalid placement');
            return false;
        }

        const newShip = createShip(length, 0);
        ships.push(newShip);

        for (let i = 0; i < length; i++) {
            if (orientation === 'horizontal') {
                board[y][x + i] = newShip;
            } else {
                board[y + i][x] = newShip;
            }
        }
    }

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
        
        if (target === null) {
            missedShots.push({x, y});
            console.log('Missed shot at:', x, y);
            return false;
        } else {
            console.log('Hit detected at:', x, y);
            target.hit();
            successfulHits.push({x, y});
            return true;
        }
    }

    const getMissedShots = function () {
        return missedShots;
    };

    const getSuccessfulHits = function () {
        return successfulHits;
    }

    const allSunk = function () {
        for (const ship of ships) {
            if (!ship.isSunk()) {
                return false
            }
        }
        return true;
    }

    return {
        placeShip,
        getCell,
        receiveAttack,
        getMissedShots,
        getSuccessfulHits,
        allSunk
    }
}

module.exports = createGameboard