const createShip = function (length, hits, isSunk) {

    return {
        length: length,
        hits: hits,
        isSunk: isSunk,
        hit: function() {
            this.hits += 1
            console.log("Updated hits:", this.hits);
            return this;
        }
    }
}


const ship = createShip(4, 2, false);
ship.hit();
module.exports = createShip