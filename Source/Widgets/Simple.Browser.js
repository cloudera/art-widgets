/*
---
name: Simple.Browser
description: A window with navigation controls.
requires: [Simple.Window, Simple.History]
provides: Simple.Browser
...
*/

Simple.Browser = new Class({

	Extends: Simple.Window,

	options: {
		className: 'art browser',
		historyOptions: {
			editable: false
		}
	},

	_build: function(){
		this.parent.apply(this, arguments);
		var styles = this.getSheet();
		this.history = new Simple.History(
			$merge(this.options.historyOptions, {})
		);
		this.showHistory();
	},

	hideHistory: function(){
		if (this._historyHidden) return;
		this.history.eject();
		this._historyHidden = true;
	},

	showHistory: function(){
		if (this._historyHidden === false) return;
		this.history.inject(this, this.header);
		this.fireEvent('injectHistory');
		this._historyHidden = false;
	}
});

ART.WindowTools.implement({

	getHistory: function() {
		return this.getWindow().history;
	}

});
