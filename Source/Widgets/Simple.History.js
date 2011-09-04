/*
---
name: Simple.History
description: A history component with forward, back, location, and reload buttons.
requires: []
provides: Simple.History
...
*/

Simple.History = new Class({

	Extends: ART.Widget,
	
	name: 'history',
	
	options: {
		/*
		selected: 0,
		onAdd: $empty(item, index),
		onRemove: $empty(item),
		onSelectManual: $empty(path),
		onShowEditor: $empty,
		onHideEditor: $empty,
		onSelect: $empty(item),
		onBack: $empty(item, index),
		onForward: $empty(item, index),
		onRefresh: $empty,
		keyboardOptions: {},
		*/
		makeCanvas: false,
		pathFilter: function(val){ return val;},
		pathBuilder: function(val){ return val; },
		maxToShow: 4,
		editable: false,
		history: [],
		showPath: true,
		renderWhileHidden: true,
		styles: {}
	},
	
	initialize: function(options) {
		this.parent(options);
	},

	history: [],
	
	resize: function(w, force) {
		return this;
	},
	
	_build: function(){
		document.id(this).setStyle('display', 'none');
		var cancel = function(e) {
			e.stopPropagation();
		};
	},
	
	draw: function(newSheet){
		return null;
	},
	
	destroy: function(){
		this.eject();
		this.element.destroy();
		this.fireEvent('destroy');
	},
	
	attach: function(attach) {
		var method = $pick(attach, true) ? 'addEvents' : 'removeEvents';
		this.outClick = this.outClick || function(e){
			if (!this.element.hasChild(e.target) && this.element != e.target) this.hide();
		}.bind(this);
		document.id(document)[method]({
			click: this.outClick
		});
	},
	
	detach: function(){
		this.attach(false);
	},
	
	push: function(item, select, index) {
	},
	
	pop: function(){
	},

	remove: function(item) {
		return this;
	},
	
	select: function(hist, suppressEvent){
	},

	setNavState: function(){
	},

	back: function(e){
		var hist = this.history[this.selected - 1];
		if (hist) {
			this.select(hist);
			this.fireEvent('back');
		}
	},

	next: function(e){
		var hist = this.history[this.selected + 1];
		if (hist) {
			this.select(hist);
			this.fireEvent('forward');
		}
	},

	setEditable: function(editable) {
		this.options.editable = editable;
	},

	setTitle: function(title) {
		this.location_text.set('html', title);
	},
	
	getHistory: function(){
		return this.history;
	},
	
	setHistory: function(arr) {
		this.clear();
		arr.each(function(hist) {
			this.push(hist);
		}, this);
	},
	
	clear: function(){
		this.history.empty();
	},
	
	makeEndSelected: function(){
		this.selected = Math.max(this.history.length - 1, 0);
	},
	
	getSelected: function(){
		return this.history[this.selected];
	}

});
