var jsonMap; //TODO: rivedere questa variabile, non mi piace globale!
eurecaClient = new Eureca.Client();
eurecaClient.ready(function (proxy) {
    eurecaServer = proxy;
});

gameInstance = new LBGame(
    800,    //width
    600,    //height
    2500,   //wWidth
    600,    //wHeight
    32,     //MovgridS
    true,   //movIn8Dir
    true,   //overlap
    Phaser.AUTO,    //renderer
    [       //pHs        
        {
            'event': 'createGame',
            'params': ['id', 'Tx', 'Ty', 'port'],
            'function': function (params) {
                console.log('Creating game');
                myId = params.id;
                port = params.port;
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
    5);

function preload() {
    gameInstance.setVisibilityChangeHandlers();
}

function create() {

    console.log('port: ' + port);

    //Chiamata a LBMapAPI per scaricare la mappa
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            jsonMap = JSON.parse(xmlhttp.responseText).response;

            console.log(jsonMap);
            gameInstance.phaserGame.physics.startSystem(Phaser.Physics.ARCADE);
            gameInstance.cDepth.depthGroup = gameInstance.phaserGame.add.group(undefined, undefined, true);
            gameInstance.phaserGame.state.add('menu', MenuState, true);

        }
        else if (xmlhttp.readyState === 4 && xmlhttp.status === 404) {
            console.log('404: LBMapAPI NOT FOUND');
        }
    }

    xmlhttp.open('GET', 'http://lbbigmama.ddns.net:8082/LBApi/downloadMap?port=' + port, false);
    xmlhttp.send();

  
    
}