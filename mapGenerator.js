﻿generateMap = function () {
    console.log('Started map.json creation...');

    //Params to set
    var MapJSON = {
        world: {},
        graphs: {
            buildingsGraphs: [],
            sidewalkGraph: {},
            roadGraphs: {},
            foregroundGraph: {},
            backgroundGraph: {}
        },
        proportions: {},
        buildingsArray: []
    }


    const worldX = 1500,
		  worldY = 720;

    const roadProportion = 1 / 2,
		  sidewalkProportion = 1 / 10,
		  foregroundProportion = 1 / 10;

    MapJSON.world = { width: worldX, height: worldY };
    MapJSON.proportions = { road: roadProportion, sidewalk: sidewalkProportion, foreground: foregroundProportion }

    var graphsJSON = {};


    graphsJSON = gameInstance.phaserGame.cache.getJSON('graphsJSON');

    MapJSON.graphs.backgroundGraph = { key: getRandomString(8), url: graphsJSON.backgrounds[getRandomInt(0, graphsJSON.backgrounds.length)].url };
    MapJSON.graphs.foregroundGraph = { key: getRandomString(8), url: graphsJSON.foregrounds[getRandomInt(0, graphsJSON.foregrounds.length)].url };
    MapJSON.graphs.roadGraphs = {
        road: { key: getRandomString(8), url: graphsJSON.roads[getRandomInt(0, graphsJSON.roads.length)].url },
        roadLine: { key: getRandomString(8), url: graphsJSON.roadLines[getRandomInt(0, graphsJSON.roadLines.length)].url }
    }
    MapJSON.graphs.sidewalkGraph = { key: getRandomString(8), url: graphsJSON.sidewalks[getRandomInt(0, graphsJSON.sidewalks.length)].url }

    //EDIFICI
    for (x = 0; x <= worldX; x) {
        var temp = graphsJSON.buildings[getRandomInt(0, graphsJSON.buildings.length)];
        var tempX;

        tempX = getRandomInt(0, Math.round(temp.width / 2));

        if (x + tempX + temp.width < worldX) {

            if (checkBuildingAlreadyAdded(MapJSON.graphs.buildingsGraphs, temp.url)) {
                MapJSON.buildingsArray.push({ x: x + tempX, graph: MapJSON.graphs.buildingsGraphs[getBuildingAlreadyAddedIndex(MapJSON.graphs.buildingsGraphs, temp.url)].key });
            }
            else {
                var key = getRandomString(8);
                MapJSON.graphs.buildingsGraphs.push({ key: key, url: temp.url });
                MapJSON.buildingsArray.push({ x: x + tempX, graph: key });
            }

        }

        //console.log('x: ' + x + '  tempX: ' + tempX + '  temp.width: ' + temp.width + '  temp.angleX: ' + temp.angleX);

        if (temp.hasOwnProperty('angleX')) {

            x = x + tempX + temp.angleX;
        }
        else {
            x = x + tempX + temp.width;
        }

        //console.log('new x: ' + x);
        //console.log();

    }


    console.log(MapJSON);

    jsonMap = MapJSON;

    console.log('map.json created.');
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function checkBuildingAlreadyAdded(entry, prop) {
    for (var i = 0; i < entry.length; i++) if (entry[i].url == prop) return true;
}

function getBuildingAlreadyAddedIndex(entry, prop) {
    for (var i = 0; i < entry.length; i++) if (entry[i].url == prop) return i;
}