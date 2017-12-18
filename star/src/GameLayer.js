var BOARD_SIZE = cc.size(7,9);
var BLOCK_SIZE = cc.size(144,144);

var DROP_DURATION = 1;

var SCORE_PER_BLOCK = 	10;//单个方块消除分数
var COMBO_RATE = 		[1,1,2];//连击加成比率
var SCORE_EXTRA = 		[0,0,0,0,10,10,10,20,20,20,50];//多消额外加分
var ICE_BLOCK_TIME = 	3;//冰块需打破次数

//关卡序号						1 		2 		3 		4 		5 		6 		7 		8 		9 		10 		11 		12 		13 		14 		15 		16 		17 		18 	 	19		20

var SCORE_LEVEL = 		[0,		1000,	2500,	4000,	6000,	9000,	11500,	14000,	16500,	20000,	25000,	32000,	38000,	42000,	50000,	53000,	58000,	64000,	800000,	100000,	200000];//过关需要分数
var ICE_BLOCK_RATE = 	[0,		0,		10,		10,		10,		5,		8,		8,		20,		0,		5,		12,		5,		11,		0,		0,		5,		0,		0,		0,		0];//冰块出现概率随等级提高
var ITEM_BOMB_RATE = 	[0,		0,		0,		0,		0,		2,		5,		5,		2,		0,		4,		2,		10,		5,		30,		3,		5,		2,		15,		0,		5];//炸弹出现概率
var ITEM_COIN_RATE = 	[0,		0,		0,		0,		0,		1,		1,		1,		0,		0,		2,		2,		2,		2,		0,		0,		0,		20,		5,		0,		25];//金币出现概率
var COLOR_LEVEL = 		[0,		4,		4,		5,		5,		5,		5,		5,		5,		5,		5,		5,		5,		5,		5,		6,		6,		5,		6,		6,		4];//方块颜色随等级提高
var SCORE_RATE_LEVEL = 	[1];

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
	// --1--
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
	// --2--
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
	// --3--
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
	// --4--
	[
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	1,2,0,0,0,2,1,
	1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,
	1,2,0,0,0,2,1,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0
	],
	// --5--
	[
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,1,2,1,2,1,0,
	0,1,1,1,1,1,0,
	0,0,0,0,0,0,0,
	0,1,3,1,3,1,0,
	0,1,1,1,1,1,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0
	],
	// --6--
	[
	1,1,1,1,1,1,1,
	0,1,1,1,1,1,0,
	0,0,1,1,1,0,0,
	0,0,0,1,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	3,0,0,0,0,0,3
	],
	// --7--
	[
	0,0,0,1,0,0,0,
	0,0,1,3,1,0,0,
	0,0,0,1,0,0,0,
	0,1,0,0,0,1,0,
	1,3,1,0,1,3,1,
	0,1,0,0,0,1,0,
	0,0,0,1,0,0,0,
	0,0,1,3,1,0,0,
	0,0,0,1,0,0,0
	],
	// --8--
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
	// --9--
	[
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	1,2,1,1,1,2,1,
	1,3,1,1,1,3,1,
	1,2,1,3,1,2,1,
	1,2,1,1,1,2,1,
	1,2,2,2,2,2,1,
	1,1,1,1,1,1,1
	],
	// --10--
	[
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	1,1,0,0,0,1,1,
	3,1,0,0,0,1,3,
	1,1,1,0,1,1,1,
	1,3,1,0,1,3,1,
	3,3,3,3,3,3,3
	],
	// --11--
	[
	1,3,1,3,1,3,1,
	3,0,0,0,0,0,3,
	1,0,0,0,0,0,1,
	3,0,0,0,0,0,3,
	1,0,0,0,0,0,1,
	3,0,0,0,0,0,3,
	1,0,0,0,0,0,1,
	3,0,0,0,0,0,3,
	1,3,1,3,1,3,1,
	],
	// --12--
	[
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	3,3,3,3,3,3,3,
	3,3,3,3,3,3,3,
	3,3,3,3,3,3,3,
	3,3,3,3,3,3,3,
	3,3,3,3,3,3,3
	],
	// --13--
	[
	0,0,0,1,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	1,0,0,0,0,0,1,
	1,2,0,0,0,2,1,
	1,1,1,0,1,1,1,
	1,1,1,1,1,1,1,
	1,2,1,1,1,2,1,
	1,1,1,1,1,1,1,
	],
	// --14--
	[
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,2,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0
	],
	// --15--
	[
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,3,0,0,0,
	0,0,3,3,3,0,0,
	0,0,0,3,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0
	],
	// --16--
	[
	0,0,0,3,0,0,0,
	0,0,3,0,3,0,0,
	0,3,0,0,0,3,0,
	3,0,0,0,0,0,3,
	0,0,0,0,0,0,0,
	3,0,0,0,0,0,3,
	0,3,0,0,0,3,0,
	0,0,3,0,3,0,0,
	0,0,0,3,0,0,0
	],
	// --17--
	[
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,3,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0
	],
	// --18--
	[
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,
	0,2,0,0,0,2,0,
	0,0,0,0,0,0,0,
	0,0,0,2,0,0,0,
	0,0,0,0,0,0,0,
	0,2,0,0,0,2,0,
	0,0,0,0,0,0,0,
	0,0,0,0,0,0,0
	],
	// --19--
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
	// --20--
	[
	1,1,1,0,0,0,0,
	1,0,0,0,0,0,0,
	1,1,1,0,0,0,0,
	1,0,0,0,0,0,0,
	1,1,1,0,1,1,0,
	0,0,0,0,1,0,1,
	0,0,0,0,1,0,1,
	0,0,0,0,1,0,1,
	0,0,0,0,1,1,0
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
	realScore:0,
	scoreDisplay:0,
	powerDisplay:0,
	combo:0,
	comboTime:0,
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

		this.topView = new cc.Node();
		this.topView.setPosition(0,200);
		this.addChild(this.topView);

		var topBar = new cc.Sprite("res/playpage_Top.png");
		topBar.setPosition(540,1827);
		this.topView.addChild(topBar);

		this.scoreLabel = new FontPng(75,0);
		this.scoreLabel.setPosition(540,1870);
		this.topView.addChild(this.scoreLabel);

		this.comboLabel = new FontPng(75,"X0");
		this.comboLabel.setPosition(150,1870);
		this.topView.addChild(this.comboLabel);

		this.levelLabel = new FontPng(75,1);
		this.levelLabel.setPosition(930,1870);
		this.topView.addChild(this.levelLabel);


		this.bottomView = new cc.Node();
		this.bottomView.setPosition(0,-200);
		this.addChild(this.bottomView);

		var progressBg = new cc.Sprite("res/playpage_progress_bg.png");
		progressBg.setPosition(540,140);
		this.bottomView.addChild(progressBg); 

		this.progressBar = new cc.Sprite("res/playpage_progress.png");
		this.progressBar.setPosition(540,140);
		this.bottomView.addChild(this.progressBar); 

		this.btnPause = new cc.Sprite("res/btn_pause.png");
		this.btnPause.setPosition(130,140);
		this.bottomView.addChild(this.btnPause);

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

		this.comboTag = new cc.Sprite("res/playpage_word_comboadd.png");
		this.comboTag.setPosition(540,1700);
		this.comboTag.setOpacity(0);
		this.addChild(this.comboTag);

		this.showBars();

		this.untouch = true;

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
		this.comboTime+=dt;
		if(this.scoreDisplay<this.score)
		{
			this.scoreDisplay+=Math.ceil((this.score-this.scoreDisplay)/30);
    		this.scoreLabel.setString(this.scoreDisplay);
    	}
    		this.updatePowerBar();
	},
	showBars:function()
	{
		this.bottomView.runAction(new cc.EaseSineOut(new cc.MoveBy(0.4,cc.p(0,200))));
		this.topView.runAction(new cc.EaseSineOut(new cc.MoveBy(0.4,cc.p(0,-200))));
	},
	hideBars:function()
	{
		this.bottomView.runAction(new cc.EaseSineOut(new cc.MoveBy(1,cc.p(0,-200))));
		this.topView.runAction(new cc.EaseSineOut(new cc.MoveBy(1,cc.p(0,200))));
	},
	newGame:function()
	{
		this.level = 1;
		this.levelLabel.setString(1);
		this.combo = 0;
		this.score = 0;
		this.realScore = 0;
		this.scoreDisplay = 0;
		this.scoreLabel.setString(0);
		this.clearCombo();
		this.putBlocks();
		this.updatePowerBar();
		this.showHint();
	},

	clearBoard:function()
	{
		this.untouch = true;

		for(var i=0;i<BOARD_SIZE.width;i++)
		{
			for(var j=0;j<BOARD_SIZE.height;j++)
			{
				this.spriteArray[i][j].runAction(new cc.Sequence(new cc.DelayTime((BOARD_SIZE.height-j-1)*0.1),new cc.Spawn(new cc.FadeTo(0.3,0),new cc.EaseQuadraticActionOut(new cc.ScaleTo(0.5,0))),
					new cc.CallFunc(this.spriteArray[i][j].removeFromParent,this.spriteArray[i][j])));
			}
		}

		this.boardNode.runAction(new cc.Sequence(new cc.DelayTime(1.3),new cc.CallFunc(this.boardNode.removeAllChildren,this.boardNode)));
	},

	putBlocks:function()
	{
		this.runAction(new cc.Sequence(new cc.DelayTime(1.2),new cc.CallFunc(function(){_gameLayer.untouch=false})));
		this.boardNode.removeAllChildren();
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

	},
	putBallRandom:function(x,y)
	{
		if(arv(ICE_BLOCK_RATE,this.level)>Math.random()*100)
		{
			this.putBall(x,y,-1);
		}
		else if(arv(ITEM_BOMB_RATE,this.level)>Math.random()*100)
		{
			this.putBall(x,y,-2);
		}
		else if(arv(ITEM_COIN_RATE,this.level)>Math.random()*100)
		{
			this.putBall(x,y,-3);
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
    	if(x<0||x>=BOARD_SIZE.width)return;
    	if(y<0||y>=BOARD_SIZE.height)return;
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
	    					if(i-1>=0&&this.beansArray[i-1][j]<0)this.countTempArray[i-1][j]=-1;
	    					if(j-1>=0&&this.beansArray[i][j-1]<0)this.countTempArray[i][j-1]=-1;
	    					if(i+1<BOARD_SIZE.width&&this.beansArray[i+1][j]<0)this.countTempArray[i+1][j]=-1;
	    					if(j+1<BOARD_SIZE.height&&this.beansArray[i][j+1]<0)this.countTempArray[i][j+1]=-1;
	    				}


			for(var i=0;i<BOARD_SIZE.width;i++)
				for(var j=0;j<BOARD_SIZE.height;j++)
				{
					if(this.countTempArray[i][j]==-1)
					{
						this.spriteArray[i][j].knock();
					}
	    		}

	    	this.fillBoard();

	    	if(this.comboTime<2){
	    		this.getCombo();
	    	}
	    	else
	    	{
	    		this.clearCombo();
	    	}


		    	switch(this.combo)
		    	{
		    		case 3:
			    		cc.audioEngine.playEffect("res/music/hit_3.mp3");
			    		break;
		    		case 6:
			    		cc.audioEngine.playEffect("res/music/hit_4.mp3");
			    		break;
		    		case 9:
			    		cc.audioEngine.playEffect("res/music/hit_5.mp3");
			    		break;
		    		default:
			    		cc.audioEngine.playEffect("res/music/hit_2.mp3");
			    		break;
		    	}

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
    fillBoard:function()
    {
			for(var i=0;i<BOARD_SIZE.width;i++)
				for(var j=0;j<BOARD_SIZE.height;j++)
				{
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

			if(this.checkFail())this.gameOver();
    },
    checkFail:function()
    {
		for(var i=0;i<BOARD_SIZE.width;i++)
			for(var j=0;j<BOARD_SIZE.height;j++)
    			this.countTempArray[i][j] = 0;

		for(var i=0;i<BOARD_SIZE.width;i++)
			for(var j=0;j<BOARD_SIZE.height;j++)
			{
				if(this.beansArray[i][j]==-2&&this.spriteArray[i][j].time<=0)return false;
				if(this.beansArray[i][j]<0)continue;
    			this.count = 0;
				this.countNear(i,j);
				if(this.count>1)
				{
					return false;
				}
			}
		return true;
    },
    hitBean:function(x,y)
    {
		this.spriteArray[x][y].hit();
		this.beansArray[x][y] = 0;
    },
    getCombo:function()
    {
    	this.comboTime = 0;
    	this.combo++;
    	if(this.combo>=2)
    	{
	    	this.comboLabel.setString("X"+this.combo);
	    	this.comboLabel.stopAllActions();
	    	this.comboLabel.setScale(1);
    		this.comboLabel.runAction(new cc.Sequence(new cc.EaseSineIn( new cc.ScaleTo(0.05,1.1)),new cc.EaseSineIn( new cc.ScaleTo(0.1,1))));

	    	this.comboTag.stopAllActions();
	    	this.comboTag.setOpacity(255);
	    	this.comboTag.setPosition(540,1650);
	    	this.comboTag.setScale(1);
	    	this.comboTag.runAction(new cc.Sequence(new cc.ScaleTo(0.1,1.25),new cc.DelayTime(0.6),new cc.FadeTo(0.8,0)));
	    }
    },
    clearCombo:function()
    {
    	this.combo=0;
    	this.comboTime = 0;
    	this.comboLabel.setString("X"+this.combo);
    },
    updatePowerBar:function(power)
    {
    	var progress = (this.score-SCORE_LEVEL[this.level-1])/(SCORE_LEVEL[this.level]-SCORE_LEVEL[this.level-1]);

    	this.powerDisplay+=(progress-this.powerDisplay)/50;
    	if(this.powerDisplay>1)this.powerDisplay=1;
    	if(this.powerDisplay<0)this.powerDisplay=0;

		this.progressBar.setPosition(540-791/2*(1-this.powerDisplay),140);
		this.progressBar.setTextureRect(cc.rect(0,0,791*this.powerDisplay,66));
    },
    getScore:function(s)
    {
    	var sInt = Math.floor(s)
    	this.realScore+=sInt;
    	this.runAction(new cc.Sequence(new cc.DelayTime(1),new cc.CallFunc(function(){
    		_gameLayer.score+=sInt;
    	})));
    	if(this.realScore>=SCORE_LEVEL[this.level])this.levelUp();
    },
	levelUp:function()
	{

		_gameLayer.level++;
		cc.audioEngine.playEffect("res/music/level_up.mp3");
		this.runAction(new cc.Sequence(new cc.DelayTime(3),new cc.CallFunc(function(){
			_gameLayer.levelLabel.setString(_gameLayer.level);
		})));
		var levelUpBar = new cc.Sprite("res/playpage_word_levelup.png");
		levelUpBar.setPosition(540,880);
		levelUpBar.setOpacity(0);
		levelUpBar.runAction(new cc.Sequence(new cc.FadeTo(0.4,255),new cc.MoveBy(0.4,cc.p(0,200)),new cc.DelayTime(0.5),new cc.FadeTo(0.4,255),new cc.MoveBy(0.4,cc.p(0,200)),new cc.CallFunc(
				function(){
					this.removeFromParent();
				},levelUpBar)
		));
		this.addChild(levelUpBar);

		this.untouch = true;

		if(this.level>20)
		{
			this.level=20;
			this.runAction(new cc.Sequence(new cc.DelayTime(4),new cc.CallFunc(this.showOverLayer,this)));
		}
		else
		{
			this.runAction(new cc.Sequence(new cc.DelayTime(3.5),new cc.CallFunc(this.putBlocks,this)));
		}
		this.runAction(new cc.Sequence(new cc.DelayTime(1.75),new cc.CallFunc(this.clearBoard,this)));

		for(var i=0;i<BOARD_SIZE.width;i++)
			for(var j=0;j<BOARD_SIZE.height;j++)
			{
				if(this.beansArray[i][j]==-2)
				{
					this.spriteArray[i][j].cancleItem = true;
				}
			}
	},
    updateScore:function()
    {
    	this.scoreLabel.stopAllActions();
    	this.scoreLabel.runAction(new cc.Sequence(new cc.EaseSineIn( new cc.ScaleTo(0.05,1.2)),new cc.EaseSineIn( new cc.ScaleTo(0.1,1))));
    },
    restart:function()
    {
		this.clearBoard();
		this.runAction(new cc.Sequence(new cc.DelayTime(1.5),new cc.CallFunc(this.newGame,this)));
    },
    gameOver:function()
    {
    	this.untouch = true;

		for(var i=0;i<BOARD_SIZE.width;i++)
		{
			for(var j=0;j<BOARD_SIZE.height;j++)
			{
				this.spriteArray[i][j].runAction(new cc.Sequence(new cc.DelayTime(2+Math.random()*0.5),new cc.EaseSineIn(new cc.MoveBy(0.05+Math.random()*0.05,cc.p(Math.random()*20-10,Math.random()*20-10))),new cc.EaseSineIn(new cc.MoveBy(0.05+Math.random()*0.05,cc.p(Math.random()*20-10,Math.random()*20-10))),new cc.EaseSineIn(new cc.MoveBy(0.05+Math.random()*0.05,cc.p(Math.random()*20-10,Math.random()*20-10))),new cc.EaseSineIn(new cc.MoveBy(0.05+Math.random()*0.05,cc.p(Math.random()*20-10,Math.random()*20-10))),new cc.EaseSineIn(new cc.MoveBy(0.05+Math.random()*0.05,cc.p(Math.random()*20-10,Math.random()*20-10))),new cc.EaseSineIn(new cc.MoveBy(0.05+Math.random()*0.05,cc.p(Math.random()*20-10,Math.random()*20-10))),new cc.EaseSineIn(new cc.MoveBy(0.05+Math.random()*0.05,cc.p(Math.random()*20-10,Math.random()*20-10))),new cc.EaseSineIn(new cc.MoveBy(0.05+Math.random()*0.05,cc.p(Math.random()*20-10,Math.random()*20-10))),new cc.EaseSineIn(new cc.MoveBy(0.05+Math.random()*0.05,cc.p(Math.random()*20-10,Math.random()*20-10))),
					new cc.CallFunc(this.spriteArray[i][j].explore,this.spriteArray[i][j])));
			}
		}

		this.runAction(new cc.Sequence(new cc.DelayTime(4),new cc.CallFunc(this.showOverLayer,this)));
    },
    showOverLayer:function()
    {
    	this.addChild(new OverLayer(this));
    	this.hideBars();
    },
    showHint:function()
    {

		for(var l=0;l<BOARD_SIZE.width;l++)
		{
			for(var k=0;k<BOARD_SIZE.height;k++)
			{
				var i = (l+3)%BOARD_SIZE.width;
				var j= (k+3)%BOARD_SIZE.height;
				if(this.beansArray[i][j]==-2&&this.spriteArray[i][j].time<=0)return false;
				if(this.beansArray[i][j]<0)continue;
    			this.count = 0;
				for(var m=0;m<BOARD_SIZE.width;m++)
					for(var n=0;n<BOARD_SIZE.height;n++)
		    			this.countTempArray[m][n] = 0;
				this.countNear(i,j);
				if(this.count>1)
				{
					break;
				}
			}
			if(this.count>1)
			{
				break;
			}
			
		}

		for(var i=0;i<BOARD_SIZE.width;i++)
			for(var j=0;j<BOARD_SIZE.height;j++)
			{
    			if(this.countTempArray[i][j]!=0)
    			{
    				var hintTag = new cc.Sprite("res/tile_shine.png");
    				hintTag.setOpacity(0);
    				hintTag.runAction(new cc.Sequence(new cc.DelayTime(1.5),new cc.FadeTo(0.5,255),new cc.FadeTo(0.5,72),new cc.FadeTo(0.5,255),new cc.FadeTo(0.5,72),new cc.FadeTo(0.5,255),new cc.FadeTo(0.5,72),new cc.FadeTo(0.5,255),new cc.FadeTo(1,0)));
    				hintTag.setPosition(72,72);
    				this.spriteArray[i][j].addChild(hintTag);
    			}
			}
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
	knock:function()
	{

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
        this.removeAllChildren();

        this.runAction(new cc.Sequence(new cc.ScaleTo(0.1,1.3),new cc.ScaleTo(0.1,1),new cc.DelayTime(0.4),new cc.ScaleTo(0.6,0.5)));

        this.runAction(new cc.Sequence(new cc.DelayTime(Math.random()*0.1),new cc.DelayTime(0.2),new cc.EaseBackIn(new cc.MoveTo(0.7,cc.p(540-106,1870-380))),new cc.CallFunc(this.clashStar, this)));
	},
	clashStar:function()
	{
		var starParticle = new ParticleFactory();
		starParticle.createStarEffect(3);
		starParticle.setPosition(this.getPosition());
		_gameLayer.boardNode.addChild(starParticle);
		_gameLayer.updateScore();
		this.removeFromParent();
	},
	explore:function()
	{
		this.scheduleUpdate();
		this.vx = Math.random()*12-6;
		this.vy = Math.random()*8+8;
		this.scheduleUpdate();
	},
	update:function(dt)
	{
		this.setPosition(this.getPosition().x+this.vx,this.getPosition().y+this.vy);
		this.vy-=1;
		if(this.getPosition().y<-300)this.removeFromParent();
	}
});

var IceBlock = cc.Node.extend({
	time:0,
	item:null,
	cancleItem:false,
	ctor:function(item)
	{
		this._super();

		this.time = ICE_BLOCK_TIME;

		this.setCascadeOpacityEnabled(true);

		this.sp = new cc.Sprite("res/playpage_ico_ice_1.png");

		this.addChild(this.sp);

		this.item = item;
		if(this.item==-2)
		{
			this.itemSp = new cc.Sprite("res/playpage_chess_bomb.png");

			this.addChild(this.itemSp,-1);
		}
		if(this.item==-3)
		{
			this.itemSp = new cc.Sprite("res/playpage_chess_coin.png");

			this.addChild(this.itemSp,-1);
		}

	},
	knock:function()
	{
		this.time--;
		if(this.time==2)this.sp.setTexture("res/playpage_ico_ice_2.png");
		if(this.time==1)this.sp.setTexture("res/playpage_ico_ice_3.png");
		if(this.time==0)this.hit();
		else
		{
			var iceParticle = new ParticleFactory();
			iceParticle.createIceEffect(7-this.time*2);
			iceParticle.setPosition(this.getPosition());
			_gameLayer.boardNode.addChild(iceParticle);
			dx = 16*Math.random()-8;
			dy = 16*Math.random()-8;
			this.runAction(new cc.Sequence(new cc.EaseSineIn(new cc.MoveBy(0.05,cc.p(dx,dy))),new cc.EaseSineIn(new cc.MoveBy(0.05,cc.p(-2*dx,-2*dy))),new cc.EaseSineIn(new cc.MoveBy(0.05,cc.p(dx,dy)))));
	
		}

		cc.audioEngine.playEffect("res/music/ice_clash.mp3");
		
	},
	hit:function()
	{
		if(this.item==-2)
		{
			this.time = 0;
			this.runAction(new cc.Sequence(new cc.DelayTime(1.3),new cc.CallFunc(this.itemBomb,this)));
			this.sp.removeFromParent();
			this.itemSp.runAction(new cc.Sequence(new cc.ScaleTo(0.4,1.05),new cc.ScaleTo(0.4,0.9),new cc.ScaleTo(0.5,1.2)));
		}
		else if(this.item==-3)
		{
			this.time = 0;
			this.runAction(new cc.Sequence(new cc.DelayTime(0.4),new cc.CallFunc(this.itemCoin,this)));
			this.sp.removeFromParent();
			this.itemSp.runAction(new cc.Spawn(new cc.ScaleTo(0.4,1.1),new cc.FadeTo(0.4,0)));
		}
		else
		{
			_gameLayer.getScore(4);
			_gameLayer.beansArray[this.cx][this.cy] = 0;
			this.removeFromParent();
		}

		var iceParticle = new ParticleFactory();
		iceParticle.createIceEffect(7);
		iceParticle.setPosition(this.getPosition());
		_gameLayer.boardNode.addChild(iceParticle);
		dx = 16*Math.random()-8;
		dy = 16*Math.random()-8;
		this.runAction(new cc.Sequence(new cc.EaseSineIn(new cc.MoveBy(0.05,cc.p(dx,dy))),new cc.EaseSineIn(new cc.MoveBy(0.05,cc.p(-2*dx,-2*dy))),new cc.EaseSineIn(new cc.MoveBy(0.05,cc.p(dx,dy)))));
	
	},
	itemBomb:function()
	{
		if(!this.cancleItem)
		{
			_gameLayer.getScore(80);
			for(var i=this.cx-1;i<=this.cx+1;i++)
			{
				for(var j=this.cy-1;j<=this.cy+1;j++)
				{
					if(inRange(i,j)&&_gameLayer.beansArray[i][j]!=null&&_gameLayer.beansArray[i][j]!=0)
					{
						if(i==this.cx&&j==this.cy)continue;
						_gameLayer.spriteArray[i][j].hit();
					}
				}
			}
			_gameLayer.beansArray[this.cx][this.cy] = 0;
			_gameLayer.fillBoard();
		}
		cc.audioEngine.playEffect("res/music/bomb.mp3");

		var bomoParticle = new ParticleFactory();
		bomoParticle.createStarEffect(10);
		bomoParticle.setPosition(this.getPosition());
		_gameLayer.boardNode.addChild(bomoParticle);

		this.removeFromParent();
	},
	itemCoin:function()
	{
		if(!this.cancleItem)
		{
			_gameLayer.getScore(250);
			cc.audioEngine.playEffect("res/music/item_coin.mp3");

			_gameLayer.beansArray[this.cx][this.cy] = 0;
			_gameLayer.fillBoard();
			
			var coinParticle = new ParticleFactory();
			coinParticle.createCoinEffect(5,this.getPosition());
			_gameLayer.boardNode.addChild(coinParticle);

			this.removeFromParent();
		}
	},
	explore:function()
	{
		this.scheduleUpdate();
		this.vx = Math.random()*12-6;
		this.vy = Math.random()*8+8;
		this.scheduleUpdate();
	},
	update:function(dt)
	{
		this.setPosition(this.getPosition().x+this.vx,this.getPosition().y+this.vy);
		this.vy-=1;
		if(this.getPosition().y<-300)this.removeFromParent();
	}
});