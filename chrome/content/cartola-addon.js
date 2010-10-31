
function CartolaNotifier() {

}

CartolaNotifier.prototype = {
		load: function() {
			const URL_API_MERCADO_STATUS = "http://api.cartola.globo.com/mercado/status.json"
    		var req = new XMLHttpRequest;
			req.open('POST', URL_API_MERCADO_STATUS, true);
			
			var self = this;

			req.onload  = function() {self.onSuccess(req)};
		    req.onerror = function() {self.onError()};
		    req.send(null);

		},
		
		onSuccess: function(req){
			//alert('Status: '+req.status+', Response: '+ req.responseText);
			//return false;
			var JSON = this.Cc["@mozilla.org/dom/json;1"].createInstance(this.Ci.nsIJSON);
			var data = JSON.decode(req.responseText);
			
			this.updateTooltip();
			//$("twitternotifier-last-update").innerHTML('teste');
			//alert(data['mercado']['status']);
		},
		
		onError: function(){
			//TODO
			alert('API Indisponível!');
		},
		
		updateTooltip: function() {
			var elem = this.$("twitternotifier-last-update");
			var d = new Date();
			var h = d.getHours();
			if (h < 10) h = '0' + h;
			var m = d.getMinutes();
			if (m < 10) m = '0' + m;
			elem.value = "Útima Atualização: " + h + ":" + m
		},
		
		Cc: this.Components.classes,
		Ci: this.Components.interfaces,
		
		$: function(name) {
			return document.getElementById(name);
		}

};


//
//Create instance and add event listener.
//
var cartolaNotifier = new CartolaNotifier();

window.addEventListener("load",   function(e) { cartolaNotifier.load(e);   }, false);
//window.addEventListener("unload", function(e) { cartolaNotifier.unload(e); }, false);
//window.addEventListener("focus",  function(e) { cartolaNotifier.focus(e);  }, true);
//window.addEventListener("blur",   function(e) { cartolaNotifier.blur(e);   }, true);