/*
---
description: Sets up all inputs with the css class .overtext to have an OverText instance for inline labeling. This is a global filter
provides: [Behavior.OverText]
requires: [/Behavior, More/OverText]
script: Behavior.OverText.js
...
*/

Behavior.addGlobalFilter('OverText', function(element, methods){
	//create the overtext instance
	var ot = new OverText(element);
	element.get('class').split(' ').each(function(cls) {
		if (cls) ot.text.addClass('OverText-'+cls);
	});
	element.getDataFilters().each(function(filter){
		if (filter != "OverText") ot.text.addClass('OverText-'+filter);
	});

	//this method updates the text position with a slight delay
	var updater = function(){
		ot.reposition.delay(10, ot);
	};

	//update the position whenever the behavior element is shown
	methods.addEvent('show', updater);

	this.markForCleanup(element, function(){
		methods.removeEvent('show', updater);
		ot.destroy();
	});

});
