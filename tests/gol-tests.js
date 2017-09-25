var test = require('tape');
var GameOfLife = require('../gol.js');

test('When instantiating Game, world that was passed must be stored in this.world', function(assert) {
    assert.plan(1);
    var world = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ];
    var gameOfLife = new GameOfLife(world);
    assert.deepEqual(world, gameOfLife.world);
});

test('Live cell must die if cell has fewer than two live neighbours (underpopulation)', function(assert) {
    assert.plan(1);
    var world = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ];
    var gameOfLife = new GameOfLife(world);
    gameOfLife.cycle();
    var expected = 0;
    var actual = gameOfLife.world[1][1];
    assert.deepEqual(actual, expected);
});

test('Live cell must live if it has two or three live neighbours', function(assert) {
    assert.plan(2);
    var world = [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ];
    var world2 = [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0]
    ];

    // world 1
    var gameOfLife = new GameOfLife(world);
    gameOfLife.cycle();
    var expected = 1;
    var actual = gameOfLife.world[1][1];
    assert.deepEqual(actual, expected);

    // world 2
    var gameOfLife = new GameOfLife(world2);
    gameOfLife.cycle();
    var expected = 1;
    var actual = gameOfLife.world[1][1];
    assert.deepEqual(actual, expected);
});

test('Live cell must die if it more than three neighbours (overpopulation)', function(assert) {
    assert.plan(1);
    var world = [
        [1, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ];
    var gameOfLife = new GameOfLife(world);
    gameOfLife.cycle();
    var expected = 0;
    var actual = gameOfLife.world[1][1];
    assert.deepEqual(actual, expected);
});

test('Dead cell must live it has exactly three live neighbours (reproduction)', function(assert) {
    assert.plan(1);
    var world = [
        [1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]
    ];
    var gameOfLife = new GameOfLife(world);
    gameOfLife.cycle();
    var expected = 1;
    var actual = gameOfLife.world[1][1];
    assert.deepEqual(actual, expected);
});