MapeiaDF.Facebook = function(params) {
	this.params = params;
	this._init();
}

MapeiaDF.Facebook.prototype = {
	
	loggedUser: null,
	loggedIn: false,
	
	_init: function() {
		this._isLoggedIn();
	},
	
	withLoggedUser: function(callback) {
		var self = this;
		
		if (self.loggedIn) {
			self._getLoggedUser(callback);
		} else {
			self._login(callback);
		}
	},
	
	_getLoggedUser: function(callback) {
		var self = this;
		
		if (self.loggedUser) {
			callback(self.loggedUser);
		} else {
			self._updateUserInfo(callback);
		}
	},
	
	_updateUserInfo: function(callback) {
		var self = this;
		
		FB.api('/me', 
			{fields:"id,name,first_name,picture"},
			function(response) {
				console.log(response);
				self.loggedUser = response;
				self._getLoggedUser(callback);
			}
		);
	},
	
	_isLoggedIn: function() {
		var self = this;
		
		if (!self.loggedIn) {
			FB.getLoginStatus(function(response) {
				if (response.status == 'connected') {
					self.loggedIn = true;
				} else {
					self.loggedIn = false;
				}
			});
		}
	},
	
	_login: function(callback) {
		var self = this;
		
		FB.login(function(response) {
			if (response.status == 'connected') {
				self.loggedIn = true;
				self.withLoggedUser(callback);
				
			} else {
				self.loggedIn = false;
				alert("Você deve se conectar com o Facebook!");
			}
		}, { scope: 'email' });
	}
	
}