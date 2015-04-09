BaseRoom = function (graphs) {
   
    LBState.call(this);

    this.currentY = 0;

    //TODO: Aggiungere controllo che se sono nulle devono andare di default quelle predefinite!
    this.buldingsGraphs = graphs.buildingsGraphs;
    this.sidewalkGraph = graphs.sidewalkGraph;
    this.roadGraph = graphs.roadGraph;
    this.backgroundGraph = graphs.backgroundGraph;
}

BaseRoom.prototype = Object.create(LBState.prototype);
BaseRoom.prototype.constructor = BaseRoom;

BaseRoom.prototype.preload = function () {
    LBState.prototype.preload.call(this);
    gameInstance.phaserGame.load.image('road', 'assets/placeholders/road.png');
    gameInstance.phaserGame.load.image('sidewalk', 'assets/placeholders/sidewalk.png');
    gameInstance.phaserGame.load.image('building', 'assets/placeholders/building.png');
    gameInstance.phaserGame.load.image('building1', 'assets/placeholders/building1.png');
    gameInstance.phaserGame.load.image('bg', 'assets/placeholders/bg.png');
}


BaseRoom.prototype.create = function () {
    
    gameInstance.phaserGame.world.setBounds(0, 0, gameInstance.world.width, gameInstance.world.height);
    gameInstance.depthGroup = gameInstance.phaserGame.add.group();
    gameInstance.bgGroup = gameInstance.phaserGame.add.group();
    gameInstance.wholeGroup = gameInstance.phaserGame.add.group();
    gameInstance.wholeGroup.add(gameInstance.bgGroup);
    gameInstance.wholeGroup.add(gameInstance.depthGroup);


    this.draw();

    //TODO: fare in modo di formattare la mappa del movimento "ad hoc"
    

    LBState.prototype.create.call(this);
    
}

BaseRoom.prototype.drawRoad = function (graph, proportion, initY) {

    initY -= gameInstance.movementGridSize;

    for (x = 0; x < Math.round(gameInstance.phaserGame.world._width / gameInstance.movementGridSize) ; x++) {
        for (y = 0; y < Math.round((proportion * gameInstance.phaserGame.world._height) / gameInstance.movementGridSize); y++) {
            temp = gameInstance.phaserGame.add.sprite(x * gameInstance.movementGridSize, initY - y * gameInstance.movementGridSize, graph);
            gameInstance.bgGroup.add(temp);

            this.currentY = initY - y * gameInstance.movementGridSize;
        }
    }
}

BaseRoom.prototype.drawSidewalk = function (graph, proportion, initY) {

    initY -= gameInstance.movementGridSize;

    for (x = 0; x < Math.round(gameInstance.phaserGame.world._width / gameInstance.movementGridSize) ; x++) {
        for (y = 0; y < Math.round((proportion * gameInstance.phaserGame.world._height) / gameInstance.movementGridSize) ; y++) {
            temp = gameInstance.phaserGame.add.sprite(x * gameInstance.movementGridSize, initY - y * gameInstance.movementGridSize, graph);
            gameInstance.bgGroup.add(temp);

            this.currentY = initY - y * gameInstance.movementGridSize;
        }
    }

}

BaseRoom.prototype.drawTown = function (graph, initY) {

    for (x = 0; x < Math.ceil(gameInstance.phaserGame.world._width) ; x) {
        var n = Math.floor((Math.random() * graph.length));
        var image = gameInstance.phaserGame.cache.getImage(graph[n]);
        temp = gameInstance.phaserGame.add.sprite(x, initY - image.height, graph[n]);
        gameInstance.bgGroup.add(temp);
        this.currentY = temp.y - temp.height;
        x += temp.width;
    }

}

BaseRoom.prototype.drawBg = function (graph) {
    bg = gameInstance.phaserGame.add.tileSprite(0, 0, gameInstance.phaserGame.world._width, gameInstance.phaserGame.world._height, graph);
    gameInstance.bgGroup.add(bg);
}

BaseRoom.prototype.draw = function () {
    console.log('draw');
    this.drawBg(this.backgroundGraph);
    this.drawRoad(this.roadGraph, 1 / 2, gameInstance.phaserGame.world._height);
    this.drawSidewalk(this.sidewalkGraph, 1 / 10, this.currentY);
    this.drawTown(this.buldingsGraphs, this.currentY);
    
}