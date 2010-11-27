

const CartolaPreference = {
		
  util: new Utils("cartolanotifier"),
		
  onLoad: function() {
	this.buildUserList();
  },

  onAddAccount: function() {
		var msg = 'Slug do seu time';
	    var user = {value: ""};
	    if (!this.promptUserDialog(user, msg)) return;
	    
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
	    this.updateButtonState();
	    this.showMessage('Usuário adicionado: '+user.value);
	    this.accountChanged = true;
  },
  
  onEditAccount: function() {

	    var list = this.util.$("accounts");
	    var username = this.util.pref().getCharPref("currentUser");
	    var msg = "Editar conta: " + username;

	    var user = {value: username};

	    if (!this.promptUserDialog(user, msg)) return;

	    this.util.pref().setCharPref("currentUser", user.value);
	    this.showMessage('Usuário alterado: '+user.value);
		this.buildUserList();
	  },
	  
  onRemoveAccount: function() {
	    var prompt = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
	    var list = this.util.$("accounts");
	    var user = this.util.pref().getCharPref("currentUser");
	    var msg = "Excluir o usuário "+user+"?";
	    var result = prompt.confirm(window, "Cartola FC", msg);
	    if (!result) return;

	    list.removeItemAt(list.selectedIndex);
	    this.util.pref().setCharPref("currentUser", "");
	    this.updateButtonState();
	    this.showMessage("Usuário Removido");
	  },
  
  promptUserDialog: function(user, msg) {

	    var prompt = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
	    while (1) {
	      var result = prompt.prompt(window, "Cartola FC", msg, user, "", {value:false});
	      if (!result) return false;
	      if (user.value) return true;
	    }
	    return true;
  },
  
  onSelectAccount: function() {
	    var list = this.util.$("accounts");
	    try {
	      var username = list.selectedItem.value;
	    }
	    catch (e) {
	      return;
	    }
	    if (username == null) return;

	    this.updateButtonState();
	  },
  
  buildUserList: function() {
		var list = this.util.$("accounts");
		while (list.firstChild) list.removeChild(list.firstChild);
	    var currentUser = this.util.pref().getCharPref("currentUser");
	    
	    if(currentUser!="")
	    	list.appendItem(currentUser);
		  
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
