var isSoundOn = true;
var PauseLayer = cc.Layer.extend({
	gameLayer:null,
	ctor:function(gameLayer)
	{
		this._super();

		this.gameLayer = gameLayer;

		this.shadow = new cc.LayerColor(cc.color(0,0,0,72));

		this.shadow.setScale(50);

		this.addChild(this.shadow);

		this.bg = new cc.Sprite("res/playpage_bg_windows.png");

		this.bg.setPosition(540,960);

		this.addChild(this.bg);


		this.title = new cc.Sprite("res/playpage_word_stop.png");

		this.title.setPosition(540,1290);

		this.addChild(this.title);


		this.btnResume = new cc.Sprite("res/btn_resume.png");

		this.btnResume.setPosition(540,960);

		this.addChild(this.btnResume);

		
		this.btnSound = new cc.Sprite("res/playpage_btn_music_off.png");

		this.btnSound.setPosition(240,960);

		this.addChild(this.btnSound);

    	if(!isSoundOn)
    	{
    		this.btnSound.setTexture("res/playpage_btn_music.png");
    	}
    	else
    	{
    		this.btnSound.setTexture("res/playpage_btn_music_off.png");
    	}

		this.btnRestart = new cc.Sprite("res/btn_replay.png");

		this.btnRestart.setPosition(860,960);

		this.addChild(this.btnRestart);



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
        var p = touch.getLocation();

        return true;
    },
    onTouchMoved:function(touch, event) 
    {
        var target = event.getCurrentTarget();
        var p = touch.getLocation();

    },
    onTouchEnded:function(touch, event) 
    {
        var target = event.getCurrentTarget();
        var p = target.convertTouchToNodeSpace(touch);

        if(cc.pDistanceSQ(target.btnSound.getPosition(),p)<6000)
        {
        	target.switchSound();
        }
        if(cc.pDistanceSQ(target.btnResume.getPosition(),p)<10000)
        {
        	target.resumeGame();
        }
        if(cc.pDistanceSQ(target.btnRestart.getPosition(),p)<6000)
        {
        	target.restart();
        }
    },
    switchSound:function()
    {
    	if(isSoundOn)
    	{
    		cc.audioEngine.setEffectsVolume(0);
    		this.btnSound.setTexture("res/playpage_btn_music.png");
    	}
    	else
    	{
    		cc.audioEngine.setEffectsVolume(100);
    		this.btnSound.setTexture("res/playpage_btn_music_off.png");
    	}
    	isSoundOn = !isSoundOn;
    },
    resumeGame:function()
    {
    	this.gameLayer.resume();
    	this.removeFromParent();
    },
    restart:function()
    {
    	this.gameLayer.resume();
    	this.gameLayer.restart();
    	this.removeFromParent();
    },

});