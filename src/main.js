gameInstance = new LBGame(1280, 720, 1500, 720, 32, true, true, Phaser.AUTO, 5);

function preload() {
    gameInstance.setVisibilityChangeHandlers();
    gameInstance.loadImage('player', 'assets/player.png');
    gameInstance.loadImage('tree', 'assets/tree.png');
}

function create() {

    //Passare x e y dal server alla funzione di creazione del player
    gameInstance.phaserGame.physics.startSystem(Phaser.Physics.ARCADE);
    gameInstance.cDepth.depthGroup = gameInstance.phaserGame.add.group(undefined, undefined, true);
    gameInstance.phaserGame.state.add('prova', MenuState, true);
    
    
}