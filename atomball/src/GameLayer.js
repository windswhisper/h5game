var BOARD_SIZE = cc.size(8,8);
var BLOCK_SIZE = cc.size(65,65);
var _gamelayer;
var GameLayer = cc.Layer.extend({
	boardNode:null,
	selectPos:null,
	ballsArray:[],
	spriteArray:[],
	depthMap:[],
    score:0,
    comboNum:0,
	destX:0,
	destY:0,
	ctor:function()
	{
		this._super();
        _gamelayer = this;

        this.board = cc.Sprite.create("res/board.png");
        this.board.setPosition(270,400);
        this.addChild(this.board);

        this.btnSetting = cc.Sprite.create("res/btn_setting.png");
        this.btnSetting.setPosition(40,900);
        this.addChild(this.btnSetting);


        this.scoreFrame = cc.Sprite.create("res/score.png");
        this.scoreFrame.setPosition(360,900);
        this.addChild(this.scoreFrame);

        this.scoreLabel = cc.LabelTTF.create(this.score||"0","Arial Black",64);
        this.scoreLabel.setContentSize(330,64);
        this.scoreLabel.setPosition(520,860);
        this.scoreLabel.setAnchorPoint(cc.p(1,0));
        this.scoreLabel.setHorizontalAlignment(0);
        this.addChild(this.scoreLabel);

		for(var i=-1;i<=BOARD_SIZE.width;i++)
		{
			this.ballsArray[i] = new Array();
			this.spriteArray[i] = new Array();
		}
		for(var i=-1;i<=BOARD_SIZE.width;i++)
		{
			for(var j=-1;j<=BOARD_SIZE.height;j++)
			{
				this.ballsArray[i][j]=0;
			}
		}
		this.boardNode = cc.Node.create();
		this.boardNode.setPosition(42,172);
		this.addChild(this.boardNode);

        this.selectFrame = cc.Sprite.create("res/frame.png");
        this.selectFrame.setVisible(false);
        this.boardNode.addChild(this.selectFrame);
		this.newGame();

        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: false,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
        }, this);
	},
    updateScore:function()
    {
        this.scoreLabel.setString(this.score);
    },
	newGame:function()
	{
		this.addSomeBalls(8);
	},
	addBall:function(x,y,type)
	{
		this.ballsArray[x][y] = type;
		this.spriteArray[x][y] = new Ball("res/"+type+".png");
		this.spriteArray[x][y].setPosition(x*BLOCK_SIZE.width,y*BLOCK_SIZE.height);
		this.boardNode.addChild(this.spriteArray[x][y]);

		this.checkMatch(x,y);
	},
	addOneRandomBall:function()
	{
		var space = 0;
		for(var i=0;i<BOARD_SIZE.width;i++)
		{
			for(var j=0;j<BOARD_SIZE.height;j++)
			{
				if(this.ballsArray[i][j]==0)space++;
			}
		}
		if(space==0)return false;
		var randnum = Math.floor(Math.random()*space);
		var randtype = Math.floor(Math.random()*5)+1;
		var k = 0;
		for(var i=0;i<BOARD_SIZE.width;i++)
		{
			for(var j=0;j<BOARD_SIZE.height;j++)
			{
				if(this.ballsArray[i][j]==0)
				{
					k++;
					if(k == randnum)
					{
						this.addBall(i,j,randtype);
						break;
					}
				}
			}
		}
	},
	addSomeBalls:function(n)
	{
		for(var i=0;i<n;i++)
		{
			this.addOneRandomBall();
		}
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
        if(x<0||y<0||x>=BOARD_SIZE.width||y>=BOARD_SIZE.height)return;
    	if(this.ballsArray[x][y]!=0)
		{
            this.selectBall(x,y)
		}
		else if(this.selectPos!=null&&this.ballsArray[x][y]==0)
		{
			this.moveBall(this.selectPos.x,this.selectPos.y,x,y);
            this.unselectBall();
		}
    },
    selectBall:function(x,y)
    {
            this.selectPos = cc.p(x,y);
            this.selectFrame.setVisible(true);
            this.selectFrame.setPosition(x*BLOCK_SIZE.width,y*BLOCK_SIZE.height);
    },
    unselectBall:function()
    {
            this.selectPos = null;
            this.selectFrame.setVisible(false);
    },
    moveBall:function(x,y,tx,ty)
    {
    	var b = this.ballsArray[x][y];
    	this.ballsArray[tx][ty] = 0;
    	this.ballsArray[x][y] = 0;
    	if(this.findDepth(x,y,tx,ty))
    	{
            this.ballsArray[tx][ty] = b;
    	    this.spriteArray[tx][ty] = this.spriteArray[x][y];
    	    this.spriteArray[x][y] = null;
        }
        else
            this.ballsArray[x][y] = b;

    },
    checkMatch:function(x,y)
    {	
    	var b = this.ballsArray[x][y];
        var isMatch = false;
    	if(this.ballsArray[x+1][y] == b && this.ballsArray[x+1][y+1] == b && this.ballsArray[x][y+1] == b)
    	{
    		if(this.spriteArray[x][y]!=null)
    		{
    			this.spriteArray[x][y].hit();
    			this.spriteArray[x][y] = null;
    		}
    		if(this.spriteArray[x+1][y]!=null)
    		{
    			this.spriteArray[x+1][y].hit();
    			this.spriteArray[x+1][y] = null;
    		}
    		if(this.spriteArray[x][y+1]!=null)
    		{
    			this.spriteArray[x][y+1].hit();
    			this.spriteArray[x][y+1] = null;
    		}
    		if(this.spriteArray[x+1][y+1]!=null)
    		{
    			this.spriteArray[x+1][y+1].hit();
    			this.spriteArray[x+1][y+1] = null;
    		}
            isMatch = true;
    	}
    	if(this.ballsArray[x+1][y] == b && this.ballsArray[x+1][y-1] == b && this.ballsArray[x][y-1] == b)
    	{
    		if(this.spriteArray[x][y]!=null)
    		{
    			this.spriteArray[x][y].hit();
    			this.spriteArray[x][y] = null;
    		}
    		if(this.spriteArray[x+1][y]!=null)
    		{
    			this.spriteArray[x+1][y].hit();
    			this.spriteArray[x+1][y] = null;
    		}
    		if(this.spriteArray[x][y-1]!=null)
    		{
    			this.spriteArray[x][y-1].hit();
    			this.spriteArray[x][y-1] = null;
    		}
    		if(this.spriteArray[x+1][y-1]!=null)
    		{
    			this.spriteArray[x+1][y-1].hit();
    			this.spriteArray[x+1][y-1] = null;
    		}
            isMatch = true;
    	}
    	if(this.ballsArray[x-1][y] == b && this.ballsArray[x-1][y-1] == b && this.ballsArray[x][y-1] == b)
    	{
    		if(this.spriteArray[x][y]!=null)
    		{
    			this.spriteArray[x][y].hit();
    			this.spriteArray[x][y] = null;
    		}
    		if(this.spriteArray[x-1][y]!=null)
    		{
    			this.spriteArray[x-1][y].hit();
    			this.spriteArray[x-1][y] = null;
    		}
    		if(this.spriteArray[x][y-1]!=null)
    		{
    			this.spriteArray[x][y-1].hit();
    			this.spriteArray[x][y-1] = null;
    		}
    		if(this.spriteArray[x-1][y-1]!=null)
    		{
    			this.spriteArray[x-1][y-1].hit();
    			this.spriteArray[x-1][y-1] = null;
    		}
            isMatch = true;
    	}
    	if(this.ballsArray[x-1][y] == b && this.ballsArray[x-1][y+1] == b && this.ballsArray[x][y+1] == b)
    	{
    		if(this.spriteArray[x][y]!=null)
    		{
    			this.spriteArray[x][y].hit();
    			this.spriteArray[x][y] = null;
    		}
    		if(this.spriteArray[x-1][y]!=null)
    		{
    			this.spriteArray[x-1][y].hit();
    			this.spriteArray[x-1][y] = null;
    		}
    		if(this.spriteArray[x][y+1]!=null)
    		{
    			this.spriteArray[x][y+1].hit();
    			this.spriteArray[x][y+1] = null;
    		}
    		if(this.spriteArray[x-1][y+1]!=null)
    		{
    			this.spriteArray[x-1][y+1].hit();
    			this.spriteArray[x-1][y+1] = null;
    		}
            isMatch = true;
    	}
		for(var i = 0;i<BOARD_SIZE.height;i++)
			for(var j = 0;j<BOARD_SIZE.width;j++)
				if(this.spriteArray[i][j]==null&&this.ballsArray[i][j]!=0)
                {
                    this.ballsArray[i][j]=0;
                    this.score+=10*(this.comboNum+1);
                }
        this.updateScore();
        return isMatch;
    },
    findDepth:function(x,y,tx,ty)
    {
		for(var i = -1;i<=BOARD_SIZE.height;i++)
		{
			this.depthMap[i] = new Array();
			for(var j = -1;j<=BOARD_SIZE.width;j++)
				this.depthMap[i][j]=999;
		}
		this.destX = tx;
		this.destY = ty;
		this.markMap(tx,ty,0);
		if(this.depthMap[x][y]==999)return false;

		var action = cc.DelayTime.create(0)
		var ballSprite = this.spriteArray[x][y];
		while(x!=tx||y!=ty)
		{
			var b = this.depthMap[x][y];
			var dx = 0;
			var dy = 0;
			if(b==this.depthMap[x+1][y]+1)dx++;
			else if(b==this.depthMap[x][y+1]+1)dy++;
			else if(b==this.depthMap[x-1][y]+1)dx--;
			else if(b==this.depthMap[x][y-1]+1)dy--;

			x+=dx;
			y+=dy;

			action = cc.Sequence.create(action,cc.MoveBy.create(0.03,cc.p(dx*BLOCK_SIZE.width,dy*BLOCK_SIZE.height)))
		}

        action = cc.Sequence.create(action,cc.CallFunc.create(this.movedCallback,this,cc.p(tx,ty)));
		ballSprite.runAction(action);
        this.isMoving = true;
        return true;
    },
    movedCallback:function(target,p)
    {
        
        var isMatch = this.checkMatch(p.x,p.y);
        if(!isMatch)
        {
            this.comboFail();
            this.addSomeBalls(3);
        }
        else
        {
            this.combo();
        }
        this.isMoving = false;
    },
    markMap:function(x,y,step)
    {
		if(x<0||x>BOARD_SIZE.width-1||y<0||y>BOARD_SIZE.height-1)
		{
			return;
		}
    	if(this.ballsArray[x][y]==0)
    	{
    		if(this.depthMap[x][y]>step)
    		{
	    		this.depthMap[x][y] = step;
	    		this.markMap(x-1,y,step+1);
	    		this.markMap(x,y-1,step+1);
	    		this.markMap(x,y+1,step+1);
	    		this.markMap(x+1,y,step+1);
    		}
    	}
    },
    combo:function()
    {
        this.comboNum++;
    },
    comboFail:function()
    {
        this.comboNum = 0;
    },
    clearBoard:function()
    {
        for(var i=0;i<BOARD_SIZE.width;i++)
        {
            for(var j=0;j<BOARD_SIZE.height;j++)
            {
                if(this.ballsArray[i][j]!=0)
                {
                    this.ballsArray[i][j] = 0;
                    this.spriteArray[i][j].hit();
                }
            }
        }
    }
});

var Ball = cc.Sprite.extend({
	ctor:function(picName)
	{
		this._super(picName);
        this.setScale(0);
        this.runAction(cc.ScaleTo.create(0.2,1));
	},
	hit:function()
	{
		this.setZOrder(2);
		this.vx = Math.random()*16-8;
		this.vy = Math.random()*3+10;
		this.scheduleUpdate();
	},
	update:function(dt)
	{
		this.setPosition(this.getPosition().x+this.vx,this.getPosition().y+this.vy);
		this.vy-=1;
		if(this.getPosition().y<-300)this.removeFromParent();
	}
});