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
		stopsAroundEndPoint: "/stops/stops_around"
	});
});