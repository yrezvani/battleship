const createShip = require('./ship');

it('creates a ship object with  properties for length, orientation and coordinates', () => {
    const ship = createShip(3, 'horizontal', 0, 5);

    expect(ship.length).toEqual(3);
    expect(ship.coordinates.orientation).toEqual('horizontal');
    expect(ship.coordinates.startX).toEqual(0);
    expect(ship.coordinates.startY).toEqual(5);
});

it('has a hit function that keeps track of hits and their positions', () => {
    const ship = createShip(4, 'horizontal', 0, 5);
    const updatedShip = ship.hit(2);

    expect(updatedShip.hits).toEqual([false, false, true, false]);
    expect(updatedShip.length).toEqual(4);
});

it('has an isSunk function that returns whether the ship has been sunk', () => {
    const ship = createShip(4, 'horizontal', 0, 5);
    const ship2 = createShip(4, 'horizontal', 0, 5);
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);

    expect(ship.isSunk()).toBe(true);
    expect(ship2.isSunk()).toBe(false);
});
