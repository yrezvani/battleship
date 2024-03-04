const createShip = function (length, orientation) {
    const hits = new Array(length).fill(false);

    return {
        length: length,
        hits: hits,
        orientation: orientation,
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
