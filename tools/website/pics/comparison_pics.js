(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.glass = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#0066FF").ss(3,1,1).p("AC0lrQAAAEgDAEQgJAOgpALQgaAHggAEQggAEglAAIAAAAQgGAAgGAAQghgBgdgDQgdgEgYgHQgpgLgJgOQgDgEAAgEQAAgUA1gOQA1gOBKAAQBKAAA1AOQA1AOAAAUgAC7ljQADAfAAAhQAACPg4BmQg3BlhPAAQgDAAgDAAQhKgEg1hhQg4hmAAiPQAAghADgfAABFMQA8AAAqAMQAqALAAARQAAAQgqAMQgqAMg8AAQg7AAgqgMQgqgMAAgQQAAgRAqgLQAqgMA7AAgAgGA3IAHEV");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhkGQQgqgMAAgQQAAgRAqgLQAqgMA7AAQA8AAAqAMQAqALAAARQAAAQgqAMQgqAMg8AAQg7AAgqgMgAgGA3QhKgEg1hhQg4hmAAiPQABghADgfQAJAOArAMQAbAGAgAEQgcgEgZgGQgpgMgIgOQgDgDgBgFQAAgUA1gOQA1gOBKAAQBKAAA1AOQA0AOAAAUQAAAFgDADQgJAOgoAMQgbAGgfAEQggAEglAAIAAAAIgMAAQghAAgdgEQAdAEAhAAIAMAAIAAAAQAlAAAggEQAjgDAegHQArgMAJgOQADAfABAhQAACPg4BmQg3BlhPAAIgGAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.glass, new cjs.Rectangle(-20.4,-42.7,40.9,85.4), null);


// stage content:
(lib.comparison_pics = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// client legs
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0066FF").s().p("AboOuQAbh0CAAAIDaA2IAghuQAbh0CBAAIEABBIAAEFIi8gwIgDAMIC/AwIAAEFIgJgDIl+hdIikAxIAohTIhNgUIgtCAIklBhgEgnhgL9QgegIgPgcQgQgbAJgeIBymQQAPhFBLAAIGjBsQAfAIAQAbQAQAbgJAeQgIAegcAQQgcAPgfgIIlShYIhhFVQgIAfgcARQgTALgVAAQgJAAgKgDg");
	this.shape.setTransform(-39.7,266.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(15));

	// client chair
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#0066FF").ss(3,1,1).p("AvzLVIAAGlIC4ADIAAjxIKlB3IAACDIGRAGIAAhtIJKh3IAADsICvACMAAAgkLQnKh/oKGAIAAUJIAAHcIAAESAAgNxIwTicIQTlA");
	this.shape_1.setTransform(215,329.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("ANFSUIAAjsIpJB3IAABtImSgGIAAiDIqlh3IAADxIi4gDIAAmlIQTCcIAAESIAAkSIwTicIQTlAIAA0JQILmAHIB/MAAAAkLgAAgNxIAAncg");
	this.shape_2.setTransform(215,329.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(15));

	// client top and table items
	this.instance = new lib.glass();
	this.instance.parent = this;
	this.instance.setTransform(31.9,254.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#0066FF").ss(3,1,1).p("AGuAAQAACyh+B+Qh+B+iyAAQixAAh+h+Qh+h+AAiyQAAixB+h+QB+h+CxAAQCyAAB+B+QB+B+AACxg");
	this.shape_3.setTransform(245.9,203.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#0066FF").s().p("Ai8MQIoKiMQgigJgSgeQgRgeAJgiQAJgiAfgSQAegQAhAJIHIB6IGgjxQAfgSAiAJQAiAJARAeQARAfgKAhQgIAigeASIndETgAApgyQh9h9AAiyQAAizB9h+QB+h9CygBQCyABB9B9QB+B+AACzQAACyh+B9Qh9B9iyAAQiyAAh+h9g");
	this.shape_4.setTransform(211.4,238.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.instance}]}).wait(15));

	// tables
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#0066FF").ss(3,1,1).p("ADxgxImMgmALBgEIAAkJIWKluMgjBgETI/UF4ALBgEInQgtIgBOSImLAuIAAvmI+mi/IgJkAMAsLAEJEAhLgJ7IAADuI2KGJ");
	this.shape_5.setTransform(53.4,344.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AibhXI+mi/IgJkAMAsLAEJIAAEJInQgtImMgmIGMAmIgBOSImLAugALBkNMgsLgEJIfUl4MAjBAETI2KFuIWKluIAADuI2KGJgEghKgIWg");
	this.shape_6.setTransform(53.4,344.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5}]}).wait(15));

	// waiter towel top
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#0066FF").ss(3,1,1).p("AjYleIH2hNQhdA5AfLRIn1BNQggrQBdg6g");
	this.shape_7.setTransform(498.5,192.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AjYleIH2hMQhdA5AfLPIn1BOQggrQBdg6g");
	this.shape_8.setTransform(498.5,192.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7}]}).wait(15));

	// waiter
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#0066FF").s().p("AoMQeQhwhugDieIAAq4QAAikBzhyQB0h0CjAAQCjAABzB0QB0ByAACkIAAK4QgECehwBuQhzB0ijAAQijAAh0h0gAvfOJQgqgSgNgrQgRgpASgqIDsoBIACABIBuj/QAKgXASgQIAAIHIgFAMIgDgBIioFpQgRAqgsASQgVAIgVAAQgWAAgVgJgACwIZIAApGIC8GmIAAAGIIYhIQA2gHAtAaQAtAbAKAtQAIAsggAjQggAkgzAIIpHBNIAAAAIgyAHQgQADgPAAQhIAAgjhLgAoVnnQh0h0AAimQAAimB0h1QB1h1CmAAQCmAAB0B1QB1B1AACmQAACmh1B0Qh0B1imAAQimAAh1h1g");
	this.shape_9.setTransform(434.4,125);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(15));

	// waiter towel bottom
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#0066FF").ss(3,1,1).p("AEWF2QAgr/hdg5In2BNQBdA6gfL+g");
	this.shape_10.setTransform(505.4,194.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("Akdl1IH2hNQBdA5ggL/In1BNQAfr+hdg6g");
	this.shape_11.setTransform(505.4,194.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10}]}).wait(15));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.2,208,838.2,440.7);
// library properties:
lib.properties = {
	id: '2D12D787FEBDB046BDB992A0F30384A9',
	width: 550,
	height: 400,
	fps: 24,
	color: "#E7E4E4",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['2D12D787FEBDB046BDB992A0F30384A9'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;