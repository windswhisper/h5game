var GameScene = cc.Scene.extend({
	ctor:function()
	{
		this._super();
		this.addChild(new MapLayer());
		this.addChild(new UILayer());
		this.addChild(new Toast());
	}
});