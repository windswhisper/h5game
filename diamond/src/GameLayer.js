var _gamelayer;
var BOARD_SIZE = cc.size(7,7);
var BLOCK_SIZE = cc.size(70,70);
var GameLayer = cc.Layer.extend({
	boardNode:null,
	selectPos:null,
	diamondArray:[],
	spriteArray:[],
	stage:null,
	ctor:function()
	{
		this._super();
		_gamelayer = this;

		for(var i=0;i<BOARD_SIZE.width;i++)
		{
			this.diamondArray[i] = new Array();
			this.spriteArray[i] = new Array();
		}
		this.boardNode = cc.Node.create();
		this.boardNode.setPosition(65,65);
		this.addChild(this.boardNode);

		this.newGame(0);

        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: false,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
        }, this);
	},
	newGame:function(stage)
	{
		this.boardNode.removeAllChildren();
		this.stage = stage;
		for(var i=0;i<BOARD_SIZE.width;i++)
		{
			for(var j=0;j<BOARD_SIZE.height;j++)
			{
				this.diamondArray[i][j] = StagesData[stage][i][j]
				if(this.diamondArray[i][j]==1)
					this.putDiamond(i,j);
				if(this.diamondArray[i][j]==2)
					this.putBlock(i,j);
			}
		}
		

        this.selectFrame = cc.Sprite.create("res/frame.png");
        this.selectFrame.setVisible(false);
        this.boardNode.addChild(this.selectFrame);

	},
	restartStage:function()
	{
		this.newGame(this.stage)
	},
	putDiamond:function(x,y)
	{
		this.diamondArray[x][y] = 1;
		this.spriteArray[x][y] = new Bean("res/1.png");
		this.spriteArray[x][y].setPosition(x*BLOCK_SIZE.width,y*BLOCK_SIZE.height);
		this.boardNode.addChild(this.spriteArray[x][y]);
	},
	putBlock:function(x,y)
	{
		this.diamondArray[x][y] = 2;
		this.spriteArray[x][y] = new Bean("res/block.png");
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
        if(x<0||y<0||x>=BOARD_SIZE.width||y>=BOARD_SIZE.height)return;
    	if(this.diamondArray[x][y]!=0)
		{
            this.selectDiamond(x,y)
		}
		else if(this.selectPos!=null&&this.diamondArray[x][y]==0)
		{
			this.moveDiamond(this.selectPos.x,this.selectPos.y,x,y);
		}
    },
    moveDiamond:function(x,y,tx,ty)
    {
    	if(Math.abs(tx-x)==2&&ty==y)
    	{
    		if(this.diamondArray[x/2+tx/2][y]==1)
    		{
    			this.spriteArray[x/2+tx/2][y].hit();
    			this.diamondArray[x/2+tx/2][y]=0;

		    	this.spriteArray[x][y].runAction(cc.MoveTo.create(0.3,cc.p(tx*BLOCK_SIZE.width,ty*BLOCK_SIZE.height)));

		    	var b = this.diamondArray[x][y];
		    	this.diamondArray[x][y] = 0;
		        this.diamondArray[tx][ty] = b;
		    	this.spriteArray[tx][ty] = this.spriteArray[x][y];
		    	this.spriteArray[x][y] = null;

		    	this.selectDiamond(tx,ty);
    		}
    	}
    	if(Math.abs(ty-y)==2&&tx==x)
    	{
    		if(this.diamondArray[x][y/2+ty/2]==1)
    		{
    			this.spriteArray[x][y/2+ty/2].hit();
    			this.diamondArray[x][y/2+ty/2]=0;
    			
		    	this.spriteArray[x][y].runAction(cc.MoveTo.create(0.3,cc.p(tx*BLOCK_SIZE.width,ty*BLOCK_SIZE.height)));

		    	var b = this.diamondArray[x][y];
		    	this.diamondArray[x][y] = 0;
		        this.diamondArray[tx][ty] = b;
		    	this.spriteArray[tx][ty] = this.spriteArray[x][y];
		    	this.spriteArray[x][y] = null;

		    	this.selectDiamond(tx,ty);
    		}
    	}
    },
    selectDiamond:function(x,y)
    {
            this.selectPos = cc.p(x,y);
            this.selectFrame.setVisible(true);
            this.selectFrame.setPosition(x*BLOCK_SIZE.width,y*BLOCK_SIZE.height);
    },
    unselectDiamond:function()
    {
            this.selectPos = null;
            this.selectFrame.setVisible(false);
    },
    hitBean:function(x,y)
    {
		this.spriteArray[x][y].hit();

		this.diamondArray[x][y] = 0;
    }
});

var Bean = cc.Sprite.extend({
	t:null,
	ctor:function(picName)
	{
		this._super(picName);
	},
	hit:function()
	{
		this.setZOrder(0);
		this.t = 0;
		this.scheduleUpdate();
	},
	update:function(dt)
	{
		this.t+=dt;
		if(this.t>0.15)this.removeFromParent();
	}
});