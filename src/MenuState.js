﻿MenuState = function () {
    LBState.call(this);
}

MenuState.prototype = Object.create(LBState.prototype);
MenuState.prototype.constructor = MenuState;

MenuState.prototype.preload = function () {
    gameInstance.phaserGame.load.image('menu_btn', 'assets/placeholders/menu_btn.png');
}

MenuState.prototype.create = function () {
    gameInstance.phaserGame.add.button(500, 200, 'menu_btn', this.callback, this);
    LBState.prototype.update.call(this);
}

MenuState.prototype.update = function () {
    LBState.prototype.update.call(this);
}

MenuState.prototype.callback = function () {
    gameInstance.phaserGame.state.add('level1', TestingRoom, true);
}