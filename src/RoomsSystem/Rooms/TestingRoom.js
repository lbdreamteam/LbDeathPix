TestingRoom = function () {
    
    this.MapJSON = jsonMap;

    BaseRoom.call(this, this.MapJSON);
}

TestingRoom.prototype = Object.create(BaseRoom.prototype);
TestingRoom.prototype.constructor = TestingRoom;

TestingRoom.prototype.preload = function () {
    BaseRoom.prototype.preload.call(this);

    gameInstance.phaserGame.world.setBounds(0, 0, gameInstance.world.width, gameInstance.world.height);
    this.add.existing(gameInstance.cDepth.depthGroup);
    gameInstance.phaserGame.time.advancedTiming = true;

    gameInstance.phaserGame.load.crossOrigin = 'anonymous';
    gameInstance.loadImage('player', 'https://s3-eu-west-1.amazonaws.com/lbbucket/Assets/Images/player.png');

    eurecaServer.clientHandler({ 'event': 'ready', 'params': { 'id': myId } });
    console.log('Joining...');
}

TestingRoom.prototype.create = function() {
    BaseRoom.prototype.create.call(this);

    gameInstance.clientsList[myId] = new LBPlayer(gameInstance, gameInstance.playerSpawnPoint.x, gameInstance.playerSpawnPoint.y, 'player');
    gameInstance.phaserGame.camera.follow(gameInstance.clientsList[myId]);

    gameInstance.cDepth.depthSort(gameInstance);

    fpsText = gameInstance.phaserGame.add.text(10, 10, 'FPS: ' + gameInstance.phaserGame.time.fps);
}

var fpsText;

GameState.prototype.update = function () {
    fpsText.setText('FPS: ' + gameInstance.phaserGame.time.fps);
}