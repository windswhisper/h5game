var OverLayer = cc.Layer.extend({
	gameLayer:null,
	ctor:function(gameLayer)
	{
		this._super();

		this.gameLayer = gameLayer;

        this.title = new cc.Sprite("res/playpage_ico_gameover.png");
        this.title.setPosition(540,1300);
        this.title.runAction(new cc.Sequence(new cc.DelayTime(0),new cc.Spawn(new cc.MoveBy(0.5,cc.p(0,100)),new cc.FadeTo(0.5,255))));
        this.title.setOpacity(0);
        this.addChild(this.title);

        this.levelTitle = new cc.Sprite("res/playpage_word_level.png");
        this.levelTitle.setPosition(540,1100);
        this.levelTitle.runAction(new cc.Sequence(new cc.DelayTime(1),new cc.Spawn(new cc.MoveBy(0.5,cc.p(0,100)),new cc.FadeTo(0.5,255))));
        this.levelTitle.setOpacity(0);
        this.addChild(this.levelTitle);

        this.levelLabel = new FontPng(75,gameLayer.level);
        this.levelLabel.setPosition(540,1030);
        this.levelLabel.runAction(new cc.Sequence(new cc.DelayTime(1),new cc.Spawn(new cc.MoveBy(0.5,cc.p(0,100)),new cc.FadeTo(0.5,255))));
        this.levelLabel.setOpacity(0);
        this.addChild(this.levelLabel);

        this.scoreTitle = new cc.Sprite("res/playpage_word_score.png");
        this.scoreTitle.setPosition(540,900);
        this.scoreTitle.runAction(new cc.Sequence(new cc.DelayTime(2),new cc.Spawn(new cc.MoveBy(0.5,cc.p(0,100)),new cc.FadeTo(0.5,255))));
        this.scoreTitle.setOpacity(0);
        this.addChild(this.scoreTitle);

        this.scoreLabel = new FontPng(150,gameLayer.score);
        this.scoreLabel.setPosition(540,790);
        this.scoreLabel.runAction(new cc.Sequence(new cc.DelayTime(2),new cc.Spawn(new cc.MoveBy(0.5,cc.p(0,100)),new cc.FadeTo(0.5,255))));
        this.scoreLabel.setOpacity(0);
        this.addChild(this.scoreLabel);

        this.btnContinue = new cc.Sprite("res/playpage_btn_next.png");
        this.btnContinue.setPosition(540,500);
        this.btnContinue.runAction(new cc.Sequence(new cc.DelayTime(3),new cc.Spawn(new cc.MoveBy(0.5,cc.p(0,100)),new cc.FadeTo(0.5,255))));
        this.btnContinue.setOpacity(0);
        this.addChild(this.btnContinue);

        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: false,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
        }, this);
	},
    onTouchBegan:function(touch, event) 
    {
        var target = event.getCurrentTarget();
        var p = target.convertTouchToNodeSpace(touch);

        return true;
    },
    onTouchMoved:function(touch, event) 
    {
        var target = event.getCurrentTarget();
        var p = target.convertTouchToNodeSpace(touch);


    },
    onTouchEnded:function(touch, event) 
    {
        var target = event.getCurrentTarget();
        var p = target.convertTouchToNodeSpace(touch);


        if(cc.pDistanceSQ(target.btnContinue.getPosition(),p)<10000)
        {
            target.gameLayer.newGame();
            target.gameLayer.showBars();
            target.removeFromParent();
        }
    }
});