ART.ArrowRect = new Class({

	Extends: ART.Shape,
	
	initialize: function(width, height, radius, arrowWidth, arrowHeight, arrowSide, arrowPosition){
		this.parent();
		if (arguments.length >= 2) this.draw.apply(this, arguments);
	},
	
	draw: function(width, height, radius, aw, ah, as, ap){

		var path = new ART.Path;
		
		if (!radius) radius = 0;

		if (typeof radius == 'number') radius = [radius, radius, radius, radius];

		var tl = radius[0], tr = radius[1], br = radius[2], bl = radius[3];

		if (tl < 0) tl = 0;
		if (tr < 0) tr = 0;
		if (bl < 0) bl = 0;
		if (br < 0) br = 0;
		
		var sides = {
			top: Math.abs(width) - (tr + tl),
			right: Math.abs(height) - (tr + br),
			bottom: Math.abs(width) - (br + bl),
			left: Math.abs(height) - (bl + tl)
		};
		
		switch (as){
			case 'top': path.move(0, ah); break;
			case 'left': path.move(ah, 0); break;
		}

		path.move(0, tl);
		
		if (typeof ap == 'string') ap = ((sides[as] - aw) * (ap.toFloat() / 100));
		if (ap < 0) ap = 0;
		else if (ap > sides[as] - aw) ap = sides[as] - aw;
		var ae = sides[as] - ap - aw, aw2 = aw / 2;

		if (width < 0) path.move(width, 0);
		if (height < 0) path.move(0, height);
		
		// top

		if (tl > 0) path.arc(tl, -tl);
		if (as == 'top') path.line(ap, 0).line(aw2, -ah).line(aw2, ah).line(ae, 0);
		else path.line(sides.top, 0);
		
		// right

		if (tr > 0) path.arc(tr, tr);
		if (as == 'right') path.line(0, ap).line(ah, aw2).line(-ah, aw2).line(0, ae);
		else path.line(0, sides.right);
		
		// bottom

		if (br > 0) path.arc(-br, br);
		if (as == 'bottom') path.line(-ap, 0).line(-aw2, ah).line(-aw2, -ah).line(-ae, 0);
		else path.line(-sides.bottom, 0);
		
		// left

		if (bl > 0) path.arc(-bl, -bl);
		if (as == 'left') path.line(0, -ap).line(-ah, -aw2).line(ah, -aw2).line(0, -ae);
		else path.line(0, -sides.left);

		return this.parent(path);
	}

});
