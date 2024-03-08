const controller = require('./controller');

document.addEventListener('DOMContentLoaded', () => {
    const createGrid = function (side) {
        const grid = document.querySelector(`.${side}`);
        grid.innerHTML = '';

        for (let y = 0; y < 10; y++) {
            const row = document.createElement('div');
            row.classList.add('row');

            for (let x = 0; x < 10; x++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.x = x;
                cell.dataset.y = y;
                row.append(cell);
            }

            grid.append(row);
        }
    };

    // Ship sizes to place
    let shipsToPlace = [4, 4, 3, 3, 2];
    // Current orientation of the ship to be placed
    let currentOrientation = 'Horizontal';

    const gameControl = controller();

    createGrid('friendly');
    createGrid('enemy');
    finalizeShipPlacementUI();

    document.querySelector('.orientation-btn').addEventListener('click', function (e) {
        currentOrientation = currentOrientation === 'Horizontal' ? 'Vertical' : 'Horizontal';
        const orientationEl = e.target.nextElementSibling;

        orientationEl.textContent = currentOrientation;
    });

    document.querySelector('.grid.friendly').addEventListener('click', (e) => {
        if (!e.target.classList.contains('cell')) return;
        const cell = e.target;

        const startX = parseInt(cell.dataset.x, 10);
        const startY = parseInt(cell.dataset.y, 10);

        const orientation = currentOrientation;

        const shipLength = shipsToPlace[0];
        const shipCoordinates = calculateShipCoordinates(startX, startY, shipLength, orientation);

        const placementSuccess = gameControl.playerGameboard.placeShip(startX, startY, shipLength, orientation);

        if (placementSuccess === false) {
            alert('Invalid placement! Try again!');
            return;
        } else {
            shipsToPlace.shift();
            finalizeShipPlacementUI();
            shipCoordinates.forEach((coords) => {
                const shipCell = document.querySelector(
                    `.grid.friendly .cell[data-x="${coords.x}"][data-y="${coords.y}"]`
                );
                if (shipCell) {
                    shipCell.classList.add('occupied');
                }
            });
        }
    });

    const calculateShipCoordinates = function (startX, startY, length, orientation) {
        const shipCoordinates = [];

        if (orientation === 'Horizontal') {
            for (let i = 0; i < length; i++) {
                shipCoordinates.push({ x: startX + i, y: startY });
            }
        } else {
            for (let i = 0; i < length; i++) {
                shipCoordinates.push({ x: startX, y: startY + i });
            }
        }

        return shipCoordinates;
    };

    function finalizeShipPlacementUI() {
        const shipLengthDisplay = document.getElementById('ship-length');
        const orientationEl = document.getElementById('orientation');
        const orientationBtn = document.querySelector('.orientation-btn');
        const textContainerEl = document.querySelector('.text-container');
        if (shipsToPlace.length > 0) {
            const nextShipLength = shipsToPlace[0];
            shipLengthDisplay.textContent = `Click to place a ship (length: ${nextShipLength})`;
        } else {
            shipLengthDisplay.style.display = 'none';
            orientationEl.style.display = 'none';
            orientationBtn.style.display = 'none';
            const boardEl = document.createElement('h2');
            boardEl.textContent = 'Your Waters';
            boardEl.classList.add('side');
            textContainerEl.append(boardEl);
        }
    }
});
