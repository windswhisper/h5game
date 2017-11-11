var LoadingLayer = cc.Layer.extend({
	ctor:function()
	{
		var _gameScene = this;

		this._super();

		this.bg = new cc.Sprite("res/loading_bg.jpg");

		this.bg.setPosition(540,960);

		this.bg.setScale(1.3);

		this.addChild(this.bg);


		this.logo = new cc.Sprite("res/logo.png");

		this.logo.setPosition(540,960);

		this.addChild(this.logo,1);

		setTimeout(function(){
			_gameScene.onLoaded();
		},2000);
	},
	onLoaded:function()
	{
		this.logo.runAction(new cc.EaseExponentialOut(new cc.MoveBy(2,cc.p(0,500))));

		this.mainBg = new cc.Sprite("res/main_bg.jpg");

		this.mainBg.setPosition(540,960);

		this.mainBg.setScale(1.3);
		
		this.mainBg.setOpacity(0);

		this.mainBg.runAction(new cc.FadeTo(1,255));

		this.addChild(this.mainBg);

		this.btnStart = new cc.Sprite("res/btn_play.png");

		this.btnStart.setPosition(540,780);

		this.btnStart.setScale(0);

		var action = new cc.RepeatForever(new cc.Sequence(new cc.EaseSineInOut(new cc.ScaleTo(1,1)),new cc.EaseSineInOut(new cc.ScaleTo(1,0.9))));

		this.btnStart.runAction(action);

		this.addChild(this.btnStart);
	
		var _gameScene = this;

		cc.eventManager.addListener({
	          event: cc.EventListener.TOUCH_ONE_BY_ONE,
	          swallowTouches: false,
	          onTouchBegan: function(){
	          	return true;
	          },
	          onTouchMoved: function(){
	          },
	          onTouchEnded: function(){
	          	_gameScene.startGame();
	          },
	        }, this.btnStart);
	},
	startGame:function()
	{
		this.removeAllChildren();
		this.addChild(new GameLayer);
	}
});