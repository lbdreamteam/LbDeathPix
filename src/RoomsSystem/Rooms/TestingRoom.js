TestingRoom = function () {
    this.buildingsGraphs = ['building', 'building1'];
    this.sidewalkGraph = 'sidewalk';
    this.roadGraph = 'road';
    this.backgroundGraph = 'bg';

    BaseRoom.call(this, { buildingsGraphs: this.buildingsGraphs, roadGraph: this.roadGraph, sidewalkGraph: this.sidewalkGraph, backgroundGraph: this.backgroundGraph });
}

TestingRoom.prototype = Object.create(BaseRoom.prototype);
TestingRoom.prototype.constructor = TestingRoom;

TestingRoom.prototype.preload = function () {
    BaseRoom.prototype.preload.call(this);

    gameInstance.loadImage('player', 'assets/player.png');
    gameInstance.loadImage('tree', 'assets/tree.png');
}

TestingRoom.prototype.create = function() {
    BaseRoom.prototype.create.call(this);

    gameInstance.clientsList[myId] = new LBPlayer(gameInstance, gameInstance.playerSpawnPoint.x, gameInstance.playerSpawnPoint.y, 'player');
    gameInstance.phaserGame.camera.follow(gameInstance.clientsList[myId]);

    gameInstance.cDepth.depthSort(gameInstance);
}