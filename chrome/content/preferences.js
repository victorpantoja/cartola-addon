

const CartolaPreference = {


  onAddAccount: function() {
		var msg = 'Slug'
	    var user = {value: ""};
	    if (!this.promptPasswordDialog(user, msg)) return;
	    
	    var list = this.$("accounts");
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
	    
	    //this.util.pref().setCharPref("currentUser", user.value);
	    //this.updateButtonState();
	    this.showMessage('Usuário adicionado: '+user.value);
	    //this.accountChanged = true;
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
  
  showMessage: function(msg) {
	    var n = this.$("notification");
	    n.appendNotification(msg, msg); 
	    var obj = this;
	    clearTimeout(this.timer);
	    this.timer = setTimeout(obj.hideMessage, 3000, n);
	  },
	  
  $: function(id) {
	    return document.getElementById(id);
	  },
};
