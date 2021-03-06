﻿TestingRoom = function () {
    
    this.MapJSON = jsonMap;

    BaseRoom.call(this, this.MapJSON);
}

TestingRoom.prototype = Object.create(BaseRoom.prototype);
TestingRoom.prototype.constructor = TestingRoom;

TestingRoom.prototype.preload = function () {
    BaseRoom.prototype.preload.call(this);
    
    this.loadImages(
        [
            ['tree', 'assets/tree.png'],
            ['player', 'assets/player.png']
        ],
        function() {
            gameInstance.phaserGame.world.setBounds(0, 0, gameInstance.world.width, gameInstance.world.height);
            gameInstance.phaserGame.add.existing(gameInstance.cDepth.depthGroup);
            gameInstance.phaserGame.time.advancedTiming = true;
        
            //gameInstance.phaserGame.load.crossOrigin = 'anonymous';
            //gameInstance.loadImage('player', 'https://s3-eu-west-1.amazonaws.com/lbbucket/Assets/Images/player.png');
        
            eurecaServer.clientHandler({ 'event': 'ready', 'params': { 'id': myId } });
            console.log('Joining...');
        }
    );
}

TestingRoom.prototype.create = function() {
    BaseRoom.prototype.create.call(this);

    gameInstance.clientsList[myId] = new LBPlayer(gameInstance, gameInstance.playerSpawnPoint.x, gameInstance.playerSpawnPoint.y, 'player');
    gameInstance.phaserGame.camera.follow(gameInstance.clientsList[myId]);

    gameInstance.cDepth.depthSort(gameInstance);

    fpsText = gameInstance.phaserGame.add.text(10, 10, 'FPS: ' + gameInstance.phaserGame.time.fps);
    fpsText.fixedToCamera = true;
    
    
}

var fpsText;

TestingRoom.prototype.update = function () {
    fpsText.setText('FPS: ' + gameInstance.phaserGame.time.fps);
    
    l1.x = gameInstance.phaserGame.camera.x * 0.8;
    //l2.x = gameInstance.phaserGame.camera.x * 0.4;
    l3.x = gameInstance.phaserGame.camera.x * 0.2;
    l4.x = gameInstance.phaserGame.camera.x * 0.1;
}