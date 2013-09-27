$(function() {
	Mobee.Db.countPositions(".quantidade");
	
	$("#marcar-ponto").click(function(e) {
		e.preventDefault();
		Mobee.Gps.verifyGPS();
		Mobee.Gps.markPosition = true;
		Mobee.Gps.markPositionTimestamp = new Date().getTime();
	});
	
	$("#sincronizar").click(function(e) {
		e.preventDefault();
		
		if (navigator.onLine) {
			Mobee.Fb.withLoggedUser(function(user) {
				Mobee.Api.sendResults(user.id);
			});
		} else {
			alert("Conecte-se à internet para Enviar seus Pontos!");
		}
	});
	
	$("#onibus-aqui").click(function(e) {
		window.location.href = "stops.html";
	});
});