/*
---
name: Simple.Window
description: Base Window Class
requires: []
provides: Simple.Window
...
*/
Simple = window.Simple || {};

Simple.Window = new Class({
	
	Extends: ART.Widget,

	name: 'window',
	
	options: { 

		caption: '',
		autosize: false,

		min: {/* height: null, width: null */},
		max: {/* height: null, width: null */},
		close: true,
		help: false, // help is a function: eg: function(){ console.log('help!'); },
		link: false, //like help, this is a function
		minimize: false,
		maximize: false,
		resizable: false,
		draggable: false,
		shadow: Browser.Engine.webkit,
		cascaded: false,
		buttonSide: 'left'
	},

	initialize: function(options){
		this.parent(options);
		this.element.addClass('art-window');
		document.id(this).store('art-window', this);
		this._build();
	},

	_build: function(){
		var self = this;
		var relative = {
			position: 'relative', 
			top: 0, 
			left: 0
		};
		var absolute = {
			position: 'absolute', 
			top: 0, 
			left: 0
		};

		// create containers for the header, content, and footer
		this.contents = new Element('div').inject(this.element);

		this.header = new Element('div', {
			'class': 'art-window-header',
			styles: $merge(relative, {
				top: 1,
				left: 1,
				overflow: 'hidden',
				zIndex: 1
			})
		});
		this.content = new Element('div', {
			'class': 'art-window-content',
			styles: $merge(relative, {
				overflow: 'auto',
				position: 'relative'
			})
		});
		this.footer = new Element('div', {
			'class': 'art-window-footer',
			styles: $merge(relative, {
				top: 1,
				left: 1,
				overflow: 'hidden',
				clear: 'both'
			})
		});
		this.footerText = new Element('div', {
			'class': 'footer-text'
		}).inject(this.footer);
		this.makeButtons();
		this.contents.adopt(this.header, this.content, this.footer);
	},
	
	fill: function(layer, style){
	},

	//create ART.Button instances for close, maximize, minimize, and help
	makeButtons: function() {
	},

	maximize: function(){
	},

	minimize: function(){
	},

	_minMaxState: {
		// minimize: false,
		// maximize: false,
		// actualState: null
	},

	_resetMinMaxState: function(){
		delete this._minMaxState.minimize;
		delete this._minMaxState.maximize;
		delete this._minMaxState.actualState;
	},

	//minimize/maximize a window; call minimize/maximize methods instead
	minMax: function(operation){
	},

	getMinMaxAction: function(operation){
	},

	//create resize handle and make the window instance resizable.
	makeResizeable: function(){
	},

	makeDraggable: function(){
	},

	//sets the content area of the window to the given element, elements, or html string
	setContent: function(content){
		if (document.id(content) || $type(content) == "array") this.content.adopt(content);
		else if ($type(content) == "string") this.content.set('html', content);
		if (this.options.autosize && !this.getState('hidden')) this.autosize();
		return this;
	},
	
	show: function(){
		var ret = this.parent.apply(this, arguments);
		if (this.options.autosize) this.autosize();
		return ret;
	},
	
	//resizes the window to match the contents of the window
	autosize: function(){
	},
	
	//sets the caption for the window
	setCaption: function(text){
	},

	//sets the footer text for the window
	setFooter: function(text) {
	},

	makeIframeShim: function(){
		return this.parent(this.contents);
	},

	// returns the current size of the instance
	getSize: function(){
		return {
			width: this.currentWidth,
			height: this.currentHeight
		};
	},

	//gets the min/max potential sizes for the instance
	getSizeRange: function(override){
		var ret = {};
		return ret;
	},

	//redraws the instance
	draw: function(newSheet){
		//render the content, header, and resize
		this.renderContent();
		this.renderHeaderText();
		this.renderResize();
		document.id(this.canvas).setStyles({top: -1, left: -1});
		if (this.shim) this.shim.position();
	},
	
	contentSize: {},
	
	//renders the content area
	//pulls values from the ART.Sheet for window
	renderContent: function(){
			/*
			this.contents.setStyle('display', 'block');
			this.content.setStyles({
				'top': 1,
				'left': 0,
				'height': this.contentSize.y,
				'width': this.contentSize.x,
				'display': 'block'
			});
	*/
	},

	//renders the resize handle
	renderResize: function(){
	},
	
	//renders the header text layer
	renderHeaderText: function(){
	},
	
	//creates the header text layer
	makeHeaderText: function(text, nrd){
	}

});

//adds getWindow and getWindowElement to the windowTools mixin for classes
ART.WindowTools = new Class({

	getWindow: function(){
		var win = this.getWindowElement();
		if (!win) return null;
		return win.get('widget');
	},

	getWindowElement: function(){
		return document.id(this).hasClass('art-window') ? document.id(this) : document.id(this).getParent('.art-window');
	}

});

/* 
TODO
 * header can overlap buttons
 * drag options, resize options; touch doesn't have the same features...
*/
