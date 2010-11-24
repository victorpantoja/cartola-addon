

const CartolaPreference = {
		
  util: new Utils("cartolanotifier"),
		
  onLoad: function() {
	this.buildUserList();
  },

  onAddAccount: function() {
		var msg = 'Slug'
	    var user = {value: ""};
	    if (!this.promptPasswordDialog(user, msg)) return;
	    
	    var list = this.util.$("accounts");
	    for (var i = 0; i < list.itemCount; ++i) {
	      if (list.getItemAtIndex(i).value == user.value) {
	        //var err = this.strings.getFormattedString("AccountAlreadyExist", [user.value]);
	    	var err = 'Conta existente: '+user.value;
	        alert(err);
	        return;
	      }
	    }
	    var item = list.appendItem(user.value, user.value);
	    list.selectItem(item);
	    
	    this.util.pref().setCharPref("currentUser", user.value);
	    //this.updateButtonState();
	    this.showMessage('Usuário adicionado: '+user.value);
	    this.accountChanged = true;
  },
  
  promptPasswordDialog: function(user, msg) {

	    var prompt = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
	    while (1) {
	      var result = prompt.prompt(window, "Cartola FC", msg, user, "", {value:false});
	      if (!result) return false;
	      if (user.value) return true;
	    }
	    return true;
  },
  
  buildUserList: function() {
	    this.accounts = this.util.getPassword();
	    var list = this.util.$("accounts");
	    while (list.firstChild) list.removeChild(menu.firstChild);

	    if (this.accounts == null) {
	        this.updateButtonState();
	        return;
	      }
	    
	    var currentUser = this.util.pref().getCharPref("currentUser");
	    if (!this.accounts[currentUser]) {
	      currentUser = "";
	    }

	    for (var user in this.accounts) {
	      if (this.accounts.hasOwnProperty(user)) {
	        var item = list.appendItem(user, user);
	      }
	    }
	    
	    this.updateButtonState();
	  },
  
  showMessage: function(msg) {
	    var n = this.util.$("notification");
	    n.appendNotification(msg, msg); 
	    var self = this;
	    clearTimeout(this.timer);
	    this.timer = setTimeout(self.hideMessage, 2000, n);
	  },
	
	  hideMessage: function(notification) {
		    notification.removeAllNotifications(false);
	},
	
	  updateButtonState: function() {

	    var list = this.util.$("accounts");
	    if (list.itemCount && list.selectedIndex >= 0) {
	        this.util.$("remove-account-button").disabled = false;
	        this.util.$("edit-account-button").disabled = false;
	    }
	    else {
	      this.util.$("remove-account-button").disabled = true;
	      this.util.$("edit-account-button").disabled = true;
	    }

	  }
};
