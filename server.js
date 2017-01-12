// Inicialització serveis web amb express
var express  = require('express');
var app      = express(); 						

// Configuració mongoose per connectamb amb mongodb
// var mongoose = require('mongoose'); 				
// mongoose.connect('mongodb://localhost:27017/Festivalsjs');

// Configuració servidor.
app.configure(function() {
	// Permet l'accés al codi del client.
	app.use(express.static(__dirname + '/angular')); 		
	// Activació log  
	app.use(express.logger('dev')); 
	// Mètodes per facilitar   
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});

// Carregar els endpoints pels serveis web.
require('./app/routes.js')(app);

// Inicialitzar el servidor web node.js al port indicat
var port  	 = process.env.PORT || 8080; 
var domain 	 = process.env.DOMAIN || '127.0.0.1';
// Inicialitzar el servidor web node.js al port indicat
app.listen(port,domain);
console.log("Servidor web iniciat pel domini i port " + domain +":" + port);
