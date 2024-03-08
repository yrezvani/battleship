const createShip = function (length, orientation, startX, startY) {
    const hits = new Array(length).fill(false);

    let coordinates = { startX, startY, orientation };

    console.log('ship created');
    return {
        length: length,
        hits: hits,
        coordinates,
        hit: function (position) {
            if (position >= 0 && position < this.length) {
                this.hits[position] = true;
            }
            return this;
        },
        isSunk: function () {
            return this.hits.every((part) => part === true);
        },
    };
};

module.exports = createShip;
