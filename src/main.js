eurecaClient = new Eureca.Client();
eurecaClient.ready(function (proxy) {
    eurecaServer = proxy;
});

gameInstance = new LBGame(
    1280,    //width
    720,    //height
    1500,   //wWidth
    720,    //wHeight
    32,     //MovgridS
    true,   //movIn8Dir
    true,   //overlap
    Phaser.AUTO,    //renderer
    [       //pHs        
        {
            'event': 'joined',
            'params': [],
            'function': function () {
                joined = true;
                console.log('joined');
            }
        },
        {
            'event': 'createGame',
            'params': ['id', 'Tx', 'Ty'],
            'function': function (params) {
                console.log('Creating game');
                gameInstance.serverPort = params.port;
                myId = params.id;
                gameInstance.playerSpawnPoint = { x: params.Tx, y: params.Ty };
                gameInstance.otherPlayersW.worker.postMessage({ event: 'init', params: myId }); //inizializza il worker
                create();
            }
        },
        {
            'event': 'updatePlayer',
            'params': ['x', 'y', 'callId'],
            'function': function (params) {
                gameInstance.clientsList[myId].updatePosition(params.x, params.y, params.callId);
            }
        },
        {
            'event': 'updateOtherPlayers',
            'params': ['posTable'],
            'function': function (params) {
                otherPlayersManager.update(params.posTable);
            }
        },
        {
            'event': 'onOtherPlayerConnect',
            'params': ['id', 'oldpos', 'nowPos'],
            'function': function (params) {
                console.log('On other player connect');
                otherPlayersManager.onConnect(params.id, params.oldPos, params.nowPos);
            }
        },
        {
            'event': 'onOtherPlayerDisconnect',
            'params': ['id'],
            'function': function (params) {
                otherPlayersManager.onDisconnect(params.id);
            }
        },
        {
            'event': 'spawnOtherPlayers',
            'params': ['posTable'],
            'function': function (params) {
                otherPlayersManager.spawn(params.posTable);
            }
        }
    ],
    8);

function preload() {
    //TODO: spostare il caricamento delle immagini all'interno dei vari states
    gameInstance.loadImage('tree', 'assets/tree.png');
    gameInstance.loadImage('player', 'assets/player.png');

    gameInstance.phaserGame.load.image('font_table_small', 'assets/font_small/font.png');
    gameInstance.phaserGame.load.image('font_table_medium', 'assets/font_medium/font.png');
    gameInstance.phaserGame.load.image('font_table_large', 'assets/font_large/font.png');

    gameInstance.setVisibilityChangeHandlers();
}

function create() {

    console.log('port: ' + gameInstance.serverPort);

    //Chiamata a LBMapAPI per scaricare la mappa
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            jsonMap = JSON.parse(xmlhttp.responseText).response;

            console.log(jsonMap);
            gameInstance.phaserGame.physics.startSystem(Phaser.Physics.ARCADE);
            gameInstance.cDepth.depthGroup = gameInstance.phaserGame.add.group(undefined, undefined, true);
            gameInstance.phaserGame.state.add('menu', GameState, true);

        }
        else if (xmlhttp.readyState === 4 && xmlhttp.status === 404) {
            console.log('404: LBMapAPI NOT FOUND');
        }
    }

    xmlhttp.open('GET', 'http://lbbigmama.ddns.net:8082/LBApi/downloadMap?port=' + gameInstance.serverPort, false);
    xmlhttp.send();
}