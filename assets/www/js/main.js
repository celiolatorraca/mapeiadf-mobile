$(function() {
	MapeiaDF.Gps = new MapeiaDF.GPS({selector: "#geolocation"});
	MapeiaDF.Db = new MapeiaDF.Database({
		dbName: "mapeia-df",
		dbVersion: "1.0",
		dbDescription: "Mapeia DF - DB",
		dbSize: 1000000
	});
	
	$("#marcar-ponto").click(function(e) {
		e.preventDefault();
		MapeiaDF.Gps.verifyGPS();
		
		MapeiaDF.Gps.markPosition = true;
		MapeiaDF.Gps.markPositionTimestamp = new Date().getTime();
	});
	
	$("#sincronizar").click(function(e) {
		e.preventDefault();
		
		if (navigator.onLine) {
			MapeiaDF.Gps.sendResults();
		} else {
			alert("Conecte-se à internet para Enviar seus Pontos!");
		}
	});
	
	MapeiaDF.Db.countPositions(".quantidade");
});