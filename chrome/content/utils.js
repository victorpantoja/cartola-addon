function Utils(name) {
  this._exname = name;

  this._pref = Components.classes['@mozilla.org/preferences-service;1']
    .getService(Components.interfaces.nsIPrefService).getBranch("extensions." + name + ".");

  this._observer = Components.classes["@mozilla.org/observer-service;1"]
    .getService(Components.interfaces.nsIObserverService);

  this._login = Components.classes["@mozilla.org/login-manager;1"]
    .getService(Components.interfaces.nsILoginManager);
}


Utils.prototype = {

  $: function(id) {
    return document.getElementById(id);
  },

  pref: function () {
    return this._pref;
  },
  
  getPassword: function(path) {

	    if (!path) path = "";

	    var result = [];
	    var n = 0;

	    try {
	      var hostname = "chrome://" + this._exname;
	      var logins = this._login.findLogins({}, hostname, "", null);
	      n = logins.length;

	      for (var i = 0; i < logins.length; ++i) {
	        result[logins[i].username] = logins[i].password;
	      }
	    }
	    catch(e) {
	      this.log("Can't retrieve password by Login Manager:" + e.message);
	      return null;
	    }

	    return (n > 0) ? result : null;
	  }
};