var FontPng = cc.Node.extend({
	text:null,
	fontSize:0,
	ctor:function(size,text)
	{
		this._super();

		this.fontSize = size;

		this.setScale(size/75);
		this.setCascadeOpacityEnabled(true);

		this.setString(text);
	},
	setString:function(text){
		this.text = text;
		text = text.toString();
		this.removeAllChildren();

		var offset = (text.length-1)*54/2;

		for(var i=0;i<text.length;i++)
		{
			var ch = text.charAt(i);
			var sp = new cc.Sprite("res/font/"+ch+".png");
			sp.setPosition(i*54-offset,0);
			this.addChild(sp);
		}

	}
});