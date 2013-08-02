//Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	MapeiaDF.Gps = new MapeiaDF.GPS({selector: "#geolocation"});
	MapeiaDF.Db = new MapeiaDF.Database({
		dbName: "mapeia-df",
		dbVersion: "1.0",
		dbDescription: "Mapeia DF - DB",
		dbSize: 1000000
	});
}

$(function() {
	$("#marcar-ponto").click(function(e) {
		e.preventDefault();
		MapeiaDF.Gps.verifyGPS();
		
		MapeiaDF.Gps.markPosition = true;
		MapeiaDF.Gps.markPositionTimestamp = new Date().getTime();
	});
	
	$("#sincronizar").click(function(e) {
		e.preventDefault();
		
		if (navigator.onLine) {
			MapeiaDF.Gps.showResults();
			MapeiaDF.Gps.sendResults();
		} else {
			alert("Conecte-se à internet para Enviar seus Pontos!");
		}
	});
});