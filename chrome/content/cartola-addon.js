
function CartolaNotifier() {

}

CartolaNotifier.prototype = {
		load: function() {
			var self = this;
			
			self.updateMercado();
			
			setInterval(function(){
				self.updateMercado();
			}, 60*1000);	
		},
		
		updateMercado:function(){
			const URL_API_MERCADO_STATUS = "http://api.cartola.globo.com/mercado/status.json"
    		var req = new XMLHttpRequest;
			req.open('POST', URL_API_MERCADO_STATUS, true);
			
			var self = this;

			req.onload  = function() {self.onSuccess(req)};
		    req.onerror = function() {self.onError()};
		    req.send(null);
		},
		
		onSuccess: function(req){

			var JSON = this.Cc["@mozilla.org/dom/json;1"].createInstance(this.Ci.nsIJSON);
			var data = JSON.decode(req.responseText);
			
			this.updateTooltipAtualizacao();
			this.updateTooltipMercado(data);
		},
		
		onError: function(){
			//TODO
			alert('API Indisponível!');
		},
		
		updateTooltipAtualizacao: function() {
			var elem = this.$("cartolanotifier-last-update");
			var d = new Date();
			var h = d.getHours();
			if (h < 10) h = '0' + h;
			var m = d.getMinutes();
			if (m < 10) m = '0' + m;
			elem.value = "Útima Atualização: " + h + ":" + m
		},
		
		updateTooltipMercado: function(data) {
			var status = data['mercado']['status'];
			var rodada = data['mercado']['rodada'];

            var statuses = ['','Aberto','Fechado','Em Atualização','Em Manutenção','Liberado para Testes','Game Over'];
			
			var tooltipStatus = this.$("cartolanotifier-tooltip-status");
            tooltipStatus.value = "Mercado " + statuses[status];

			var tooltipRodada = this.$("cartolanotifier-tooltip-rodada");
			tooltipRodada.value = "Rodada: "+rodada;

			var tooltipAbertura = this.$("cartolanotifier-tooltip-abertura");

			if(status=='1'){
				tooltipAbertura.value = "Mercado Fecha em: "+this.getDataFechamento(data['mercado']['fechamento']);
			}
			else{
				tooltipAbertura.value = "Mercado Abrirá em Breve. Aguarde!";
			}
		},
		
		getDataFechamento:function(date) {
			var day = date['dia'];
			if (day < 10) day = '0'+day;
			
			var month = date['mes'];
			if (month < 10) month = '0'+month;

			var hour = date['hora'];
			var minute = date['minuto'];
			
			return day+"/"+month+" às "+hour+"h"+minute+"m";
		},
		
	  openURL: function(url) {
	    var tabbrowser = gBrowser;
	    var tabs = tabbrowser.tabContainer.childNodes;
	    for (var i = 0; i < tabs.length; ++i) {
	      var tab = tabs[i];
	      try {
	        var browser = tabbrowser.getBrowserForTab(tab);
	        if (browser) {
	          var doc = browser.contentDocument;
	          var loc = doc.location.toString();
	          if (loc == url) {
	            gBrowser.selectedTab = tab;
	            return;
	          }
	        }
	      }
	      catch (e) {
	      }
	    }
		    
	    // There is no tab. open new tab...
	    var tab = gBrowser.loadOneTab(url);
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