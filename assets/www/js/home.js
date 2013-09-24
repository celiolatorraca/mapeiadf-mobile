$(function() {
	MapeiaDF.Db.countPositions(".quantidade");
	
	$("#marcar-ponto").click(function(e) {
		e.preventDefault();
		MapeiaDF.Gps.verifyGPS();
		MapeiaDF.Gps.markPosition = true;
		MapeiaDF.Gps.markPositionTimestamp = new Date().getTime();
	});
	
	$("#sincronizar").click(function(e) {
		e.preventDefault();
		
		if (navigator.onLine) {
			MapeiaDF.Fb.withLoggedUser(function(user) {
				MapeiaDF.Api.sendResults(user.id);
			});
		} else {
			alert("Conecte-se à internet para Enviar seus Pontos!");
		}
	});
	
	$("#onibus-aqui").click(function(e) {
		window.location.href = "stops.html";
	});
});