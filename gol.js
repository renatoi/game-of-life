function GameOfLife(world) {
    this.world = world;
}

GameOfLife.prototype.cycle = function() {
    var world = this.world;
    var newWorld = JSON.parse(JSON.stringify(world));

    for(var x = 0; x < world.length; x++) {
        for(var y = 0; y < world[0].length; y++) {
            var points = [
                [x - 1, y - 1],    // top left
                [x, y - 1],        // top
                [x + 1, y - 1],    // top right
                [x - 1 , y],       // left
                [x + 1 , y],       // right
                [x - 1, y + 1],    // bottom left
                [x, y + 1],        // bottom
                [x + 1, y + 1],    // bottom right
            ];

            // count live neighboring cells cells
            var liveCells = 0;
            for(var p = 0; p < points.length; p++) {
                var xx = points[p][0];
                var yy = points[p][1];

                // bounds
                if (xx < 0 || xx >= world.length) {
                    continue;
                }
                if (yy < 0 || yy >= world[x].length) {
                    continue;
                }
                // is it alive?
                if (world[xx][yy] === 1) {
                    liveCells++;
                }
            }

            // live cell
            if (world[x][y] === 1 && (liveCells < 2 || liveCells > 3)) {
                newWorld[x][y] = 0;
            }
            // dead cell
            else if (liveCells === 3) {
                newWorld[x][y] = 1;
            }
        }
    }
    this.world = newWorld;
}


module.exports = GameOfLife;