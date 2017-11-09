var GameScene = cc.Scene.extend({
	ctor:function()
	{
		this._super();

		this.addChild(new GameLayer());

		this.adaptScreen();
	},
	adaptScreen:function()
	{
	 	cc.view.setDesignResolutionSize(1080,1920,cc.ResolutionPolicy.NO_BORDER);

		var size = cc.director.getWinSize();
        var visibleSize = cc.view.getVisibleSize();
        this.setPosition(size.width/2-visibleSize.height/size.height*size.width/2,size.height/2-visibleSize.height/size.height*size.height/2);
        this.setAnchorPoint(0, 0);
        this.setScale(visibleSize.height/size.height);

	}
});