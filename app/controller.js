/// var Persona = require('./modelo/persona');
// Inicialitza els festivals per primera vegada.
var fs = require("fs");
var festivalsData = fs.readFileSync('festivals.json');
var festivalsJSON = JSON.parse(festivalsData);

// Obté tots els festivals de la base de dades
exports.getAllFestivals = function (req, res){
	console.log("getfestivalsJSON");
	res.json(festivalsJSON);
}

// Guarda un nou festival a base de dades
exports.saveFestival = function(req, res) {
	console.log("saveFestival="+req.body.titol);
	var nouFestival = req.body;
	festivalsJSON.push(nouFestival);
	var festivalsString = JSON.stringify(festivalsJSON);
	fs.writeFileSync('./festivals.json', festivalsString);
	res.json(festivalsJSON);
}

// Modifica un festival de la base de dades
exports.updateFestival = function(req, res){
	console.log("updateFestival="+req.body);
	var festival = req.body;
	var festivalId = req.body.id -1;
	// console.log("id="+last_id);
	// Remove 1 element from festivalsJSON array, index festivalId
	var removed = festivalsJSON.splice(festivalId, 1, festival);
	var festivalsString = JSON.stringify(festivalsJSON);
	fs.writeFileSync('./festivals.json', festivalsString);
	res.json(festivalsJSON);
}

// Elimina un festival de la base de dades per Id.
exports.deleteFestival = function(req, res){
	console.log("deleteFestival="+req.body);
	var festival = req.body;
	var festivalId = req.body.id -1;
	// Remove 1 element from festivalsJSON array, index festivalId
	var removed = festivalsJSON.splice(festivalId, 1);
	var festivalsString = JSON.stringify(festivalsJSON);
	fs.writeFileSync('./festivals.json', festivalsString);
	res.json(festivalsJSON);
}
