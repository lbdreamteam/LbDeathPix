module.exports = {
    create : function() {
        return new LBPrivateHandlersModule();
    },
    version: 'v0.0.0.1.3'
}

LBPrivateHandlersModule = function () {
    this.modules = {};

    this.params = {};
    this.phs = {};

    this.init();
    this.start();
}

LBPrivateHandlersModule.prototype = Object.create(Object);
LBPrivateHandlersModule.prototype.constructor = LBPrivateHandlersModule;

LBPrivateHandlersModule.prototype.init = function () {
    this.modules['cli-color'] = require('cli-color');
};

LBPrivateHandlersModule.prototype.start = function () {
    console.log(this.modules['cli-color'].blue.bgWhite('LB pHs ' + module.exports.version));
};

LBPrivateHandlersModule.prototype.addHandler = function (event, params, pHandler) {
    this.params[event] = params;
    this.phs[event] = pHandler;
};

LBPrivateHandlersModule.prototype.callHandler = function (event, params, res, onError, callback) {
    onError = onError || function (err) {
        console.error('ERROR --At ' + event + '--Code: ' + err.code);
        return;
    };

    for (var p in this.params[event]) if (!params[this.params[event][p]]) onError({ code: 0 });
    this.phs[event](params, res);
};