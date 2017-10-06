var _toast;
var Toast = cc.Node.extend({
	ctor:function()
	{
		this._super();

		_toast = this;


		this.setPosition(135,90);

		var bg = cc.Sprite.create("res/black.png");
		bg.setScale(0.8,0.1);
		bg.setPosition(0,0);
		bg.setOpacity(200);
		this.addChild(bg);

		this.text = cc.LabelTTF.create("","Arial",12);
		this.text.setPosition(0,0);
		this.addChild(this.text);

		this.setVisible(false);
	},
	showTips:function(string)
	{
		this.text.setString(string);
		this.unscheduleAllCallbacks();
		this.setVisible(true);
		this.scheduleOnce(function(){_toast.setVisible(false);},3);
	}
});