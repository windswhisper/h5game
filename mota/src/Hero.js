//英雄起始属性为hp100，atk5，def0
//升级需要的经验是当前等级*10，如1级10点，2级20点
//每升一级提高10~20hp，2~4atk，1~2def，以及手动选择强化10hp或2atk，1def
var _heroInfo = {
	level:1,
	maxhp:200,
	hp:200,
	atk:10,
	def:0,
	exp:0,
};
var _backpack = {
	keyNum:0,
	swordList:[],
	shieldList:[],
	necklaceList:[],	
	hammer:0,
	dictionary:0,
	cane:0,
};

var _hero;
var Hero = cc.Node.extend({
	data:null,
	isWalking:false,
	direction:3,
	depthMap:[],
	ctor:function(data)
	{
		this._super();

		_hero = this;

		this.data = data;
		this.destX = this.data.px;
		this.destY = this.data.py;

		this.sp = cc.Sprite.create("res/Braver3.png");
		this.addChild(this.sp);

      	this.scheduleUpdate();
	},
	update:function(dt)
	{
		var x = this.data.px;
		var y = this.data.py;
		if(x!=this.destX||y!=this.destY)
		{
			if(this.depthMap[x+1][y]<this.depthMap[x][y])
				this.walkxy(x+1,y);
			else if(this.depthMap[x-1][y]<this.depthMap[x][y])
				this.walkxy(x-1,y);
			else if(this.depthMap[x][y+1]<this.depthMap[x][y])
				this.walkxy(x,y+1);
			else if(this.depthMap[x][y-1]<this.depthMap[x][y])
				this.walkxy(x,y-1);
		}
	},
	walk:function(dir)
	{
		if(this.isWalking)return;
		this.direction = dir;
		this.sp.setTexture("res/Braver"+dir+".png");
		var x = this.data.px;
		var y = this.data.py;
		if(dir == DIRECTION.UP)
			y++;
		if(dir == DIRECTION.RIGHT)
			x++;
		if(dir == DIRECTION.DOWN)
			y--;
		if(dir == DIRECTION.LEFT)
			x--;
		if(_maplayer.trywalk(x,y,dir))
		{
			this.moveTo(x,y);
			this.destX = x;
			this.destY = y;
		}
	},
	walkxy:function(x,y)
	{
		if(this.isWalking)return;
		var dir;
		var dx = x-this.data.px;
		var dy = y-this.data.py;
		if(dy==1)
			dir = DIRECTION.UP;
		if(dx==1)
			dir = DIRECTION.RIGHT;
		if(dy==-1)
			dir = DIRECTION.DOWN;
		if(dx==-1)
			dir = DIRECTION.LEFT;
		this.direction = dir;
		this.sp.setTexture("res/Braver"+dir+".png");
		if(_maplayer.trywalk(x,y,dir))
		{
			this.moveTo(x,y);
		}
		else
		{
			this.destX = this.data.px;
			this.destY = this.data.py;
		}
	},
	moveTo:function(x,y)
	{
			_maplayer.walkon(x,y);
			this.runAction(cc.moveTo(0.1,_maplayer.convertPos(x,y)));
			this.data.px = x;
			this.data.py = y;
			this.isWalking = true;
			this.scheduleOnce(this.resetWalking, 0.11);
	},
	resetWalking:function()
	{
		this.isWalking = false;
	},
	getExp:function(exp)
	{
		_heroInfo.exp+=exp;
		if(_heroInfo.exp>=this.maxExp())
		{
			this.levelUp();
		}
	},
	maxExp:function()
	{
		return 8+_heroInfo.level*2;
	},
	levelUp:function()
	{
		_heroInfo.exp-=this.maxExp();
		_heroInfo.level+=1;
		//_heroInfo.maxhp+=Math.floor(Math.random()*10)+10;
		//_heroInfo.atk+=Math.floor(Math.random()*3)+2;
		//_heroInfo.def+=Math.floor(Math.random()*2)+1;
		_heroInfo.maxhp+=15;
		_heroInfo.atk+=4;
		_heroInfo.def+=1;

		_uilayer.addChild(new UpdateLayer());
	},
	useHammer:function()
	{
		var x = this.data.px;
		var y = this.data.py;
		var dir = this.direction;
		if(dir == DIRECTION.UP)
			y++;
		if(dir == DIRECTION.RIGHT)
			x++;
		if(dir == DIRECTION.DOWN)
			y--;
		if(dir == DIRECTION.LEFT)
			x--;
		var obj = _maplayer.getObject(x,y);
		if(obj!=null&&obj.data.type == OBJECT_TYPE.BOX)
		{
			_toast.showTips("打破箱子");
			obj.clash();
		}
		else 
		{
			_toast.showTips("请对着箱子使用");
		}
	},
    setDest:function(x,y)
    {
		for(var i = -1;i<=MAP_SIZE.height;i++)
		{
			this.depthMap[i] = new Array();
			for(var j = -1;j<=MAP_SIZE.width;j++)
				this.depthMap[i][j]=999;
		}
		if(Math.abs(x-_hero.data.px)+Math.abs(y-_hero.data.py)==1)
		{
			_hero.walkxy(x,y);
		}
		else
		{
			this.destX = x;
			this.destY = y;
			this.markMap(x,y,0);
		}
    },
    markMap:function(x,y,step)
    {
		if(x<0||x>MAP_SIZE.width-1||y<0||y>MAP_SIZE.height-1)
		{
			return;
		}
    	if((x==this.data.px&&y==this.data.py)||(x==this.destX&&y==this.destY)||((_maplayer.getGround(x,y)==0||_maplayer.getGround(x,y)==3)&&_maplayer.getObject(x,y)==null))
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
    }
});