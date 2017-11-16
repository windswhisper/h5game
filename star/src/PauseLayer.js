var isSoundOn = true;
var PauseLayer = cc.Layer.extend({
	gameLayer:null,
    isRestarting:false,
	ctor:function(gameLayer)
	{
		this._super();

		this.gameLayer = gameLayer;

		this.shadow = new cc.LayerColor(cc.color(0,0,0,72));

		this.shadow.setScale(50);

		this.addChild(this.shadow);

		this.bg = new cc.Sprite("res/playpage_bg_windows.png");

        this.bg.setScale(1/_adapteSize,1);

		this.bg.setPosition(540,960);

		this.addChild(this.bg);


		this.title = new cc.Sprite("res/playpage_word_stop.png");

		this.title.setPosition(540,1290);

		this.addChild(this.title);

        this.titleRestart = new cc.Sprite("res/playpage_word_restar.png");

        this.titleRestart.setPosition(540,1290);

        this.titleRestart.setScale(0);

        this.addChild(this.titleRestart);


		this.btnResume = new cc.Sprite("res/btn_resume.png");

		this.btnResume.setPosition(540,960);

		this.addChild(this.btnResume);

		
		this.btnSound = new cc.Sprite("res/playpage_btn_music_off.png");

		this.btnSound.setPosition(240,960);

		this.addChild(this.btnSound);

    	if(isSoundOn)
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


        this.btnRestartYes = new cc.Sprite("res/playpage_btn_yes.png");

        this.btnRestartYes.setPosition(720,960);

        this.btnRestartYes.setScale(0);

        this.addChild(this.btnRestartYes);


        this.btnRestartNo = new cc.Sprite("res/playpage_btn_no.png");

        this.btnRestartNo.setPosition(360,960);

        this.btnRestartNo.setScale(0);

        this.addChild(this.btnRestartNo);



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

        if(!target.isRestarting)
        {
            target.btnSound.setScale(1);
            target.btnResume.setScale(1);
            target.btnRestart.setScale(1);

            if(cc.pDistanceSQ(target.btnSound.getPosition(),p)<6000)
            {
                target.btnSound.setScale(0.8);
            }
            if(cc.pDistanceSQ(target.btnResume.getPosition(),p)<10000)
            {
                target.btnResume.setScale(0.8);
            }
            if(cc.pDistanceSQ(target.btnRestart.getPosition(),p)<6000)
            {
                target.btnRestart.setScale(0.8);
            }
        }
        else
        {
            target.btnRestartYes.setScale(1);
            target.btnRestartNo.setScale(1);
            if(cc.pDistanceSQ(target.btnRestartYes.getPosition(),p)<6000)
            {
                target.btnRestartYes.setScale(0.8);
            }
            if(cc.pDistanceSQ(target.btnRestartNo.getPosition(),p)<6000)
            {
                target.btnRestartNo.setScale(0.8);
            }
        }
        return true;
    },
    onTouchMoved:function(touch, event) 
    {
        var target = event.getCurrentTarget();
        var p = target.convertTouchToNodeSpace(touch);


        if(!target.isRestarting)
        {
            target.btnSound.setScale(1);
            target.btnResume.setScale(1);
            target.btnRestart.setScale(1);

            if(cc.pDistanceSQ(target.btnSound.getPosition(),p)<6000)
            {
                target.btnSound.setScale(0.8);
            }
            if(cc.pDistanceSQ(target.btnResume.getPosition(),p)<10000)
            {
                target.btnResume.setScale(0.8);
            }
            if(cc.pDistanceSQ(target.btnRestart.getPosition(),p)<6000)
            {
                target.btnRestart.setScale(0.8);
            }
        }
        else
        {
            target.btnRestartYes.setScale(1);
            target.btnRestartNo.setScale(1);
            if(cc.pDistanceSQ(target.btnRestartYes.getPosition(),p)<6000)
            {
                target.btnRestartYew.setScale(0.8);
            }
            if(cc.pDistanceSQ(target.btnRestartNo.getPosition(),p)<6000)
            {
                target.btnRestartNo.setScale(0.8);
            }
        }

    },
    onTouchEnded:function(touch, event) 
    {
        var target = event.getCurrentTarget();
        var p = target.convertTouchToNodeSpace(touch);


        if(!target.isRestarting)
        {
            target.btnSound.setScale(1);
            target.btnResume.setScale(1);
            target.btnRestart.setScale(1);

            if(cc.pDistanceSQ(target.btnSound.getPosition(),p)<6000)
            {
            	target.switchSound();
                cc.audioEngine.playEffect("res/music/drop.mp3");
            }
            else if(cc.pDistanceSQ(target.btnResume.getPosition(),p)<10000)
            {
            	target.resumeGame();
                cc.audioEngine.playEffect("res/music/drop.mp3");
            }
            else if(cc.pDistanceSQ(target.btnRestart.getPosition(),p)<6000)
            {
            	target.showConfirm();
                cc.audioEngine.playEffect("res/music/drop.mp3");
            }
        }
        else
        {
            target.btnRestartYes.setScale(1);
            target.btnRestartNo.setScale(1);
            if(cc.pDistanceSQ(target.btnRestartYes.getPosition(),p)<6000)
            {
                target.restart();
                cc.audioEngine.playEffect("res/music/drop.mp3");
            }
            if(cc.pDistanceSQ(target.btnRestartNo.getPosition(),p)<6000)
            {
                target.hideConfirm();
                cc.audioEngine.playEffect("res/music/drop.mp3");
            }
        }
    },
    switchSound:function()
    {
    	if(isSoundOn)
    	{
    		cc.audioEngine.setEffectsVolume(0);
    		this.btnSound.setTexture("res/playpage_btn_music_off.png");
    	}
    	else
    	{
    		cc.audioEngine.setEffectsVolume(100);
    		this.btnSound.setTexture("res/playpage_btn_music.png");
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
    showConfirm:function()
    {
        this.isRestarting = true;
        this.title.runAction(new cc.EaseBackIn(new cc.ScaleTo(0.5,0)));

        this.btnSound.runAction(new cc.EaseBackIn(new cc.ScaleTo(0.5,0)));
        this.btnResume.runAction(new cc.EaseBackIn(new cc.ScaleTo(0.5,0)));
        this.btnRestart.runAction(new cc.Sequence(new cc.EaseBackIn(new cc.ScaleTo(0.5,0)),new cc.CallFunc(this.showConfirmBtn,this)));
    },
    showConfirmBtn:function()
    {
        this.titleRestart.runAction(new cc.EaseBackOut(new cc.ScaleTo(0.5,1)));
        this.btnRestartYes.runAction(new cc.EaseBackOut(new cc.ScaleTo(0.5,1)));
        this.btnRestartNo.runAction(new cc.EaseBackOut(new cc.ScaleTo(0.5,1)));
    },
    hideConfirm:function()
    {
        this.isRestarting = false;
        this.titleRestart.runAction(new cc.EaseBackIn(new cc.ScaleTo(0.5,0)));

        this.titleRestart.runAction(new cc.EaseBackIn(new cc.ScaleTo(0.5,0)));
        this.btnRestartYes.runAction(new cc.EaseBackIn(new cc.ScaleTo(0.5,0)));
        this.btnRestartNo.runAction(new cc.Sequence(new cc.EaseBackIn(new cc.ScaleTo(0.5,0)),new cc.CallFunc(this.hideConfirmBtn,this)));
    },
    hideConfirmBtn:function()
    {   

        this.title.runAction(new cc.EaseBackOut(new cc.ScaleTo(0.5,1)));
        this.btnSound.runAction(new cc.EaseBackOut(new cc.ScaleTo(0.5,1)));
        this.btnResume.runAction(new cc.EaseBackOut(new cc.ScaleTo(0.5,1)));
        this.btnRestart.runAction(new cc.EaseBackOut(new cc.ScaleTo(0.5,1)));
    }
});