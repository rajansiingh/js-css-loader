;(function(window) {
	'use strict';
	LoadFile.prototype.options = {
		wrapper : document.head,
		cssFile : [],
		jsFile : []
	};
	function extend(a, b) {
		for (var key in b ) {
			if (b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function LoadFile(options) {
		var that = this;
		that.options = extend({}, that.options);
		extend(that.options, options);
	}


	LoadFile.prototype._addFile = function(fsrc, ftype) {
		var fileref;
		if ( typeof ftype == "undefined") {
			console.warn("Cannot load file. Please provide file type");
			return;
		} else if (ftype.toLowerCase() == "css" && this._checkFileAlreadyExist()) {
			this.options.cssFile.push(fsrc);
			fileref = document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", fsrc);
			this.options.wrapper.appendChild(fileref);

		} else if (ftype.toLowerCase() == "js" && this._checkFileAlreadyExist()) {
			this.options.jsFile.push(fsrc);
			fileref = document.createElement('script');
			fileref.setAttribute("type", "text/javascript");
			fileref.setAttribute("src", fsrc);
			this.options.wrapper.appendChild(fileref);

		} else {
			console.warn("LoadFile handle" + ftype + "type");
		}
	};

	LoadFile.prototype._checkFileAlreadyExist = function(fileSrc) {
		var filesadded = this.options.cssFile.toString() + this.options.jsFile.toString();
		if (filesadded.indexOf("[" + fileSrc + "]") == -1) {
			return true;
		} else {
			return false;
		}
	};

	LoadFile.prototype._removeFile = function(filename, filetype) {
		filetype = filetype.toLowerCase();
		var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none";
		var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none";

		var prop = filetype + "File", index;

		var allsuspects = document.getElementsByTagName(targetelement);
		for (var i = allsuspects.length; i >= 0; i--) {
			if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1) {
				allsuspects[i].parentNode.removeChild(allsuspects[i]);
				//remove file reference from array
				this._removeRefence(this.options[prop], filename);
			}
		}

	};

	LoadFile.prototype._removeRefence = function(array, fileName) {
		var index = array.indexOf(fileName);
		if (index > -1) {
			array.splice(index, 1);
		}

	};

	LoadFile.prototype._removeAllFiles = function() {
		var self = this;
		while (this.options.cssFile.length !== 0) {
			self._removeFile(this.options.cssFile[0], "css");
		}

		while (this.options.jsFile.length !== 0) {
			self._removeFile(this.options.jsFile[0], "js");
		}
	};

	window.LoadFile = LoadFile;

})(window);
