BaseRoom = function (params) {
   
    LBState.call(this);

    this.currentY = 0;
    this.buildingsArray = params.buildingsArray;

    //TODO: Aggiungere controllo che se sono nulle devono andare di default quelle predefinite!
    this.graphs = params.graphs;
    this.proportions = params.proportions;
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

    this.createJSONMap();

    this.draw();
    

    LBState.prototype.create.call(this);
    
}

BaseRoom.prototype.createJSONMap = function (/*proportions*/) {
    //this.graphs = graphs;
    //this.proportions = proportions;
    //this.buildingsArray = [];

    var emptyString = {
        graphs: {
            buildingsGraphs: [],
            roadGraphs: {
                road: null,
                roadLine : null
            },
            sidewalkGraph: null,
            backgroundGraph: null,
            foregroundGraph: null
        },

        proportions: {
            road: null,
            sidewalk: null,
            foreground: null
        },

        buildingsArray: [],

        world: {
            width: null,
            height: null
        }
    };

    

    emptyString.graphs = this.graphs;
    emptyString.proportions = this.proportions;
    emptyString.buildingsArray = this.buildingsArray;

    console.log(emptyString);



}

BaseRoom.prototype.drawForeground = function (initY) {

    initY -= gameInstance.movementGridSize;

    for (x = 0; x < Math.round(gameInstance.world.width / gameInstance.movementGridSize) ; x++) {
        for (y = 0; y < Math.round((this.proportions.foreground * gameInstance.world.height) / gameInstance.movementGridSize) ; y++) {
            temp = gameInstance.phaserGame.add.sprite(x * gameInstance.movementGridSize, initY - y * gameInstance.movementGridSize, this.graphs.foregroundGraph);
            gameInstance.bgGroup.add(temp);

            this.currentY = initY - y * gameInstance.movementGridSize;
        }
    }
}

BaseRoom.prototype.drawRoad = function (initY) {

    initY -= gameInstance.movementGridSize;

    for (x = 0; x < Math.round(gameInstance.world.width / gameInstance.movementGridSize) ; x++) {
        for (y = 0; y < Math.round((this.proportions.road * gameInstance.world.height) / gameInstance.movementGridSize) ; y++) {
            if (y != Math.floor(Math.round((this.proportions.road * gameInstance.world.height) / gameInstance.movementGridSize) / 2)) {
                temp = gameInstance.phaserGame.add.sprite(x * gameInstance.movementGridSize, initY - y * gameInstance.movementGridSize, this.graphs.roadGraphs.road);
                gameInstance.bgGroup.add(temp);
            }
            else {
                temp = gameInstance.phaserGame.add.sprite(x * gameInstance.movementGridSize, initY - y * gameInstance.movementGridSize, this.graphs.roadGraphs.roadLine);
                gameInstance.bgGroup.add(temp);
            }

            this.currentY = initY - y * gameInstance.movementGridSize;
        }
    }
}

BaseRoom.prototype.drawSidewalk = function (initY) {

    initY -= gameInstance.movementGridSize;

    for (x = 0; x < Math.round(gameInstance.world.width / gameInstance.movementGridSize) ; x++) {
        for (y = 0; y < Math.round((this.proportions.sidewalk * gameInstance.world.height) / gameInstance.movementGridSize) ; y++) {
            temp = gameInstance.phaserGame.add.sprite(x * gameInstance.movementGridSize, initY - y * gameInstance.movementGridSize, this.graphs.sidewalkGraph);
            gameInstance.bgGroup.add(temp);

            this.currentY = initY - y * gameInstance.movementGridSize;
        }
    }

}

BaseRoom.prototype.drawBuildings = function (initY) {

    //var cont = 0;
    //for (x = 0; x < Math.ceil(gameInstance.phaserGame.world._width) ; x) {
    //    var n = Math.floor((Math.random() * this.graphs.buildingsGraphs.length));
    //    var image = gameInstance.phaserGame.cache.getImage(this.graphs.buildingsGraphs[n]);
    //    this.buildingsArray[cont] = this.graphs.buildingsGraphs[n];
    //    cont++;
    //    temp = gameInstance.phaserGame.add.sprite(x, initY - image.height, this.graphs.buildingsGraphs[n]);
    //    gameInstance.bgGroup.add(temp);
    //    this.currentY = temp.y - temp.height;
    //    x += temp.width;
    //}

    var cont = 0;
    for (x = 0; x < Math.ceil(gameInstance.phaserGame.world._width) ; x) {
        var image = gameInstance.phaserGame.cache.getImage(this.buildingsArray[cont]);
        temp = gameInstance.phaserGame.add.sprite(x, initY - image.height, this.buildingsArray[cont]);
        gameInstance.bgGroup.add(temp);
        this.currentY = temp.y - temp.height;
        x += temp.width;
        cont++;
    }

}

BaseRoom.prototype.drawBg = function () {
    bg = gameInstance.phaserGame.add.tileSprite(0, 0, gameInstance.world.width, gameInstance.world.height, this.graphs.backgroundGraph);
    gameInstance.bgGroup.add(bg);
}

BaseRoom.prototype.draw = function () {
    this.drawBg();
    this.drawForeground(gameInstance.world.height)
    this.drawRoad(this.currentY);
    this.drawSidewalk(this.currentY);
    this.drawBuildings(this.currentY);
    
}