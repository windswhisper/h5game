var BOARD_SIZE = cc.size(7,9);
var BLOCK_SIZE = cc.size(144,144);

var DROP_DURATION = 1;

var SCORE_PER_BLOCK = 10;//单个方块消除分数
var POWER_PER_BLOCK = 1;//单个方块消除能量
var POWER_SPEED = 15;
var SCORE_LEVEL = [0,1000,2500,4000,7500,10000,12000,15000,18000,20000,24000,30000];
var SCORE_RATE_LEVEL = [1];
var POWER_LEVEL = [30,30,40,50,50,50,50,50];//升级所需能量
var COLOR_LEVEL = [0,4,4,5];//方块颜色随等级提高
var COMBO_RATE = [1,1,2];//连击加成比率
var SCORE_EXTRA = [0,0,0,0,10,10,10,20,20,20,50];//多消额外加分
var ICE_BLOCK_TIME = 3;//冰块需打破次数
var ICE_BLOCK_RATE = [0,0,5,10,10,12,12,15,25,0,20];//冰块出现概率随等级提高

var STAGE_MAP = [
	[
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0
	],
	[
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0
	],
	[
	0,0,0,0,0,0,0,
	0,1,0,1,0,1,0,
	0,0,0,0,0,0,0,
	0,1,0,1,0,1,0,
	0,0,0,0,0,0,0,
	0,1,0,1,0,1,0,
	0,0,0,0,0,0,0,
	0,1,0,1,0,1,0,
	0,0,0,0,0,0,0
	],
	[
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,1,1,1,0,0,
	0,0,1,1,1,0,0,
	0,0,1,1,1,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0
	],
	[
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0
	],
	[
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	1,1,1,1,1,1,1,
	1,1,1,1,1,1,1
	],
	[
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	1,0,0,0,0,0,1,
	1,1,0,0,0,1,1,
	1,1,1,0,1,1,1,
	1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,
	],
	[
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,1,0,0,0,1,0,
	1,1,1,0,1,1,1,
	0,1,0,0,0,1,0,
	0,0,0,1,0,0,0,
	0,0,1,1,1,0,0,
	0,0,0,1,0,0,0
	],
	[
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0
	],
	[
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	1,2,1,1,1,2,1,
	1,1,1,1,1,1,1,
	1,2,1,1,1,2,1,
	1,2,1,1,1,2,1,
	1,2,2,2,2,2,1,
	1,1,1,1,1,1,1
	]
];

var _gameLayer;

function arv(arr,index)
{
	if(index>=arr.length)index = arr.length-1;
	return arr[index];
}
function inRange(x,y)
{
	return x<=BOARD_SIZE.width-1&&x>=0&&y<=BOARD_SIZE.height-1&&y>=0;
}
var GameLayer = cc.Layer.extend({
	boardNode:null,
	beansArray:[],
	spriteArray:[],
	countTempArray:[],
	count:null,

	untouch:false,
	effect:null,
	score:0,
	combo:0,
	level:1,
	power:0,

	ctor:function()
	{
		this._super();

		_gameLayer = this;

		var bg = new cc.Sprite("res/playpage_bg.png");
		bg.setScale(1/_adapteSize);
		bg.setPosition(540,960);
		this.addChild(bg);

		var bgBoard = new cc.Sprite("res/playpage_chessbg.png");
		bgBoard.setPosition(540,960);
		this.addChild(bgBoard);

		var topView = new cc.Node();
		topView.setPosition(0,200);
		topView.runAction(new cc.EaseSineOut(new cc.MoveBy(0.4,cc.p(0,-200))));
		this.addChild(topView);

		var topBar = new cc.Sprite("res/playpage_Top.png");
		topBar.setPosition(540,1827);
		topView.addChild(topBar);

		this.scoreLabel = new FontPng(75,0);
		this.scoreLabel.setPosition(540,1870);
		topView.addChild(this.scoreLabel);

		this.comboLabel = new FontPng(75,"X0");
		this.comboLabel.setPosition(150,1870);
		topView.addChild(this.comboLabel);

		this.levelLabel = new FontPng(75,1);
		this.levelLabel.setPosition(930,1870);
		topView.addChild(this.levelLabel);


		var bottomView = new cc.Node();
		bottomView.setPosition(0,-200);
		bottomView.runAction(new cc.EaseSineOut(new cc.MoveBy(0.4,cc.p(0,200))));
		this.addChild(bottomView);

		var progressBg = new cc.Sprite("res/playpage_progress_bg.png");
		progressBg.setPosition(540,140);
		bottomView.addChild(progressBg); 

		this.progressBar = new cc.Sprite("res/playpage_progress.png");
		this.progressBar.setPosition(540,140);
		bottomView.addChild(this.progressBar); 

		this.btnPause = new cc.Sprite("res/btn_pause.png");
		this.btnPause.setPosition(130,140);
		bottomView.addChild(this.btnPause);

		for(var i=0;i<BOARD_SIZE.width;i++)
		{
			this.beansArray[i] = new Array();
			this.spriteArray[i] = new Array();
			this.countTempArray[i] = new Array();
		}
		this.boardNode = cc.Node.create();
		this.boardNode.setPosition(106,380);
		this.addChild(this.boardNode);
		this.newGame();


        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: false,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
        }, this);
		this.scheduleUpdate();

		this.effect =  new cc.DelayTime(0);
	},
	update:function(dt)
	{

	},

	newGame:function()
	{
		console.log(this);
		this.level = 1;
		this.putBlocks();
	},

	clearBoard:function()
	{
		this.untouch = true;

		for(var i=0;i<BOARD_SIZE.width;i++)
		{
			for(var j=0;j<BOARD_SIZE.height;j++)
			{
				this.spriteArray[i][j].runAction(new cc.Sequence(new cc.DelayTime((BOARD_SIZE.height-j-1)*0.1),new cc.EaseSineIn(new cc.ScaleTo(0.5,0)),
					new cc.CallFunc(this.spriteArray[i][j].removeFromParent,this.spriteArray[i][j])));
			}
		}
	},

	putBlocks:function()
	{
		this.untouch = false;

		for(var i=0;i<BOARD_SIZE.width;i++)
		{
			for(var j=0;j<BOARD_SIZE.height;j++)
			{
				var map = arv(STAGE_MAP,this.level);
				if(map[i+(BOARD_SIZE.height-j-1)*BOARD_SIZE.width]!=0)
				{
					this.putBall(i,j,-map[i+(BOARD_SIZE.height-j-1)*BOARD_SIZE.width]);
				}
				else
				{
					var rand = Math.floor(Math.random()*arv(COLOR_LEVEL,this.level))+1;
					this.putBall(i,j,rand);
				}
			}
		}

    	this.updatePowerBar();
	},
	putBallRandom:function(x,y)
	{
		if(arv(ICE_BLOCK_RATE,this.level)>Math.random()*100)
		{
			this.putBall(x,y,-1);
		}
		else
		{
			var rand = Math.floor(Math.random()*arv(COLOR_LEVEL,this.level))+1;
			this.putBall(x,y,rand);
		}

	},
	putBall:function(x,y,ballType)
	{
		this.beansArray[x][y] = ballType;
		if(ballType<0)
			this.spriteArray[x][y] = new IceBlock(ballType);
		else
			this.spriteArray[x][y] = new Bean(this.beansArray[x][y]);
		this.spriteArray[x][y].cx = x;
		this.spriteArray[x][y].cy = y;
		this.spriteArray[x][y].setPosition(x*BLOCK_SIZE.width,y*BLOCK_SIZE.height+BOARD_SIZE.height*BLOCK_SIZE.height);
		this.spriteArray[x][y].setOpacity(0);
		this.spriteArray[x][y].runAction(new cc.Sequence(
			new cc.DelayTime(DROP_DURATION-DROP_DURATION*(BOARD_SIZE.height-y)/BOARD_SIZE.height),
			new cc.FadeTo(0.1,255)
			));
		var strength = 1.25 - y/BOARD_SIZE.height;
		this.spriteArray[x][y].runAction(new cc.Sequence(
			new cc.EaseQuadraticActionIn(new cc.MoveBy(DROP_DURATION+0.3*(1-strength),cc.p(0,-BOARD_SIZE.height*BLOCK_SIZE.height))),
			this.effect,
			new cc.EaseSineOut(new cc.ScaleTo(0.16,1+0.2*strength,1-0.07*strength)),
			new cc.EaseSineOut(new cc.ScaleTo(0.08,1-0.05*strength,1+0.08*strength)),
			new cc.EaseSineOut(new cc.ScaleTo(0.05,1,1))
			));
		this.boardNode.addChild(this.spriteArray[x][y]);
	},
	playDropEffect:function()
	{
		cc.audioEngine.playEffect("res/music/drop.mp3");
	},
    onTouchBegan:function(touch, event) 
    {
        var target = event.getCurrentTarget();
        var p = touch.getLocation();

        if(target.untouch)return false;

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
        var p = target.boardNode.convertTouchToNodeSpace(touch);

        var p2 = target.convertTouchToNodeSpace(touch);

        if(cc.pDistanceSQ(target.btnPause.getPosition(),p2)<2500)
        {
        	target.addChild(new PauseLayer(target));
               cc.audioEngine.playEffect("res/music/drop.mp3");
        	target.pause();
        }

        p.x += BLOCK_SIZE.width/2;
        p.y += BLOCK_SIZE.height/2;

        var x= Math.floor(p.x/BLOCK_SIZE.width);
        var y= Math.floor(p.y/BLOCK_SIZE.height);

        target.clickxy(x,y);
    },
    clickxy:function(x,y)
    {
    	if(this.beansArray[x][y]<=0)return;
    	this.count = 0;
		for(var i=0;i<BOARD_SIZE.width;i++)
			for(var j=0;j<BOARD_SIZE.height;j++)
    			this.countTempArray[i][j] = 0;
    	this.countNear(x,y);
    	if(this.count>=2)
    	{
			for(var i=0;i<BOARD_SIZE.width;i++)
				for(var j=0;j<BOARD_SIZE.height;j++)
	    			if(this.countTempArray[i][j] == 1)
	    				{
	    					this.hitBean(i,j);
	    					if(i-1>=0&&this.beansArray[i-1][j]<=0)this.countTempArray[i-1][j]=-1;
	    					if(j-1>=0&&this.beansArray[i][j-1]<=0)this.countTempArray[i][j-1]=-1;
	    					if(i+1<BOARD_SIZE.width&&this.beansArray[i+1][j]<=0)this.countTempArray[i+1][j]=-1;
	    					if(j+1<BOARD_SIZE.height&&this.beansArray[i][j+1]<=0)this.countTempArray[i][j+1]=-1;
	    				}


			for(var i=0;i<BOARD_SIZE.width;i++)
				for(var j=0;j<BOARD_SIZE.height;j++)
				{
					if(this.countTempArray[i][j]==-1)
					{
						this.spriteArray[i][j].hit();
					}
	    			this.countTempArray[i][j] = 0;
	    		}

			for(var i=0;i<BOARD_SIZE.width;i++)
				for(var j=0;j<BOARD_SIZE.height;j++)
				{
					if(this.beansArray[i][j]==0)
					{
						for(var k=j+1;k<BOARD_SIZE.height;k++)
						{
							this.countTempArray[i][k]++;
						}
					}
				}

			for(var i=0;i<BOARD_SIZE.width;i++)
			{
				var effect = new cc.CallFunc(this.playDropEffect, this);
				for(var j=0;j<BOARD_SIZE.height;j++)
				{
					if(this.beansArray[i][j]!=0&&this.countTempArray[i][j]!=0)
					{
						this.spriteArray[i][j].cy = j-this.countTempArray[i][j];
						this.beansArray[i][j-this.countTempArray[i][j]]=this.beansArray[i][j];
						this.beansArray[i][j]=0;
						var strength = 1.25 - j/BOARD_SIZE.height;
						this.spriteArray[i][j].runAction(new cc.Sequence(
							new cc.DelayTime((DROP_DURATION+(1-strength)*0.3)*(1-this.countTempArray[i][j]/BOARD_SIZE.height)),
							new cc.EaseQuadraticActionIn(new cc.MoveBy(DROP_DURATION*this.countTempArray[i][j]/BOARD_SIZE.height,cc.p(0,-this.countTempArray[i][j]*BLOCK_SIZE.width))),
							effect,
							new cc.EaseSineOut(new cc.ScaleTo(0.16,1+0.2*strength,1-0.07*strength)),
							new cc.EaseSineOut(new cc.ScaleTo(0.08,1-0.05*strength,1+0.07*strength)),
							new cc.EaseSineOut(new cc.ScaleTo(0.05,1,1))
							));
						this.spriteArray[i][j-this.countTempArray[i][j]]=this.spriteArray[i][j];
						effect = new cc.DelayTime(0);
					}
				}
			}

			for(var i=0;i<BOARD_SIZE.width;i++)
			{
				this.effect = new cc.CallFunc(this.playDropEffect, this);
				for(var j=0;j<BOARD_SIZE.height;j++)
	    			if(this.beansArray[i][j] == 0)
	    				{
	    					this.putBallRandom(i,j);
	    				}
				this.effect = new cc.DelayTime(0);
			}

	    	if(this.count>=3){
	    		this.getCombo();
	    	}
	    	else
	    	{
	    		this.clearCombo();
	    	}

			if(this.count>=2)
		    	switch(this.count)
		    	{
		    		case 2:
			    		cc.audioEngine.playEffect("res/music/hit_2.mp3");
			    		break;
		    		case 3:
			    		cc.audioEngine.playEffect("res/music/hit_3.mp3");
			    		break;
		    		case 4:
			    		cc.audioEngine.playEffect("res/music/hit_4.mp3");
			    		break;
		    		case 5:
			    		cc.audioEngine.playEffect("res/music/hit_5.mp3");
			    		break;
		    		default:
			    		cc.audioEngine.playEffect("res/music/hit_6.mp3");
			    		break;
		    	}

			if(this.combo>=2)
		    	switch(this.combo)
		    	{
		    		case 2:
			    		cc.audioEngine.playEffect("res/music/combo_2.mp3");
			    		break;
		    		case 3:
			    		cc.audioEngine.playEffect("res/music/combo_3.mp3");
			    		break;
		    		case 4:
			    		cc.audioEngine.playEffect("res/music/combo_4.mp3");
			    		break;
		    		case 5:
			    		cc.audioEngine.playEffect("res/music/combo_5.mp3");
			    		break;
		    		default:
			    		cc.audioEngine.playEffect("res/music/combo_6.mp3");
			    		break;
		    	}
		    this.power+=this.count*POWER_PER_BLOCK;
		    if(this.power>1)this.power=1;
		    this.updatePowerBar();

		    var s = (SCORE_PER_BLOCK*this.count*arv(COMBO_RATE,this.combo) + arv(SCORE_EXTRA,this.count))*arv(SCORE_RATE_LEVEL,this.level);
		    this.getScore(s);
    	}
    },
    countNear:function(x,y){
    	this.count++;
    	this.countTempArray[x][y]=1;
    	if(inRange(x+1,y)&&this.countTempArray[x+1][y]==0&&this.beansArray[x+1][y]==this.beansArray[x][y]){
    		this.countNear(x+1,y);
    	}
    	if(inRange(x-1,y)&&this.countTempArray[x-1][y]==0&&this.beansArray[x-1][y]==this.beansArray[x][y]){
    		this.countNear(x-1,y);
    	}
    	if(inRange(x,y+1)&&this.countTempArray[x][y+1]==0&&this.beansArray[x][y+1]==this.beansArray[x][y]){
    		this.countNear(x,y+1);
    	}
    	if(inRange(x,y-1)&&this.countTempArray[x][y-1]==0&&this.beansArray[x][y-1]==this.beansArray[x][y]){
    		this.countNear(x,y-1);
    	}
    },
    hitBean:function(x,y)
    {
		this.spriteArray[x][y].hit();
		this.beansArray[x][y] = 0;
    },
    getCombo:function()
    {
    	this.combo++;
    	this.comboLabel.setString("X"+this.combo);
    },
    clearCombo:function()
    {
    	this.combo=0;
    	this.comboLabel.setString("X"+this.combo);
    },
    updatePowerBar:function(power)
    {
    	var progress = (this.score-SCORE_LEVEL[this.level-1])/(SCORE_LEVEL[this.level]-SCORE_LEVEL[this.level-1]);
    	if(progress>1)progress=1;
		this.progressBar.setPosition(540,140);
		this.progressBar.setTextureRect(cc.rect(829*(1-progress),0,828,105));
    },
    getScore:function(s)
    {
    	this.score+=Math.floor(s);
    	this.updateScore();
    	this.updatePowerBar();
    	if(this.level<15&&this.score>=SCORE_LEVEL[this.level])this.levelUp();
    },
	levelUp:function()
	{
		this.level++;
		this.levelLabel.setString(this.level);
		var levelUpBar = new cc.Sprite("res/playpage_word_levelup.png");
		levelUpBar.setPosition(540,880);
		levelUpBar.setOpacity(0);
		levelUpBar.runAction(new cc.Sequence(new cc.FadeTo(0.4,255),new cc.MoveBy(0.4,cc.p(0,200)),new cc.DelayTime(0.5),new cc.FadeTo(0.4,255),new cc.MoveBy(0.4,cc.p(0,200)),new cc.CallFunc(
				function(){
					this.removeFromParent();
				},levelUpBar)
		));
		this.addChild(levelUpBar);

		this.clearBoard();

		this.runAction(new cc.Sequence(new cc.DelayTime(1.5),new cc.CallFunc(this.putBlocks,this)));
	},
    updateScore:function()
    {
    	this.scoreLabel.setString(this.score);;
    },
    restart:function()
    {
		this.clearBoard();
		this.runAction(new cc.Sequence(new cc.DelayTime(1.5),new cc.CallFunc(this.newGame,this)));
    }
});

var Bean = cc.Sprite.extend({
	t:0,
	id:1,
	ctor:function(id)
	{
		this.id = id;
		this._super("res/playpage_chess_"+id+".png");
		//this.setScale(0);
		//this.runAction(new cc.Sequence(new cc.DelayTime(0.8),new cc.ScaleTo(0.2,1)));
	},
	hit:function()
	{
		_gameLayer.beansArray[this.cx][this.cy] = 0;

		this.setTexture("res/Candy_"+this.id+".png");
		this.setZOrder(2);
		this.vx = Math.random()*20-10;
		this.vy = Math.random()*10+10;

        this.setZOrder(2);

        this.stopAllActions();

        this.runAction(new cc.Sequence(new cc.ScaleTo(0.1,1.3),new cc.ScaleTo(0.1,1),new cc.DelayTime(0.4),new cc.ScaleTo(0.6,0.5)));

        this.runAction(new cc.Sequence(new cc.DelayTime(Math.random()*0.1),new cc.DelayTime(0.2),new cc.EaseBackIn(new cc.MoveTo(0.7,cc.p(540-106,1870-380))),new cc.CallFunc(this.removeFromParent, this)));

		this.scheduleUpdate();
	},
	update:function(dt)
	{
		this.t+=dt;
		if(this.t>3)this.removeFromParent();
	}
});

var IceBlock = cc.Node.extend({
	time:0,
	item:null,
	ctor:function(item)
	{
		this._super();

		this.time = ICE_BLOCK_TIME;

		this.sp = new cc.Sprite("res/playpage_ico_ice_1.png");

		this.addChild(this.sp);

		this.item = item;
		if(this.item==-2)this.sp.setOpacity(128);

	},
	hit:function()
	{
		this.time--;
		if(this.time==2)this.sp.setTexture("res/playpage_ico_ice_2.png");
		if(this.time==1)this.sp.setTexture("res/playpage_ico_ice_3.png");
		if(this.time==0)this.clash();
	},
	clash:function()
	{
		_gameLayer.beansArray[this.cx][this.cy] = 0;
		if(this.item==-2)
		{
			for(var i=this.cx-1;i<=this.cx+1;i++)
			{
				for(var j=this.cy-1;j<=this.cy+1;j++)
				{
					if(_gameLayer.beansArray[i][j]!=null&&_gameLayer.beansArray[i][j]!=0)
					{
						_gameLayer.spriteArray[i][j].hit();
					}
				}
			}
		}
		this.removeFromParent();
	}
});