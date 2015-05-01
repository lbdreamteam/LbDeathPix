TestingRoom = function () {
    this.buildingsGraphs = [{ key: 'building', url: 'assets/placeholders/building.png' }, { key: 'building1', url: 'assets/placeholders/building1.png' }, { key: 'building2', url: 'assets/palace.png' }, { key: 'container', url: 'assets/container.png' }, { key: 'shop', url: 'assets/shop.png' }];
    this.sidewalkGraph = { key: 'sidewalk', url: 'assets/placeholders/sidewalk.png' };
    this.roadGraphs = { road: { key: 'road', url: 'assets/placeholders/road.png' }, roadLine: { key: 'roadLine', url: 'assets/placeholders/roadLine.png' }};
    this.foregroundGraph = { key: 'foreground', url: 'assets/placeholders/town.png' };
    this.backgroundGraph = {key: 'bg', url: 'assets/placeholders/bg.png'};
    this.buildingsArray = [{ x: 0, graph: 'building' }, { x: 70, graph: 'building1' }, { x: 270, graph: 'container' }, { x: 150, graph: 'building2' }, { x: 360, graph: 'shop'}];

    this.MapJSON = {
        graphs: {
            buildingsGraphs: this.buildingsGraphs,
            foregroundGraph: this.foregroundGraph,
            roadGraphs: this.roadGraphs,
            sidewalkGraph: this.sidewalkGraph,
            backgroundGraph: this.backgroundGraph
        },
        proportions: {
            road: 1 / 2, sidewalk: 1 / 10, foreground: 1 / 10
        },
        buildingsArray: this.buildingsArray
    };

    BaseRoom.call(this, this.MapJSON);
}

TestingRoom.prototype = Object.create(BaseRoom.prototype);
TestingRoom.prototype.constructor = TestingRoom;

TestingRoom.prototype.preload = function () {
    BaseRoom.prototype.preload.call(this);

    gameInstance.phaserGame.load.crossOrigin = 'anonymous';
    gameInstance.loadImage('player', 'assets/player.png');
}

TestingRoom.prototype.create = function() {
    BaseRoom.prototype.create.call(this);

    gameInstance.clientsList[myId] = new LBPlayer(gameInstance, gameInstance.playerSpawnPoint.x, gameInstance.playerSpawnPoint.y, 'player');
    gameInstance.phaserGame.camera.follow(gameInstance.clientsList[myId]);

    gameInstance.cDepth.depthSort(gameInstance);
}