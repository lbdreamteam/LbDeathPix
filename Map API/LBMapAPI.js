var express = require('express'),
	LBApi = require('./ServerModules/LBAPIModule.js');

var LBApiInstance = LBApi.create(
	'8082',
	'eu-west-1',
	[
		{
		    'action': 'createJson',
		    'params': [],
		    'function': generateJSON
		}
	]

);


var MapJSON = {};

function generateJSON(params) {

    MapJSON = {
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

	fillJSON();	
}

function fillJSON() {
	const worldX = 1500,
		  worldY = 720;	

	const roadProportion = 1 / 2,
		  sidewalkProportion = 1 / 10,
		  foregroundProportion = 1 / 10;

	MapJSON.world = { width: worldX, height: worldY };
	MapJSON.proportions = { road: roadProportion, sidewalk: sidewalkProportion, foreground: foregroundProportion}

	var graphsJSON = {};

	var s3 = new LBApiInstance.modules['aws-sdk'].S3();
	s3.getObject(
		{Bucket: "lbbucket", Key: "graphsJSON.json"},
		function (error, data) {
			if (error) {
		  		console.log("Failed to retrieve an object: " + error);
    		} 
    		else {
      			console.log("Loaded " + data.ContentLength + " bytes");
      			graphsJSON = JSON.parse(data.Body.toString('utf8'));

      			MapJSON.graphs.backgroundGraph = { key: getRandomString(8), url: graphsJSON.backgrounds[getRandomInt(0, graphsJSON.backgrounds.length)].url };
      			MapJSON.graphs.foregroundGraph = { key: getRandomString(8), url: graphsJSON.foregrounds[getRandomInt(0, graphsJSON.foregrounds.length)].url };
      			MapJSON.graphs.roadGraphs = {
      			    road: { key: getRandomString(8), url: graphsJSON.roads[getRandomInt(0, graphsJSON.roads.length)].url },
      			    roadLine: { key: getRandomString(8), url: graphsJSON.roadLines[getRandomInt(0, graphsJSON.roadLines.length)].url }
      			}
      			MapJSON.graphs.sidewalkGraph = { key: getRandomString(8), url: graphsJSON.sidewalks[getRandomInt(0, graphsJSON.sidewalks.length)].url }

      			console.log(MapJSON);
    		}
		}
	);


}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomString(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}