//FB.Event.subscribe('auth.login', function(response) {
//	if (response.error) {
//		console.log(JSON.stringify(response.error));
//	} else {
//		console.log(JSON.stringify(response.data));
//	}
//	alert('auth.login event');
//});
//FB.Event.subscribe('auth.logout', function(response) {
//	alert('auth.logout event');
//});
//FB.Event.subscribe('auth.sessionChange', function(response) {
//	alert('auth.sessionChange event');
//});
//FB.Event.subscribe('auth.statusChange', function(response) {
//	alert('auth.statusChange event');
//});

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	FB.init({ appId: "119817438197601", nativeInterface: CDV.FB, useCachedDialogs: false });
	MapeiaDF.Fb = new MapeiaDF.Facebook();
}

$(function() {
	MapeiaDF.Gps = new MapeiaDF.GPS({
		options: {
			enableHighAccuracy: true,
			maximumAge: 15000,
			timeout: 300000
		}
	});
	MapeiaDF.Db = new MapeiaDF.Database({
		dbName: "mapeia-df",
		dbVersion: "1.0",
		dbDescription: "Mapeia DF - DB",
		dbSize: 1000000
	});
	MapeiaDF.Api = new MapeiaDF.API({
		baseEndPoint: "http://mapeiadf.com.br/api",
		syncEndPoint: "/stops/sync",
	});
	
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
});