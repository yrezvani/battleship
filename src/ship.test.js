const createShip = require('./ship');

it('creates a ship object with  properties for length and orientation', () => {
    const ship = createShip(3, 'horizontal');

    expect(ship.length).toEqual(3);
    expect(ship.orientation).toEqual('horizontal');
});

it('has a hit function that keeps track of hits and their positions', () => {
    const ship = createShip(4, 'horizontal');
    const updatedShip = ship.hit(2);

    expect(updatedShip.hits).toEqual([false, false, true, false]);
    expect(updatedShip.length).toEqual(4);
});

it('has an isSunk function that returns whether the ship has been sunk', () => {
    const ship = createShip(4, 'horizontal');
    const ship2 = createShip(4, 'horizontal');
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);

    expect(ship.isSunk()).toBe(true);
    expect(ship2.isSunk()).toBe(false);
});
