var jsonMap;
gameInstance = new LBGame(1280, 720, 1500, 720, 32, true, true, Phaser.AUTO, 5);

function preload() {
    gameInstance.setVisibilityChangeHandlers();
    //gameInstance.phaserGame.load.json('jsonMap', 'map.json');

}

function create() {

    console.log('port: ' + port);

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