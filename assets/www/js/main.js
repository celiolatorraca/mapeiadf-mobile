document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("pause", onDevicePaused, false);
document.addEventListener("resume", onDeviceResumed, false);

function onDeviceReady() {
	FB.init({ appId: "119817438197601", nativeInterface: CDV.FB, useCachedDialogs: false });
	Mobee.Fb = new Mobee.Facebook();
}

function onDevicePaused(){
	Mobee.Api.status = Mobee.PAUSED;
}

function onDeviceResumed(){
	Mobee.Api.status = Mobee.RUNNING;
}

$(function() {
	Mobee.Gps = new Mobee.GPS({
		options: {
			enableHighAccuracy: true,
			maximumAge: 15000,
			timeout: 300000
		}
	});
	Mobee.Db = new Mobee.Database({
		dbName: "mapeia-df",
		dbVersion: "1.0",
		dbDescription: "Mapeia DF - DB",
		dbSize: 1000000
	});
	Mobee.Api = new Mobee.API({
		baseEndPoint: "http://www.mapeiadf.com.br/api",
		syncEndPoint: "/stops/sync",
		stopsAroundEndPoint: "/stops/stops_around",
		linesFromPointEndPoint: "/lines/from_point"
	});
});