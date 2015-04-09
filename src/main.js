gameInstance = new LBGame(1280, 720, 1500, 720, 32, true, true, Phaser.AUTO, 5);

function preload() {
    gameInstance.setVisibilityChangeHandlers();
}

function create() {

    gameInstance.phaserGame.physics.startSystem(Phaser.Physics.ARCADE);
    gameInstance.cDepth.depthGroup = gameInstance.phaserGame.add.group(undefined, undefined, true);
    gameInstance.phaserGame.state.add('menu', MenuState, true);
    
    
}