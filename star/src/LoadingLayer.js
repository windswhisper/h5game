var LoadingLayer = cc.Layer.extend({
	ctor:function()
	{
		var _gameScene = this;

		this._super();

		this.shadow = new cc.LayerColor(cc.color(4,166,103,255));

		this.shadow.setScale(50);

		this.addChild(this.shadow);


		this.logoLoading = new cc.Sprite("res/logo_loading.png");

		this.logoLoading.setPosition(540,1060);

		this.addChild(this.logoLoading);

		this.progressBg = new cc.Sprite("res/loading_bottom.png");
		this.progressBg.setPosition(540,140);
		this.addChild(this.progressBg); 

		this.progressBar = new cc.Sprite("res/loading_top.png");
		this.progressBar.setPosition(540,140);
		this.addChild(this.progressBar); 

        var res = ["res/playpage_chess_1.png","res/playpage_chess_2.png","res/playpage_chess_3.png","res/playpage_chess_4.png","res/playpage_chess_5.png","res/playpage_chess_6.png"
        ,"res/Candy_1.png","res/Candy_2.png","res/Candy_3.png","res/Candy_4.png","res/Candy_5.png","res/Candy_6.png"
        ,"res/playpage_ico_ice_1.png","res/playpage_ico_ice_2.png","res/playpage_ico_ice_3.png","res/playpage_chess_bomb.png"
        ,"res/btn_play.png","res/logo.png","res/main_bg.jpg","res/playpage_chessbg.png","res/playpage_Top.png","res/tile_shine.png","res/playpage_bg.png","res/btn_pause.png"
        ,"res/font/0.png","res/font/1.png","res/font/2.png","res/font/3.png","res/font/4.png","res/font/5.png","res/font/6.png","res/font/7.png","res/font/8.png","res/font/9.png","res/font/X.png"
        ,"res/playpage_bg_windows.png","res/playpage_btn_music_off.png","res/btn_resume.png","res/playpage_btn_music.png","res/btn_replay.png","res/playpage_word_stop.png"
        ,"res/playpage_progress_bg.png","res/playpage_progress.png","res/playpage_word_restar.png","res/playpage_word_comboadd.png","res/playpage_word_level.png","res/playpage_word_score.png","res/playpage_word_stop.png","res/playpage_ico_gameover.png"
        ,"res/music/music_bgm.mp3","res/music/hit_2.mp3","res/music/hit_3.mp3","res/music/hit_4.mp3","res/music/bomb.mp3","res/music/ice_clash.mp3","res/music/drop.mp3","res/music/game_over.mp3"];
        cc.loader.load(res,
            function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                _gameScene.updateProgressBar(percent/100);
            }, function () {
            	_gameScene.onLoaded();
            });
	},
    updateProgressBar:function(power)
    {
		this.progressBar.setPosition(540-640/2*(1-power),140);
		this.progressBar.setTextureRect(cc.rect(0,0,640*(power),29));
    },
	onLoaded:function()
	{

		cc.audioEngine.playMusic("res/music/music_bgm.mp3",true);

		this.progressBar.setOpacity(0);
		this.progressBg.setOpacity(0);
		this.logoLoading.setOpacity(0);

		this.mainBg = new cc.Sprite("res/main_bg.jpg");

		this.mainBg.setPosition(540,960);

		this.mainBg.setScale(1/_adapteSize);
		
		this.mainBg.setOpacity(0);

		this.mainBg.runAction(new cc.FadeTo(1,255));

		this.addChild(this.mainBg);

		this.logo = new cc.Sprite("res/logo.png");

		this.logo.setPosition(540,1500);

		this.addChild(this.logo);

		this.btnStart = new cc.Sprite("res/btn_play.png");

		this.btnStart.setPosition(540,880);

		this.btnStart.setScale(0);

		var action = new cc.RepeatForever(new cc.Sequence(new cc.EaseSineInOut(new cc.ScaleTo(1,1)),new cc.EaseSineInOut(new cc.ScaleTo(1,0.9))));

		this.btnStart.runAction(action);

		this.addChild(this.btnStart);

		cc.eventManager.addListener({
	          event: cc.EventListener.TOUCH_ONE_BY_ONE,
	          swallowTouches: false,
	          onTouchBegan: function(touch,event){
		        var target = event.getCurrentTarget();
		        var p = target.convertTouchToNodeSpace(touch);

	           	target.btnStart.setOpacity(255);
	            if(cc.pDistanceSQ(target.btnStart.getPosition(),p)<20000)
	            {
	            	target.btnStart.setOpacity(160);
	            }
	          	return true;
	          },
	          onTouchMoved: function(touch,event){
		        var target = event.getCurrentTarget();
		        var p = target.convertTouchToNodeSpace(touch);
	            
	           	target.btnStart.setOpacity(255);

	            if(cc.pDistanceSQ(target.btnStart.getPosition(),p)<20000)
	            {
	            	target.btnStart.setOpacity(160);
	            }
	          },
	          onTouchEnded: function(touch,event){
		        var target = event.getCurrentTarget();
		        var p = target.convertTouchToNodeSpace(touch);

	           	target.btnStart.setOpacity(255);

	            if(cc.pDistanceSQ(target.btnStart.getPosition(),p)<20000)
	            {
		          	target.startGame();
					cc.audioEngine.playEffect("res/music/drop.mp3");
	            }
	          },
	        }, this);

	},
	startGame:function()
	{
		this.getParent().addChild(new GameLayer());
		this.removeFromParent();
	}
});