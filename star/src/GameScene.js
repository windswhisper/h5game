var _adapteSize = 1;
var GameScene = cc.Scene.extend({
	ctor:function()
	{
		var _gameScene = this;

		this._super();

		this.adaptScreen();

		cc.view.enableRetina(true);
		
		window.onresize = function()
		{
			_gameScene.adaptScreen();
		}

		
		this.addChild(new LoadingLayer());

	},
	adaptScreen:function()
	{
	 	cc.view.setDesignResolutionSize(1080,1920,cc.ResolutionPolicy.NO_BORDER);

		var size = cc.director.getWinSize();
        var visibleSize = cc.view.getVisibleSize();
        this.setPosition(size.width/2-visibleSize.height/size.height*size.width/2,size.height/2-visibleSize.height/size.height*size.height/2);
        this.setAnchorPoint(0, 0);
        _adapteSize = visibleSize.height/size.height
        this.setScale(_adapteSize);

	}
});