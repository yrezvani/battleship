const createShip = require('./battleship')

it('creates a ship object with properties for length, number of hits and whether it has been sunk', () => {
    const ship = createShip(3, 1);

    expect(ship.length).toEqual(3);
    expect(ship.hits).toEqual(1);
})

it('has a hit function that increases the number of hits', () => {
    const ship = createShip(4, 2);
    const updatedShip = ship.hit();

    expect(updatedShip.hits).toEqual(3); 
    expect(updatedShip.length).toEqual(4);
})

it('has an isSunk function that returns whether the ship has been sunk', () => {
    const ship = createShip(4, 4);
    const ship2= createShip(4, 1)
    
    expect(ship.isSunk()).toBe(true);
    expect(ship2.isSunk()).toBe(false)
})