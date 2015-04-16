TestingRoom = function () {
    this.buildingsGraphs = ['building', 'building1'];
    this.sidewalkGraph = 'sidewalk';
    this.roadGraph = 'road';
    this.roadLineGraph = 'roadLine';
    this.foregroundGraph = 'sidewalk';
    this.backgroundGraph = 'bg';

    BaseRoom.call(this, { buildingsGraphs: this.buildingsGraphs, foregroundGraph: this.foregroundGraph, roadGraph: this.roadGraph, roadLineGraph: this.roadLineGraph, sidewalkGraph: this.sidewalkGraph, backgroundGraph: this.backgroundGraph });
}

TestingRoom.prototype = Object.create(BaseRoom.prototype);
TestingRoom.prototype.constructor = TestingRoom;

TestingRoom.prototype.preload = function () {
    BaseRoom.prototype.preload.call(this);

    gameInstance.loadImage('player', 'assets/player.png');
    gameInstance.loadImage('tree', 'assets/tree.png');
    gameInstance.phaserGame.load.image('road', 'assets/placeholders/road.png');
    gameInstance.phaserGame.load.image('roadLine', 'assets/placeholders/roadLine.png');
    gameInstance.phaserGame.load.image('sidewalk', 'assets/placeholders/sidewalk.png');
    gameInstance.phaserGame.load.image('building', 'assets/placeholders/building.png');
    gameInstance.phaserGame.load.image('building1', 'assets/placeholders/building1.png');
    gameInstance.phaserGame.load.image('bg', 'assets/placeholders/bg.png');
}

TestingRoom.prototype.create = function() {
    BaseRoom.prototype.create.call(this);

    gameInstance.clientsList[myId] = new LBPlayer(gameInstance, gameInstance.playerSpawnPoint.x, gameInstance.playerSpawnPoint.y, 'player');
    gameInstance.phaserGame.camera.follow(gameInstance.clientsList[myId]);

    gameInstance.cDepth.depthSort(gameInstance);
}