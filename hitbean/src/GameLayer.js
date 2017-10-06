var BOARD_SIZE = cc.size(10,10);
var BLOCK_SIZE = cc.size(50,50);
var GameLayer = cc.Layer.extend({
	boardNode:null,
	beansArray:[],
	spriteArray:[],
	ctor:function()
	{
		this._super();

		for(var i=0;i<BOARD_SIZE.width;i++)
		{
			this.beansArray[i] = new Array();
			this.spriteArray[i] = new Array();
		}
		this.boardNode = cc.Node.create();
		this.boardNode.setPosition(45,45);
		this.addChild(this.boardNode);
		this.newGame();

        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: false,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
        }, this);
	},
	newGame:function()
	{
		for(var i=0;i<BOARD_SIZE.width;i++)
		{
			for(var j=0;j<BOARD_SIZE.height;j++)
			{
				this.beansArray[i][j] = Math.floor(Math.random()*6);
				if(this.beansArray[i][j]!=0)
				{
					this.spriteArray[i][j] = new Bean("res/"+this.beansArray[i][j]+".png");
					this.spriteArray[i][j].setPosition(i*BLOCK_SIZE.width,j*BLOCK_SIZE.height);
					this.boardNode.addChild(this.spriteArray[i][j]);
				}
			}
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

		if(x<0||x>BOARD_SIZE.width-1||y<0||y>BOARD_SIZE.height-1)
		{
			return;
		}
		else if(this.beansArray[x][y]!=0)
		{
			return;
		}
		else
		{
			var beanUp = y;
			var beanDown = y;
			var beanLeft = x;
			var beanRight = x;
			for(var i = x;i>=0;i--)
			{
				if(this.beansArray[i][y]!=0)
				{
					beanLeft = i;
					break;
				}
			}
			for(var i = x;i<BOARD_SIZE.width;i++)
			{
				if(this.beansArray[i][y]!=0)
				{
					beanRight = i;
					break;
				}
			}
			for(var j = y;j>=0;j--)
			{
				if(this.beansArray[x][j]!=0)
				{
					beanDown = j;
					break;
				}
			}
			for(var j = y;j<BOARD_SIZE.height;j++)
			{
				if(this.beansArray[x][j]!=0)
				{
					beanUp = j;
					break;
				}
			}
		}

		var flagUp = 0;
		var flagDown = 0;
		var flagLeft = 0;
		var flagRight = 0;
		if(this.beansArray[beanLeft][y]!=0)
		{
			if(this.beansArray[beanLeft][y]==this.beansArray[beanRight][y])
			{
				flagLeft = 1;
				flagRight = 1;
			}
			if(this.beansArray[beanLeft][y]==this.beansArray[x][beanUp])
			{
				flagLeft = 1;
				flagUp = 1;
			}
			if(this.beansArray[beanLeft][y]==this.beansArray[x][beanDown])
			{
				flagLeft = 1;
				flagDown = 1;
			}
		}
		if(this.beansArray[beanRight][y]!=0)
		{
			if(this.beansArray[beanRight][y]==this.beansArray[x][beanUp])
			{
				flagRight = 1;
				flagUp = 1;
			}
			if(this.beansArray[beanRight][y]==this.beansArray[x][beanDown])
			{
				flagRight = 1;
				flagDown = 1;
			}
		}
		if(this.beansArray[x][beanDown]!=0)
		{
			if(this.beansArray[x][beanDown]==this.beansArray[x][beanUp])
			{
				flagDown = 1;
				flagUp = 1;
			}
		}

		if(flagLeft)
		{
			this.hitBean(beanLeft,y);
		}
		if(flagRight)
		{
			this.hitBean(beanRight,y);
		}
		if(flagUp)
		{
			this.hitBean(x,beanUp);
		}
		if(flagDown)
		{
			this.hitBean(x,beanDown);
		}
    },
    hitBean:function(x,y)
    {
		this.spriteArray[x][y].hit();

		this.beansArray[x][y] = 0;
    }
});

var Bean = cc.Sprite.extend({
	ctor:function(picName)
	{
		this._super(picName);
	},
	hit:function()
	{
		this.setZOrder(2);
		this.vx = Math.random()*8-4;
		this.vy = Math.random()*6+4;
		this.scheduleUpdate();
	},
	update:function(dt)
	{
		this.setPosition(this.getPosition().x+this.vx,this.getPosition().y+this.vy);
		this.vy-=1;
		if(this.getPosition().y<-300)this.removeFromParent();
	}
});