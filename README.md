Festivals.js
============

Festivals.js és un prototpip d'aplicació que he creat com a projecte de final del Màster d'Enginyeria Informàtica de la UOC.

Consisteix en crear i desenvolupar l'arquitectura d'una aplicació web per trobar gent amb qui gaudir de concerts

Allotjat a:
https://festivals-js.herokuapp.com/

La memòria es pot trobar al repositori de la UOC:
http://openaccess.uoc.edu/webapps/o2/handle/10609/59466

### Versió actual: alpha-2. Gener 2017.

### Futures versions:

Falten dues grans millores a l'arquitectura per a que l'aplicació sigui útil.
1. Gestionar les dades en una base de dades NoSQL com MongoDB; en comptes de fitxers JSON.
2. Autenticació i gestió de permisos pels usuaris.

### Les tecnologies usades són:
* Llenguatge Javascript i objectes JSON pel tractament de les dades.
* Node.js i Express.js al costat del servidor.
* HTML5, Angular i Bootsrap al costat del client.

### Històries d'usuari implementades.

#### Versió alpha2 (gener 2017)
Les noves històries d'ús que s'han completat en aquesta fase són aquestes,
que tenen una prioritat alta (entre 70 i 90):
* HU5 Fins i tot, anul•lar un concert abans que comenci.
* HU8 Vull trobar festivals a la localitat que indiqui
* HU9 Vull filtrar els festivals que siguin gratuïts.
* HU16 Obtenir el llistat de concerts paginat si és llarg (pex de 10 en 10)

#### Versió alpha1 (desembre 2016)
S'han afegit les les 4 primeres funcionalitats, que tenen una prioritat màxima (100); que són:
* HU1. Com a visitant vull veure en que consisteix la pagina, qui l'esta fent, novetats,…
* HU2. Com a visitant vull veure un llistat de tots els pròxims concerts ordenats per data
* HU3. Com a visitant/usuari vull crear una trobada a un concert
* HU4. I vull poder editar l'event abans que comenci

### Bugs i millores.

Per a gestionar els bugs i millores (usabilitat,evolutius) uso el gestor d'incidències de GitHub:
https://github.com/mamorosdev/festivals-js-alpha2/issues 

