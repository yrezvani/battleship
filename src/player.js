
const player = function () {
    const prevMoves = [];

    const generateRandCoordinates = function () {
        
        const getRandXY = function () {
            const x = Math.floor(Math.random()* 10);
            const y = Math.floor(Math.random() * 10);

            return {
                'x': x,
                'y': y
            }
        }
        
        let newCoordinates;
        let newCoordinatesStr;
        do {
            newCoordinates = getRandXY();
            newCoordinatesStr = `${newCoordinates.x.toString()},${newCoordinates.y.toString()}`;
        } while (prevMoves.includes(newCoordinatesStr));
        
        prevMoves.push(newCoordinatesStr);
        return newCoordinates
    }

    return {
        prevMoves,
        generateRandCoordinates

    }

}

module.exports = player;