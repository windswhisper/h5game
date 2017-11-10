var BOARD_SIZE = cc.size(7,9);
var BLOCK_SIZE = cc.size(144,144);

var SCORE_PER_BLOCK = 2;
var POWER_PER_BLOCK = 0.02;
var SCORE_LEVEL = [100,500,2000,4000,8000,12000,15000,20000,25000,32000,40000,50000,75000,100000];
var SCORE_RATE_LEVEL = [1,2,5,10,20,50,80,100,150,200,240,240,300,400];
var POWER_RATE_LEVEL = [1,1,0.5,0.5,0.5,3,3,2,2,4,4,3,3,3,3,3,2.5];
var COLOR_LEVEL = [3,4,4,4,4,5,5,5,5,6];
var COMBO_RATE = [1,1,1.2,1.5,1.8,2.0];
var SCORE_EXTRA = [0,0,0,0,10,10,10,10,20,20,50];

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

	score:0,
	combo:0,
	level:1,
	power:1,

	ctor:function()
	{
		this._super();

		var bg = new cc.Sprite("res/playpage_bg.png");
		bg.setPosition(540,960);
		this.addChild(bg);


		var bgBoard = new cc.Sprite("res/playpage_chessbg.png");
		bgBoard.setPosition(540,960);
		this.addChild(bgBoard);

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
		this.updatePowerBar(0.5);

		this.btnPause = new cc.Sprite("res/btn_pause.png");
		this.btnPause.setPosition(130,140);
		bottomView.addChild(this.btnPause);

        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: false,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
        }, this);
		this.scheduleUpdate();
	},
	update:function(dt)
	{
		this.power-=dt/20;
		this.updatePowerBar(this.power);
		if(this.power<0)
		{
			alert("能量耗尽，胜败乃兵家常事，请英雄再来一次吧");
			this.unscheduleUpdate();
		}
	}

	newGame:function()
	{
		for(var i=0;i<BOARD_SIZE.width;i++)
		{
			for(var j=0;j<BOARD_SIZE.height;j++)
			{
				this.putBall(i,j);
			}
		}
	},
	putBall:function(x,y)
	{
		this.beansArray[x][y] = Math.floor(Math.random()*arv(COLOR_LEVEL,this.level))+1;
		this.spriteArray[x][y] = new Bean("res/playpage_chess_"+this.beansArray[x][y]+".png");
		this.spriteArray[x][y].setPosition(x*BLOCK_SIZE.width,y*BLOCK_SIZE.height);
		this.boardNode.addChild(this.spriteArray[x][y]);
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
        var p = target.boardNode.convertTouchToNodeSpace(touch);

        p.x += BLOCK_SIZE.width/2;
        p.y += BLOCK_SIZE.height/2;

        var x= Math.floor(p.x/BLOCK_SIZE.width);
        var y= Math.floor(p.y/BLOCK_SIZE.height);

        target.clickxy(x,y);
    },
    clickxy:function(x,y)
    {
    	this.count = 0;
		for(var i=0;i<BOARD_SIZE.width;i++)
			for(var j=0;j<BOARD_SIZE.height;j++)
    			this.countTempArray[i][j] = 0;
    	this.countNear(x,y);
    	if(this.count>=2)
    	{
			for(var i=0;i<BOARD_SIZE.width;i++)
				for(var j=0;j<BOARD_SIZE.height;j++)
	    			if(this.countTempArray[i][j] != 0)
	    				{
	    					this.hitBean(i,j);
	    					this.putBall(i,j);
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
		    this.power+=this.count*arv(POWER_RATE_LEVEL,this.level)*POWER_PER_BLOCK;
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
		this.progressBar.setPosition(540,140);
		this.progressBar.setTextureRect(cc.rect(829*(1-power),0,828,105));
    },
    getScore:function(s)
    {
    	this.score+=Math.floor(s);
    	this.updateScore();
    	if(this.level<15&&this.score>SCORE_LEVEL[this.level])this.levelUp();
    },
	levelUp:function()
	{
		this.level++;
		this.levelLabel.setString(this.level);
	},
    updateScore:function()
    {
    	this.scoreLabel.setString(this.score);;
    }
});

var Bean = cc.Sprite.extend({
	ctor:function(picName)
	{
		this._super(picName);
		this.setScale(0);
		this.runAction(new cc.Sequence(new cc.DelayTime(0.8),new cc.ScaleTo(0.2,1)));
	},
	hit:function()
	{
		this.setZOrder(2);
		this.vx = Math.random()*20-10;
		this.vy = Math.random()*10+10;
		this.scheduleUpdate();
	},
	update:function(dt)
	{
		this.setPosition(this.getPosition().x+this.vx,this.getPosition().y+this.vy);
		this.vy-=1.5;
		if(this.getPosition().y<-300)this.removeFromParent();
	}
});