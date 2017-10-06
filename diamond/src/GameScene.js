var GameScene = cc.Scene.extend({
	ctor:function()
	{
		this._super();

		this.adaptScreen();

		this.addChild(new GameLayer());
	},
	adaptScreen:function()
	{
	 	cc.view.setDesignResolutionSize(540,960,cc.ResolutionPolicy.NO_BORDER);

		var size = cc.director.getWinSize();
        var visibleSize = cc.view.getVisibleSize();
        this.setPosition(size.width/2-visibleSize.height/size.height*size.width/2,size.height/2-visibleSize.height/size.height*size.height/2);
        this.setAnchorPoint(0, 0);
        this.setScale(visibleSize.height/size.height);

        var rect = cc.DrawNode.create();
        rect.drawRect(cc.p(2,2),cc.p(538,958));
        rect.setPosition(0,0);
        this.addChild(rect);
	}
});