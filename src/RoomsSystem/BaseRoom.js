BaseRoom = function (params) {
   
    LBState.call(this);

    this.MapJSON = params;
    this.cursorY = 0;
}

var l1, l2, l3, l4;

BaseRoom.prototype = Object.create(LBState.prototype);
BaseRoom.prototype.constructor = BaseRoom;

BaseRoom.prototype.preload = function () {
    LBState.prototype.preload.call(this);
    
    gameInstance.phaserGame.load.image('layer1', 'assets/testingParallax/layer1.png');
    gameInstance.phaserGame.load.image('layer2', 'assets/testingParallax/layer2.png');
    gameInstance.phaserGame.load.image('layer3', 'assets/testingParallax/layer3.png');
    gameInstance.phaserGame.load.image('layer4', 'assets/testingParallax/layer4.png');
    
    for (var i in this.MapJSON.graphs) {
        if ((this.MapJSON.graphs[i]).constructor === Array) {
            for (j = 0; j < this.MapJSON.graphs[i].length; j++) {
                gameInstance.phaserGame.load.image(this.MapJSON.graphs[i][j].key, this.MapJSON.graphs[i][j].url);
            }
        }
        else {
            if (this.MapJSON.graphs[i].key === undefined || this.MapJSON.graphs[i].url === undefined) {
                for (var k in this.MapJSON.graphs[i]) {
                    gameInstance.phaserGame.load.image(this.MapJSON.graphs[i][k].key, this.MapJSON.graphs[i][k].url);
                }
            }
            else {
                gameInstance.phaserGame.load.image(this.MapJSON.graphs[i].key, this.MapJSON.graphs[i].url);
            }
        }
    }
}

BaseRoom.prototype.create = function () {
    
    gameInstance.phaserGame.world.setBounds(0, 0, gameInstance.world.width, gameInstance.world.height); //TODO: rivedere in base alle misure della mappa
    gameInstance.depthGroup = gameInstance.phaserGame.add.group();
    gameInstance.bgGroup = gameInstance.phaserGame.add.group();
    gameInstance.wholeGroup = gameInstance.phaserGame.add.group();
    gameInstance.wholeGroup.add(gameInstance.bgGroup);
    gameInstance.wholeGroup.add(gameInstance.depthGroup);

    this.draw();
    

    LBState.prototype.create.call(this);
    
}

BaseRoom.prototype.drawBg = function () {
    bg = gameInstance.phaserGame.add.tileSprite(0, 0, gameInstance.world.width, gameInstance.world.height, this.MapJSON.graphs.backgroundGraph.key); //TODO: rivedere in base alle misure della mappa
    gameInstance.bgGroup.add(bg);
}

BaseRoom.prototype.drawForeground = function () {
    var initY = gameInstance.world.height; //TODO: rivedere in base alla mappa scaricata
    initY -= gameInstance.movementGridSize;

    for (x = 0; x < Math.round(gameInstance.world.width / gameInstance.movementGridSize) ; x++) {
        for (y = 0; y < Math.round((this.MapJSON.proportions.foreground * gameInstance.world.height) / gameInstance.movementGridSize) ; y++) {
            temp = gameInstance.phaserGame.add.sprite(x * gameInstance.movementGridSize, initY - y * gameInstance.movementGridSize, this.MapJSON.graphs.foregroundGraph.key);
            gameInstance.bgGroup.add(temp);
            this.cursorY = initY - y * gameInstance.movementGridSize;
        }
    }
}

BaseRoom.prototype.drawRoad = function () {
    var initY = this.cursorY;
    initY -= gameInstance.movementGridSize;

    for (x = 0; x < Math.round(gameInstance.world.width / gameInstance.movementGridSize) ; x++) {
        for (y = 0; y < Math.round((this.MapJSON.proportions.road * gameInstance.world.height) / gameInstance.movementGridSize) ; y++) {
            if (y != Math.floor(Math.round((this.MapJSON.proportions.road * gameInstance.world.height) / gameInstance.movementGridSize) / 2)) {
                temp = gameInstance.phaserGame.add.sprite(x * gameInstance.movementGridSize, initY - y * gameInstance.movementGridSize, this.MapJSON.graphs.roadGraphs.road.key);
                gameInstance.bgGroup.add(temp);
            }
            else {
                temp = gameInstance.phaserGame.add.sprite(x * gameInstance.movementGridSize, initY - y * gameInstance.movementGridSize, this.MapJSON.graphs.roadGraphs.roadLine.key);
                gameInstance.bgGroup.add(temp);
            }

            this.cursorY = initY - y * gameInstance.movementGridSize;
        }
    }
}

BaseRoom.prototype.drawSidewalk = function () {

    var initY = this.cursorY;
    initY -= gameInstance.movementGridSize;

    for (x = 0; x < Math.round(gameInstance.world.width / gameInstance.movementGridSize) ; x++) {
        for (y = 0; y < Math.round((this.MapJSON.proportions.sidewalk * gameInstance.world.height) / gameInstance.movementGridSize) ; y++) {
            temp = gameInstance.phaserGame.add.sprite(x * gameInstance.movementGridSize, initY - y * gameInstance.movementGridSize, this.MapJSON.graphs.sidewalkGraph.key);
            gameInstance.bgGroup.add(temp);
            this.cursorY = initY - y * gameInstance.movementGridSize;
        }
    }

}

BaseRoom.prototype.drawBuildings = function () {
    var initY = this.cursorY;

    for (i = 0; i < this.MapJSON.buildingsArray.length; i++) {
        var image = gameInstance.phaserGame.cache.getImage(this.MapJSON.buildingsArray[i].graph);
        temp = gameInstance.phaserGame.add.sprite(this.MapJSON.buildingsArray[i].x, initY - image.height, this.MapJSON.buildingsArray[i].graph);
        gameInstance.bgGroup.add(temp);
        this.cursorY = temp.y - temp.height;
    }

}


//TESTING
BaseRoom.prototype.testParallax = function () {
    
    l4 = gameInstance.phaserGame.add.tileSprite(0, 0, gameInstance.world.width, 387, 'layer4'); 
    l3 = gameInstance.phaserGame.add.tileSprite(0, 0, gameInstance.world.width, 387, 'layer3');
    l2 = gameInstance.phaserGame.add.tileSprite(0, 0, gameInstance.world.width, 387, 'layer2'); 
    l1 = gameInstance.phaserGame.add.tileSprite(0, 0, gameInstance.world.width, 387, 'layer1');
    
    gameInstance.bgGroup.add(l4);
    gameInstance.bgGroup.add(l3);
    gameInstance.bgGroup.add(l2);
    gameInstance.bgGroup.add(l1);
}

BaseRoom.prototype.draw = function () {
    //this.drawBg();
    //this.drawForeground();
    //this.drawRoad();
    //this.drawSidewalk();
    //this.drawBuildings();
    this.testParallax();
}