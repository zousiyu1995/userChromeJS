location == "chrome://browser/content/browser.xul" && (function () {
	var contextMenu = document.getElementById("contentAreaContextMenu");
	(function (menuitem) {
		menuitem.id = "context-copygif";
		menuitem.setAttribute("label", "\u590D\u5236GIF");
		menuitem.addEventListener("command", function () {
			var Cc = Components.classes;
			var Ci = Components.interfaces;
			var trans = Cc["@mozilla.org/widget/transferable;1"].createInstance(Ci.nsITransferable);
			var str = Cc["@mozilla.org/supports-string;1"].createInstance(Ci.nsISupportsString);
			var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
			var partialPath = "\\" + (+new Date) + ".gif";
			try {
				var completePath = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getCharPref("browser.cache.disk.parent_directory") + partialPath;
			} catch (e) {
				var completePath = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfLD", Ci.nsILocalFile).path + partialPath;
			}
			//alert(completePath);
			var x = gContextMenu.mediaURL || gContextMenu.linkURL;
            //alert(x);
			file.initWithPath(completePath);
			Cc["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Ci.nsIWebBrowserPersist).saveURI(Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI(x, null, null), null, null, null, null, null, file, null);
			setTimeout(function () {
				str.data = '<img src="file:///' + completePath + '">';
                trans.setTransferData("text/html", str, str.data.length * 2);
                Cc["@mozilla.org/widget/clipboard;1"].createInstance(Ci.nsIClipboard).setData(trans, null, 1);
			}, 200);
		}, false);
	})(contextMenu.insertBefore(document.createElement("menuitem"), document.getElementById("context-copyimage")));
	contextMenu.addEventListener("popupshowing", function () {
		gContextMenu.showItem("context-copygif", gContextMenu.onImage);
	}, false);
})()