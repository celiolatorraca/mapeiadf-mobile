var markPosition = false;
var markPositionTimestamp = null;
var lastPosition = null;

function verifyGPS() {
	gpsDetect = cordova.require('cordova/plugin/gpsDetectionPlugin');
	gpsDetect.checkGPS(function(on) {
		if (!on) {
			alert("É preciso ligar seu GPS :)");
		}
	}, onGPSError);
}

function watchPosition(elementSelector) {
	var options = {enableHighAccuracy: true, maximumAge: 15000, timeout: 300000};
	navigator.geolocation.watchPosition(function(position) {
		var element = $(elementSelector);
		element.html('Latitude: '           	   + position.coords.latitude              + '<br />' +
	    		     'Longitude: '          + position.coords.longitude             + '<br />' +
	            	 'Altitude: '           + position.coords.altitude              + '<br />' +
	                 'Accuracy: '           + position.coords.accuracy              + '<br />' +
	                 'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
	                 'Heading: '            + position.coords.heading               + '<br />' +
	                 'Speed: '              + position.coords.speed                 + '<br />' +
	                 'Timestamp: '          + position.timestamp          		   + '<br />');
		
		if (markPosition) {
			markPosition = false;
			
			if (lastPosition == null || (position.timestamp - markPositionTimestamp) < (markPositionTimestamp - lastPosition.timestamp)) {
				savePosition(position.coords.latitude, position.coords.longitude);
			} else {
				savePosition(lastPosition.coords.latitude, lastPosition.coords.longitude);
			}
		}
		
		lastPosition = position;
		
	}, onError, options);
}

function showResults() {
	getDatabase().transaction(function(tx) {
		tx.executeSql('SELECT * FROM MAPEIA_DF', [], function(tx, results) {
			alert("Returned rows = " + results.rows.length);
		    
		    var len = results.rows.length;
		    for (var i = 0; i < len; i++){
		        alert("Row = " + i + " ID = " + results.rows.item(i).id + " Latitude =  " + results.rows.item(i).latitude + " Longitude =  " + results.rows.item(i).longitude);
		    }
		}, errorCB);
	}, errorCB);
}

function onGPSError(e) {
    alert("Error: "+e);
}

function onError(error) {
	alert('code: '    + error.code    + '\n' +
		  'message: ' + error.message + '\n');
}