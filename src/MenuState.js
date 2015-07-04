MenuState = function () {
    LBState.call(this);
}

MenuState.prototype = Object.create(LBState.prototype);
MenuState.prototype.constructor = MenuState;

MenuState.prototype.preload = function () {
    gameInstance.phaserGame.load.crossOrigin = 'anonymous';
    gameInstance.phaserGame.load.image('menu_btn', 'https://s3-eu-west-1.amazonaws.com/lbbucket/Assets/Images/menuBtn.png');
}

MenuState.prototype.create = function () {
    gameInstance.phaserGame.add.button(gameInstance.width / 2, gameInstance.height / 2, 'menu_btn', this.callback, this);
    LBState.prototype.update.call(this);
}

MenuState.prototype.update = function () {
    LBState.prototype.update.call(this);
}

MenuState.prototype.callback = function () {
    gameInstance.phaserGame.state.add('stage', TestingRoom, true);
}