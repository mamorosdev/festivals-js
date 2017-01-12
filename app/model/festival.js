/* 
Requisits festivals-js
Dades del concert:
Id			Identificador intern únic.
Títol		Un títol atractiu del festival.
Concerts	Camp de text lliure amb la llista de concerts.
Data inici	Data que comença.
Hora inici	Hora que comença. 
Data de fi	Si és un festival de diversos dies és recomanable indicar-ho.
Població	Població on començarà el festival. Camp de text lliure.
Ubicació	Adreça on començarà el festival. Camp de text lliure.
Informació	Camp on inserir un enllaç amb informació oficial del festival/concert.
Descripció 	Camp de text lliure llarg on l'organitzador explica amb més detall on, quan i com trobar-se amb els assistents.
Contacte. 	Camp de text lliure per a què l'organitzador indiqui el mitjà que li va millor per contactar amb els assistents (whatsapp, email, facebook...)
Preu		Camp text lliure on s'indica el preu, si és gratuït o no.
PreuGratuit	Boolea que indica si es un concert gratuït.	
*/
function Concert(json) {
	this.id=json.id;
	this.titol=json.titol;
	this.concerts=json.concerts;
	this.dataInici=json.dataInici;
	this.horaInici=json.horaInici;
	this.dataFi=json.dataFi;
	this.poblacio=json.poblacio;
	this.ubicacio=json.ubicacio;
	this.informacio=json.informacio;
	this.descripcio=json.descripcio;
	this.contacte=json.contacte;
	this.preu=json.preu;
}