const createShip = function (length, hits, isSunk) {

    return {
        length: length,
        hits: hits,
        hit: function() {
            this.hits += 1
            console.log("Updated hits:", this.hits);
            return this;
        },
        isSunk: function () {
            return this.length - this.hits <= 0;
        }
    }
}


module.exports = createShip