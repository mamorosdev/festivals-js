angular.module('MainApp', [])

function mainController($scope, $http) {
	// Variables de navegació
	var titolsLlista = [
		"Llista festivals","Nou festival","Com funciona?"];
	$scope.vista = "llista";
	$scope.titolVista = "Llista festivals";

	// Variables amb dades d'un festival.	
	$scope.newFestival = {};
	$scope.detailFestival = {};
	$scope.saveOrUpdate = "save";

	// Variables amb llistes de festivals.
	$scope.festivalsInici = {};
	$scope.festivalsCons = {};
	$scope.festivals = {};

	$scope.poblacions = [];

	// Paginacio: Disponible proximament.
	// Paginació llista de festivals.
	/* 
	$scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.sliceFinal = 1;
    $scope.sliceIni = 0; */
    $scope.paginaActual = 0;
    $scope.numRegsPagina = 5;

	// Filtre de cerca de festivals.
	$scope.filtreFestival = {};
	$scope.filtreFestival.poblacio = 0;
	$scope.filtreFestival.gratuits = false;
	$scope.filtreFestival.dataInici = '';
	$scope.selected = false;

	// Carreguem els N primers festivals de la base de dades a l'iniciar la sessió.
	$http.get('/api/festivals').success(function(data) {
		console.log("$http.get('/api/festivals')");
		$scope.festivalsInici = data;
		$scope.festivalsCons = data;
		seguentPaginaFestivals();

		// Paginacio: Disponible proximament.
		// $scope.sliceIni = $scope.currentPage * $scope.pageSize;
		/* var elemsUltimaPag = $scope.festivalsInici.length>$scope.pageSize?
			$scope.pageSize:
			$scope.festivalsInici.length % $scope.pageSize;
		$scope.sliceFinal = $scope.currentPage + elemsUltimaPag;
		console.log("sliceIni = " + $scope.sliceIni); 
		console.log("sliceFinal = " + $scope.sliceFinal);
		$scope.festivals = data.slice($scope.sliceIni,$scope.sliceFinal); */

		// Agafar poblacions dels resultats de la cerca.
		var poblacionsTAux = [];
		var poblacionsTable = [];
		var poblacionsValors = [];
		var poblacionsTAux = data.map(function(elem) {
			var pob = {"id":"1","poblacio":"a"};
			pob["id"]=elem.id;
			pob["poblacio"]=elem.poblacio;
			return pob;
		});
		// console.log(poblacionsTAux);
		poblacionsTable.push({"id":"0","poblacio":""});
		var pobLen = poblacionsTAux.length;
		var i = 0, key = {}, valor = "";
		var poblacionsValors = [];
		for(i=0;i<pobLen;i++) {
			valor = poblacionsTAux[i].poblacio;
			if(poblacionsValors.indexOf(valor) === -1) {
			    poblacionsTable.push(poblacionsTAux[i]);
			    poblacionsValors.push(valor);
			}
			// console.log(valor);
		}
		$scope.poblacions = poblacionsTable;
	})
	.error(function(data) {
		console.log('Error: ' + json_data);
	});

	// Carregar la pantalla seleccionada.
	// titol -> Text a carregar com a títol de pantalla.
	// id -> numero identificador de pantalla
	$scope.pantalla=function(titol,id) {
		$scope.titolVista=titolsLlista[id];
		$scope.vista=titol;
		if(titol=="nou") {
			$scope.saveOrUpdate = "save";
		}
	}
	
	// Funció per a seleccionar festival del llistat
	$scope.selectFestival = function(festival) {
		$scope.detailFestival = festival;
		$scope.selected = true;
		console.log($scope.detailFestival, $scope.selected);
	};
	
	// Funció que mostra totes les dades d'un festival seleccionat en un formulari editable.
	$scope.detallFestival = function(festival) {
		$scope.newFestival = $scope.detailFestival;
		$scope.selected = true;
		$scope.saveOrUpdate = "update";
		$scope.vista = 'nou';
		$scope.titolVista = "Editar festival";

		// Convertir data en el format que exigeixen els formularis HTML (yyyy-MM-dd).
		// Atenció, que Javascript compta els mesos des de 0 (January - 0, February - 1, etc)
		console.log("$scope.detailFestival.dataInici"+$scope.detailFestival.dataInici);
		console.log("$scope.detailFestival.dataFi"+$scope.detailFestival.dataFi);
		var partsI =$scope.detailFestival.dataInici.split('/');
		var dataI = partsI[2]+'-'+partsI[1]+'-'+partsI[0];
		var partsF =$scope.detailFestival.dataFi.split('/');
		var dataF = partsI[2]+'-'+partsI[1]+'-'+partsI[0];
		$scope.newFestival.dataInici=dataI;
		$scope.newFestival.dataFi=dataF;
		console.log("$scope.newFestival.dataInici"+$scope.newFestival.dataInici);
	};
	
	// Función para editar los datos de un festival.
	$scope.editarFestival = function(newFestival) {
		console.log("Editant Festival"+$scope.newFestival.dataInici);
		$scope.newFestival=saveDatesFestival($scope.newFestival,$scope.newFestival.dataInici,$scope.newFestival.dataFi);

		$http.put('/api/festivals/' + $scope.newFestival.id, $scope.newFestival)
		.success(function(data) {		
			console.log("editarFestival-success");
			resetFestivalForm();
		})
		.error(function(data) {
			console.log('Error al editar festival: ' + data);
		});
	};

	// Función para eliminar los datos de un festival.
	$scope.anularFestival = function(newFestival) {
		console.log("Anular Festival "+$scope.newFestival.id);
		var resposta = confirm("Segur que vols anular el festival ? Ja ho has comunicat a tots els assistents ? ");
		if(resposta == true) {
			$http.delete('/api/festivals/' + $scope.newFestival.id, $scope.newFestival)
			.success(function(data) {		
				console.log("anularFestival-success");
				resetFestivalForm();
			})
			.error(function(data) {
				console.log('Error al eliminar festival: ' + data);
			});
		}
	};
	
	// Funció que crea un nou festival a partir de les dades omplertes al formulari.
	$scope.crearFestival = function() {
		console.log("Creant Festival"+$scope.newFestival.dataInici);
		$scope.newFestival=saveDatesFestival($scope.newFestival,$scope.newFestival.dataInici,$scope.newFestival.dataFi);
		$http.post('/api/festivals',$scope.newFestival)
		.success(function(data) {
			console.log("crearFestival-success");
			// Esborrem les dades del formulari i tornem a la vista de llista de concerts.
			/* $scope.newFestival = {};
			$scope.vista = 'llista';
			$scope.titolVista = "Llista de concerts";			
			$scope.festivals = data; */
			resetFestivalForm();
		})
		.error(function(data) {
			console.log('Error al crear festival: ' + data);
		});
	};
	
	// Función per a filtrar els festivals por criteris:
	// 1. Per població
	// filtreFestival.poblacio
	// 2. Agafar només els gratuïts.
	// filtreFestival.gratuits
	// 3. Només els que encara no han començat.
	// filtreFestival.gratuits
	$scope.filterFestival = function(filtreFestival) {
		// alert("Filtre de festivals disponible pròximament.");
		console.log("filtreFestival?Gratuïts="
			+filtreFestival.gratuits+";Població="+filtreFestival.poblacio+
			";Data Inici="+filtreFestival.dataInici);
		// Conversió data del formulari del filtre.
		// Atenció, que Javascript compta els mesos des de 0 (January - 0, February - 1, etc)
		var filterData = true;
		var criteriData = '';
		console.log("filtreFestival.dataInici="+filtreFestival.dataInici);
		if(filtreFestival.dataInici!="") {
			var dataTextFiltre = filtreFestival.dataInici.split('-');
			criteriData = new Date(dataTextFiltre[0],dataTextFiltre[1]-1,dataTextFiltre[2]);
		}
		var poblacio = $scope.poblacions[filtreFestival.poblacio].poblacio;

		$scope.festivalsCons=$scope.festivalsInici.filter(function (elem) {
			// Conversió data de la base de dades.
			// Atenció, que Javascript compta els mesos des de 0 (January - 0, February - 1, etc)
			if(criteriData!='') {
				var parts =elem.dataInici.split('/');
				var data = new Date(parts[2],parts[1]-1,parts[0]);
				/* Debug: 
				console.log("dataConcert en TXT="+elem.dataInici);
				console.log("dataConcert="+data);
				console.log("dataFiltre="+criteriData); */
				filterData = data > criteriData; 
			}
			console.log("filterData?"+filterData);
			var filterPoblacio = filtreFestival.poblacio == 0 ? 
				true : elem.poblacio == poblacio;
			var filterGratuits = filtreFestival.gratuits == true ? 
				elem.preuGratuit == true :
				elem.preuGratuit == true || elem.preuGratuit == false ;
			// console.log(filterPoblacio + " " + filterGratuits);
			return filterData && filterPoblacio && filterGratuits;
		});
		// Reiniciar la paginació amb la nova cerca.
		$scope.paginaActual=0;
		seguentPaginaFestivals();
	};

	$scope.mesFestivals = function() {
		seguentPaginaFestivals();
	};

	// Esborrem les dades del formulari per crear/editar/anular festivals i tornem a la vista de la llista.
	function resetFestivalForm() {
		$scope.newFestival = {};
		$scope.vista = 'llista';
		$scope.titolVista = "Llista de concerts";			
		// $scope.festivals = data;
	}

	// Funcions pel tractament de dates (proximament)

	// De format yyyy-MM-dd a dd/MM/yyyy
	/* function dateFormToReg(date) {
		var dataTextFiltre = filtreFestival.dataInici.split('-');
		var dateReg = new Date(dataTextFiltre[0],dataTextFiltre[1]-1,dataTextFiltre[2]);
		return criteriData;
	}
	// De format dd/MM/yyyy a yyyy-MM-dd
	function dateRegToForm(date) {
		return '';
	} */

	function saveDatesFestival(newFestival,dateI,dateF) {
		newFestival.dataInici = saveDateFestival(dateI);
		newFestival.dataFi = saveDateFestival(dateF);
		return newFestival;
	}

	// Tractar '0' sobrants (hour < 10) ? '0' + hour: hour) + ':'
	function saveDateFestival(date) {
		var filteredDate = date.split('-');
		console.log(filteredDate);
		/* var day = parseInt(filteredDate[2])>10?filteredDate[2]:'0'+filteredDate[2];
		console.log(day); */
		/* var month1 = parseInt(filteredDate[1])++;
		console.log(month1); */
		// var month =  parseInt(filteredDate[1])>10?parseInt(filteredDate[1]):'0'+parseInt(filteredDate[1]);
		var newDate = filteredDate[2]+"/"+(filteredDate[1])+"/"+filteredDate[0];
		return newDate;
	}
	
	// Anem mostrant els registres al llistat; pàgina en pagina.
	function seguentPaginaFestivals() {
		$scope.paginaActual++;
		var pagFinal = $scope.paginaActual * $scope.numRegsPagina;
		$scope.festivals = $scope.festivalsCons.slice(0,pagFinal);
		// console.log("ELEMS??"+$scope.festivals[0])
	} 
}