const createShip = require('./battleship')

it('creates a ship object with properties for length, number of hits and whether it has been sunk', () => {
    const ship = createShip(3, 1, false);

    expect(ship.length).toEqual(3);
    expect(ship.hits).toEqual(1);
    expect(ship.isSunk).toEqual(false)
})

it('has a hit function that increases the number of hits', () => {
    const ship = createShip(4, 2, false);
    const updatedShip = ship.hit();

    expect(updatedShip.hits).toEqual(3); 
    expect(updatedShip.length).toEqual(4);
    expect(updatedShip.isSunk).toEqual(false);
})

