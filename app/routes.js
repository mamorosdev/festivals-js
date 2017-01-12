// var Persona = require('./modelo/persona');
var Controller = require ('./controller');

module.exports = function(app) {

	// Obtenir tots els Festivals
	app.get('/api/festivals', Controller.getAllFestivals);
	// Obtenir llista de Festivals amb criteris.
	// Nota: Per ara realitzarem els filtres mitjançant caché.
	// app.get('/api/festivals', Controller.getFilteredFestivals);
	// Crear un nou Festival
	app.post('/api/festivals', Controller.saveFestival);
	// Modificar les dades d'un Festival
	app.put('/api/festivals/:festivals_id', Controller.updateFestival);
	// Eliminar les dades d'un Festival
	app.delete('/api/festivals/:festivals_id', Controller.deleteFestival);
	
	// Carreguem la vista des del domini.
	app.get('*', function(req, res) {
		res.sendfile('./angular/index.html'); 
	});

	// Tractament errors al servidor. (pex HTTP 500)
	app.use(function(err, req, res, next) {
  		console.error(err.stack);
  		const output = fs.readFileSync('./angular/error.html', 'utf8');
  		res.status(500).send(output);
	});
};