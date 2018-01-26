var LoadingLayer = cc.Layer.extend({
	ctor:function()
	{
		var _gameScene = this;

		this._super();

		this.shadow = new cc.LayerColor(cc.color(255,255,255,255));

		this.shadow.setScale(50);

		this.addChild(this.shadow);


		this.logoLoading = new cc.Sprite("res/logo_loading.png");

		this.logoLoading.setPosition(540,1160);

		this.addChild(this.logoLoading);

		this.progressBg = new cc.Sprite("res/loading_bottom.png");
		this.progressBg.setPosition(540,200);
		this.addChild(this.progressBg); 

		this.progressBar = new cc.Sprite("res/loading_top.png");
		this.progressBar.setPosition(540,200);
		this.addChild(this.progressBar); 

        var res = ["res/playpage_chess_1.png","res/playpage_chess_2.png","res/playpage_chess_3.png","res/playpage_chess_4.png","res/playpage_chess_5.png","res/playpage_chess_6.png"
        ,"res/Candy_1.png","res/Candy_2.png","res/Candy_3.png","res/Candy_4.png","res/Candy_5.png","res/Candy_6.png","res/ani/star_1.png"
        ,"res/playpage_ico_ice_1.png","res/playpage_ico_ice_2.png","res/playpage_ico_ice_3.png","res/playpage_chess_bomb.png","res/playpage_chess_coin.png"
        ,"res/btn_play.png","res/logo.png","res/main_city.png","res/main_cloud1.png","res/main_cloud2.png","res/main_cloud3.png","res/main_cloud4.png","res/main_moon.png","res/playpage_chessbg.png","res/playpage_Top.png","res/tile_shine.png","res/playpage_bg.png","res/btn_pause.png"
        ,"res/font/0.png","res/font/1.png","res/font/2.png","res/font/3.png","res/font/4.png","res/font/5.png","res/font/6.png","res/font/7.png","res/font/8.png","res/font/9.png","res/font/X.png"
        ,"res/playpage_bg_windows.png","res/playpage_btn_music_off.png","res/btn_resume.png","res/playpage_btn_music.png","res/btn_replay.png","res/playpage_word_stop.png"
        ,"res/playpage_progress_bg.png","res/playpage_progress.png","res/playpage_word_restar.png","res/playpage_word_comboadd.png","res/playpage_word_level.png","res/playpage_word_score.png","res/playpage_word_stop.png","res/playpage_ico_gameover.png"
        ,"res/music/music_bgm.mp3","res/music/hit_2.mp3","res/music/hit_3.mp3","res/music/hit_4.mp3","res/music/bomb.mp3","res/music/item_coin.mp3","res/music/ice_clash.mp3","res/music/drop.mp3","res/music/level_up.mp3","res/music/game_over.mp3"];
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
		this.progressBar.setPosition(540-640/2*(1-power),200);
		this.progressBar.setTextureRect(cc.rect(0,0,640*(power),29));
    },
	onLoaded:function()
	{

		cc.audioEngine.playMusic("res/music/music_bgm.mp3",true);

		this.progressBar.setOpacity(0);
		this.progressBg.setOpacity(0);
		this.logoLoading.setOpacity(0);

		this.mainBg = new cc.Sprite("res/playpage_bg.png");

		this.mainBg.setPosition(540,960);

		this.mainBg.setScale(1/_adapteSize);
		
		this.mainBg.setOpacity(0);

		this.mainBg.runAction(new cc.FadeTo(0.5,255));

		this.addChild(this.mainBg);


		var moon = new cc.Sprite("res/main_moon.png");

		moon.setPosition(540,1300);

		moon.setOpacity(0);

		moon.runAction(new cc.Sequence(new cc.DelayTime(0.2),new cc.Spawn(new cc.FadeTo(0.5,255),new cc.EaseSineOut(new cc.MoveBy(0.5,cc.p(0,100))))));

		this.addChild(moon);


		var cloud2 = new cc.Sprite("res/main_cloud2.png");

		cloud2.setPosition(230,1600);

		cloud2.setOpacity(0);

		cloud2.setScale(0.6);

		cloud2.runAction(new cc.RepeatForever(new cc.Sequence(new cc.DelayTime(1),new cc.FadeTo(2,172),new cc.DelayTime(70),new cc.FadeTo(28,0),new cc.DelayTime(4))));

		cloud2.runAction(new cc.RepeatForever(new cc.Sequence(new cc.DelayTime(1),new cc.MoveBy(100,cc.p(-1800,0)),new cc.MoveBy(0,cc.p(1800,0),new cc.DelayTime(6)))));

		this.addChild(cloud2);


		this.logo = new cc.Sprite("res/logo.png");

		this.logo.setPosition(540,1300);

		this.logo.setOpacity(0);

		this.logo.runAction(new cc.Sequence(new cc.DelayTime(0.4),new cc.Spawn(new cc.FadeTo(0.5,255),new cc.EaseSineOut(new cc.MoveBy(0.5,cc.p(0,100))))));

		this.addChild(this.logo);


		var cloud3 = new cc.Sprite("res/main_cloud3.png");

		cloud3.setPosition(900,1218);

		cloud3.setOpacity(0);

		cloud3.setScale(0.6);

		cloud3.runAction(new cc.RepeatForever(new cc.Sequence(new cc.DelayTime(1),new cc.FadeTo(1,172),new cc.DelayTime(35),new cc.FadeTo(14,0))));

		cloud3.runAction(new cc.RepeatForever(new cc.Sequence(new cc.DelayTime(1),new cc.MoveBy(50,cc.p(-1100,0)),new cc.MoveBy(0,cc.p(1100,0)))));

		this.addChild(cloud3);

		var cloud4 = new cc.Sprite("res/main_cloud4.png");

		cloud4.setPosition(200,914);

		cloud4.setOpacity(0);

		cloud4.setScale(0.6);

		cloud4.runAction(new cc.RepeatForever(new cc.Sequence(new cc.DelayTime(1),new cc.FadeTo(1,172),new cc.DelayTime(46),new cc.FadeTo(27,0),new cc.DelayTime(20))));

		cloud4.runAction(new cc.RepeatForever(new cc.Sequence(new cc.DelayTime(1),new cc.MoveBy(14,cc.p(-400,0)),new cc.MoveBy(0,cc.p(2000,0),new cc.DelayTime(20)))));

		this.addChild(cloud4);


		var city = new cc.Sprite("res/main_city.png");

		city.setPosition(540,120);

		city.setOpacity(0);

		city.runAction(new cc.Sequence(new cc.DelayTime(0.6),new cc.Spawn(new cc.FadeTo(0.5,255),new cc.EaseSineOut(new cc.MoveBy(0.5,cc.p(0,200))))));

		this.mainBg.addChild(city);


		var cloud1 = new cc.Sprite("res/main_cloud1.png");

		cloud1.setPosition(640,640);

		cloud1.setOpacity(0);

		cloud1.setScale(0.6);

		cloud1.runAction(new cc.RepeatForever(new cc.Sequence(new cc.DelayTime(1),new cc.FadeTo(1,172),new cc.DelayTime(44),new cc.FadeTo(44,0))));

		cloud1.runAction(new cc.RepeatForever(new cc.Sequence(new cc.DelayTime(1),new cc.MoveBy(89,cc.p(-900,0)),new cc.MoveBy(0,cc.p(900,0)))));

		this.addChild(cloud1);



		this.btnStart = new cc.Sprite("res/btn_play.png");

		this.btnStart.setPosition(540,750);

		this.btnStart.setOpacity(0);

		var action = new cc.RepeatForever(new cc.Sequence(new cc.EaseSineInOut(new cc.ScaleTo(1,1)),new cc.EaseSineInOut(new cc.ScaleTo(1,0.9))));
		
		this.btnStart.runAction(action);
		
		this.btnStart.runAction(new cc.Sequence(new cc.DelayTime(0.5),new cc.Spawn(new cc.FadeTo(0.5,255),new cc.EaseSineOut(new cc.MoveBy(0.5,cc.p(0,100))))));

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