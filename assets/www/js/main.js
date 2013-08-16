FB.Event.subscribe('auth.login', function(response) {
	if (response.error) {
		console.log(JSON.stringify(response.error));
	} else {
		console.log(JSON.stringify(response.data));
	}
	alert('auth.login event');
});
FB.Event.subscribe('auth.logout', function(response) {
	alert('auth.logout event');
});
FB.Event.subscribe('auth.sessionChange', function(response) {
	alert('auth.sessionChange event');
});
FB.Event.subscribe('auth.statusChange', function(response) {
	alert('auth.statusChange event');
});

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	FB.init({ appId: "119817438197601", nativeInterface: CDV.FB, useCachedDialogs: false });
}

$(function() {
	MapeiaDF.Gps = new MapeiaDF.GPS({selector: "#geolocation"});
	MapeiaDF.Db = new MapeiaDF.Database({
		dbName: "mapeia-df",
		dbVersion: "1.0",
		dbDescription: "Mapeia DF - DB",
		dbSize: 1000000
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
			MapeiaDF.Gps.sendResults();
		} else {
			alert("Conecte-se à internet para Enviar seus Pontos!");
		}
		
//		FB.login(function(response) {
//			console.log(response.status);
//			if (response.session) {
//				alert('logged in');
//			} else {
//				alert('not logged in');
//			}
//		}, { scope: "email" });
//		
//		FB.api('/me', 
//			    {fields:"name,first_name,picture"},
//			    function(response) {
//			      console.log(response);
//			      console.log(name);
//			      console.log(response.first_name);
//			      console.log(response.picture.data.url);
//			  });
	});
});