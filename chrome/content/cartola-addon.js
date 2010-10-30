cartolaextension.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ cartolaextension.showFirefoxContextMenu(e); }, false);
};

cartolaextension.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-cartolaextension").hidden = gContextMenu.onImage;
};

window.addEventListener("load", cartolaextension.onFirefoxLoad, false);
