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

    let gameControl = controller();

    createGrid('friendly');
    createGrid('enemy');
    updateGameUIForNextPhase();

    document.querySelector('.orientation-btn').addEventListener('click', function (e) {
        currentOrientation = currentOrientation === 'Horizontal' ? 'Vertical' : 'Horizontal';
        const orientationEl = e.target.nextElementSibling;

        orientationEl.textContent = currentOrientation;
    });

    const placeShip = function (e) {
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
            updateGameUIForNextPhase();
            shipCoordinates.forEach((coords) => {
                const shipCell = document.querySelector(
                    `.grid.friendly .cell[data-x="${coords.x}"][data-y="${coords.y}"]`
                );
                if (shipCell) {
                    addIconToCell(shipCell, 'ship');
                }
            });
        }
    };

    function addIconToCell(cell, icon) {
        const iconEl = document.createElement('i');
        if (icon === 'ship') {
            iconEl.className = `fa-solid fa-ship`;
        } else if (icon === 'hit') {
            cell.textContent = '💥';
        } else cell.textContent = '🚫';
        cell.append(iconEl);
    }

    document.querySelector('.grid.friendly').addEventListener('click', placeShip);

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

    function updateGameUIForNextPhase() {
        const shipLengthDisplay = document.getElementById('ship-length');
        const orientationEl = document.getElementById('orientation');
        const orientationBtn = document.querySelector('.orientation-btn');
        const textContainerEl = document.querySelector('.text-container');
        const feedbackEl = document.querySelector('.feedback');
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
            document.querySelector('.grid.friendly').removeEventListener('click', placeShip);
            placeAiShips();
            feedbackEl.textContent = 'Attack AI ships';
            document.querySelector('.grid.enemy').addEventListener('click', attackAi);
        }
    }

    const placeAiShips = function () {
        const aiShipsToPlace = [4, 4, 3, 3, 2];
        const orientationChoices = ['Horizontal', 'Vertical'];

        console.log(`Before loop: ${aiShipsToPlace}`);
        aiShipsToPlace.forEach((length) => {
            console.log('Starting AI ship placement.');
            console.log(`Inside loop: ${aiShipsToPlace}`);
            let placed = false;
            let attempts = 0;
            const maxAttempts = 100; // Set a reasonable limit to prevent infinite loops

            do {
                console.log(`length: ${length}`);
                const startX = Math.floor(Math.random() * 10);
                const startY = Math.floor(Math.random() * 10);
                const randomIndex = Math.floor(Math.random() * orientationChoices.length);
                const orientation = orientationChoices[randomIndex];

                placed = gameControl.aiGameboard.placeShip(startX, startY, length, orientation);
                attempts++;
                if (attempts > maxAttempts) {
                    console.log(`Failed to place AI ship of length ${length} after ${maxAttempts} attempts.`);
                    // Consider resetting the board or implementing an alternative strategy here
                    break; // Break out of the loop to avoid freezing the browser
                }
            } while (!placed);
        });
    };

    function attackAi(e) {
        const feedbackEl = document.querySelector('.feedback');

        if (!e.target.classList.contains('cell')) return;
        const cell = e.target;

        const startX = parseInt(cell.dataset.x);
        const startY = parseInt(cell.dataset.y);

        console.log(gameControl.aiGameboard.getCell(startX, startY));
        const attackCell = gameControl.aiGameboard.receiveAttack(startX, startY);
        if (attackCell) {
            addIconToCell(cell, 'hit');
        } else addIconToCell(cell, 'miss');

        if (gameControl.aiGameboard.allSunk()) {
            feedbackEl.textContent = 'You Win!';
            document.querySelector('.grid.enemy').removeEventListener('click', attackAi);
        } else attackHuman();
    }

    function attackHuman() {
        let startX, startY;
        const feedbackEl = document.querySelector('.feedback');
        const missedShots = gameControl.playerGameboard.getMissedShots();
        const successfulHits = gameControl.playerGameboard.getSuccessfulHits();
        const previousShots = missedShots.concat(successfulHits);
        let isUnique = true;

        while (true) {
            isUnique = true;
            startX = Math.floor(Math.random() * 10);
            startY = Math.floor(Math.random() * 10);

            for (const shot of previousShots) {
                if (shot.x === startX && shot.y === startY) {
                    isUnique = false;
                    break;
                }
            }

            if (isUnique) {
                const cell = document.querySelector(`.grid.friendly .cell[data-x="${startX}"][data-y="${startY}"]`);
                const attackPlayerCell = gameControl.playerGameboard.receiveAttack(startX, startY);

                if (attackPlayerCell) {
                    addIconToCell(cell, 'hit');
                } else addIconToCell(cell, 'miss');

                if (gameControl.playerGameboard.allSunk()) {
                    feedbackEl.textContent = 'You Lost!';
                    document.querySelector('.grid.enemy').removeEventListener('click', attackAi);
                }
                break;
            }
        }
    }

    document.getElementById('reset').addEventListener('click', resetGame);

    function resetGame() {
        const feedbackEl = document.querySelector('.feedback');
        shipsToPlace = [4, 4, 3, 3, 2];
        currentOrientation = 'Horizontal';
        const cells = document.querySelectorAll('.cell');

        feedbackEl.textContent = 'Place your ships';
        updateGameUIForNextPhase();
        gameControl = controller();
        gameControl.resetGame();

        cells.forEach((cell) => {
            if (cell.firstChild) {
                cell.removeChild(cell.firstChild);
                cell.className = 'cell';
            }
        });
        document.querySelector('.grid.friendly').addEventListener('click', placeShip);
    }
});
