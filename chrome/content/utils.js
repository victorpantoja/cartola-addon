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
  
  log: function(msg) {
	    if (!this._console) {
	      this._console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
	    }
	    this._console.logStringMessage(msg);
	    dump(msg+"\n");
	  }
};