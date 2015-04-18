BaseRoom = function (graphs) {
   
    LBState.call(this);

    this.currentY = 0;
    this.buildingsArray = [];

    //TODO: Aggiungere controllo che se sono nulle devono andare di default quelle predefinite!
    this.buldingsGraphs = graphs.buildingsGraphs;
    this.sidewalkGraph = graphs.sidewalkGraph;
    this.roadGraph = graphs.roadGraph;
    this.roadLineGraph = graphs.roadLineGraph;
    this.foregroundGraph = graphs.foregroundGraph;
    this.backgroundGraph = graphs.backgroundGraph;
}

BaseRoom.prototype = Object.create(LBState.prototype);
BaseRoom.prototype.constructor = BaseRoom;

BaseRoom.prototype.preload = function () {
    LBState.prototype.preload.call(this);
    
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

BaseRoom.prototype.drawForeground = function (proportion, initY) {

    initY -= gameInstance.movementGridSize;

    for (x = 0; x < Math.round(gameInstance.world.width / gameInstance.movementGridSize) ; x++) {
        for (y = 0; y < Math.round((proportion * gameInstance.world.height) / gameInstance.movementGridSize) ; y++) {
            temp = gameInstance.phaserGame.add.sprite(x * gameInstance.movementGridSize, initY - y * gameInstance.movementGridSize, this.foregroundGraph);
            gameInstance.bgGroup.add(temp);

            this.currentY = initY - y * gameInstance.movementGridSize;
        }
    }
}

BaseRoom.prototype.drawRoad = function (proportion, initY) {

    initY -= gameInstance.movementGridSize;

    for (x = 0; x < Math.round(gameInstance.world.width / gameInstance.movementGridSize) ; x++) {
        for (y = 0; y < Math.round((proportion * gameInstance.world.height) / gameInstance.movementGridSize) ; y++) {
            if (y != Math.floor(Math.round((proportion * gameInstance.world.height) / gameInstance.movementGridSize) / 2)) {
                temp = gameInstance.phaserGame.add.sprite(x * gameInstance.movementGridSize, initY - y * gameInstance.movementGridSize, this.roadGraph);
                gameInstance.bgGroup.add(temp);
            }
            else {
                temp = gameInstance.phaserGame.add.sprite(x * gameInstance.movementGridSize, initY - y * gameInstance.movementGridSize, this.roadLineGraph);
                gameInstance.bgGroup.add(temp);
            }

            this.currentY = initY - y * gameInstance.movementGridSize;
        }
    }
}

BaseRoom.prototype.drawSidewalk = function (proportion, initY) {

    initY -= gameInstance.movementGridSize;

    for (x = 0; x < Math.round(gameInstance.world.width / gameInstance.movementGridSize) ; x++) {
        for (y = 0; y < Math.round((proportion * gameInstance.world.height) / gameInstance.movementGridSize) ; y++) {
            temp = gameInstance.phaserGame.add.sprite(x * gameInstance.movementGridSize, initY - y * gameInstance.movementGridSize, this.sidewalkGraph);
            gameInstance.bgGroup.add(temp);

            this.currentY = initY - y * gameInstance.movementGridSize;
        }
    }

}

BaseRoom.prototype.drawBuildings = function (initY) {

    var cont = 0;
    for (x = 0; x < Math.ceil(gameInstance.phaserGame.world._width) ; x) {
        var n = Math.floor((Math.random() * this.buldingsGraphs.length));
        var image = gameInstance.phaserGame.cache.getImage(this.buldingsGraphs[n]);
        this.buildingsArray[cont] = this.buldingsGraphs[n];
        cont++;
        temp = gameInstance.phaserGame.add.sprite(x, initY - image.height, this.buldingsGraphs[n]);
        gameInstance.bgGroup.add(temp);
        this.currentY = temp.y - temp.height;
        x += temp.width;
    }

    console.log(this.buildingsArray);

}

BaseRoom.prototype.drawBg = function () {
    bg = gameInstance.phaserGame.add.tileSprite(0, 0, gameInstance.world.width, gameInstance.world.height, this.backgroundGraph);
    gameInstance.bgGroup.add(bg);
}

BaseRoom.prototype.draw = function () {
    console.log('draw');
    this.drawBg();
    this.drawForeground(1/10, gameInstance.world.height)
    this.drawRoad(1/2, this.currentY);
    this.drawSidewalk(1 / 10, this.currentY);
    this.drawBuildings(this.currentY);
    
}