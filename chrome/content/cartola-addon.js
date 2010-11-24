
function CartolaNotifier() {
	//this._util = new naanExUtils("cartola-addon");
	this._window = this.$("twitternotifier-main-window");
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
		const URL_API_MERCADO_STATUS = "http://api.cartola.globo.com/mercado/status.json";
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
	
		var statuses = ['','Mercado Aberto','Mercado Fechado','Mercado Em Atualização','Mercado Em Manutenção','Mercado Liberado para Testes','Game Over'];
	
		var tooltipStatus = this.$("cartolanotifier-tooltip-status");
		tooltipStatus.value = statuses[status];
	
		var tooltipRodada = this.$("cartolanotifier-tooltip-rodada");
		tooltipRodada.value = "Rodada: "+rodada;
	
		var tooltipAbertura = this.$("cartolanotifier-tooltip-abertura");
	
		if(status=='6'){
			tooltipAbertura.value = "Fim de Jogo. Até a próxima temporada!";
		}
		else
		{
			if(status=='1'){
				tooltipAbertura.value = "Mercado Fecha em: "+this.getDataFechamento(data['mercado']['fechamento']);
			}
			else{
				tooltipAbertura.value = "Mercado Abrirá em Breve. Aguarde!";
			}
		}
	},
	
	getDataFechamento:function(date) {
		var day = date['dia'];
		if (day < 10) day = '0'+day;
	
		var month = date['mes'];
		if (month < 10) month = '0'+month;
	
		var hour = date['hora'];
		var minute = date['minuto'];
		if (minute < 10) minute = '0'+minute;

	
		return day+"/"+month+" às "+hour+"h"+minute+"m";
	},
	
	onClickStatusbarIcon: function(e) {
		if (e.button == 0) {
			this.onOpenPopup();
		}
	},
	
	onOpenPopup: function() {
	    this._window.windowWidth = "2px";
	    this._window.windowHeight = "6px";
	    
		this._window.show();
		

	    if (navigator.platform.match("Mac")) {
	      this._window.input.style.padding = "0px";
	    }
	    
	    this._window.setActiveTab("oi");
		
	    /*if (this._window.isOpen) {
	        this.closePopup(true);
	      }*/
	},
	
	  closePopup: function() {
		this._window.hide();
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

//Create instance and add event listener.

var cartolaNotifier = new CartolaNotifier();

window.addEventListener("load",   function(e) { cartolaNotifier.load(e);   }, false);
//window.addEventListener("unload", function(e) { cartolaNotifier.unload(e); }, false);
//window.addEventListener("focus",  function(e) { cartolaNotifier.focus(e);  }, true);
//window.addEventListener("blur",   function(e) { cartolaNotifier.blur(e);   }, true);