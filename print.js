var GameOfLife = require('./gol.js');

var world = [];
var dimension = 80;

for(var x = 0; x < dimension; x++) {
    world[x] = [];
    for(var y = 0; y < dimension; y++) {
        world[x][y] = Math.random() > 0.5 ? 1 : 0;
    }
}

var gameOfLife = new GameOfLife(world);

setInterval(function() {
    process.stdout.clearLine();  // clear current text
    process.stdout.cursorTo(0);  // move cursor to beginning of line
    gameOfLife.cycle();
    
    var row = '';
    for(var x = 0; x < world.length; x++) {
        for(var y = 0; y < world[0].length; y++) {
            row += gameOfLife.world[x][y] ? 'x' : '.';
        }
        row += '\n';
    }
    process.stdout.write(row);
  }, 50);