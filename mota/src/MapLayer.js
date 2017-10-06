var MAP_SIZE = cc.size(7,7);
var TILE_SIZE = cc.size(32,32);
var PADDING = cc.p(23,60);

var DIRECTION = {
	UP:1,
	RIGHT:2,
	DOWN:3,
	LEFT:4
};

var ObjectInfo = cc.Node.extend({
	px:null,
	py:null,
	type:null,
	value:null,
	ctor:function(px,py,type,value)
	{
		this._super();
		this.px = px;
		this.py = py;
		this.type = type;
		this.value = value;
	}
});

var MapTile = cc.Node.extend({
	type:null,
	sp:null,
	ctor:function(type)
	{
		this._super();
		switch(type)
		{
		case GROUND_TYPE.FLOOR:
			this.sp = cc.Sprite.create("res/Floor.png");
			break;
		case GROUND_TYPE.WALL:
			this.sp = cc.Sprite.create("res/wall.png");
			break;
		case GROUND_TYPE.WATER:
			this.sp = cc.Sprite.create("res/water.png");
			break;
		case GROUND_TYPE.BOX_ON_WATER:
			this.sp = cc.Sprite.create("res/Boxonwater.png");
			break;
		}
		this.addChild(this.sp);
	}
});

var _maplayer;
var MapLayer = cc.Node.extend({
	mapID:null,
	groundData:null,
	groundTiles:null,
	objectData:null,
	ctor:function()
	{
		this._super();
		_maplayer = this;

		this.setPosition(PADDING.x,PADDING.y);

		this.loadData(0);

		cc.eventManager.addListener({     
        event: cc.EventListener.KEYBOARD,     
        onKeyPressed:  this.keyDown, 
        }, this);  

        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: false,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
        }, this);

	},
	loadData:function(map_id)
	{
		this.mapID = map_id;
		this.removeAllChildren();
		this.groundData = new Array();
		this.groundTiles = new Array();
		this.objectData = new Array();
		var map_data = MAP_DATA[map_id];
		for(var i=0;i<MAP_SIZE.height;i++)
			for(var j=0;j<MAP_SIZE.width;j++)
			{
				this.setGround(i,j,map_data.groundData[j*MAP_SIZE.width+i]);
			}
		for(var i=0;i<map_data.objectData.length;i++)
		{
			var info = map_data.objectData[i];
			this.putObject(info[0],info[1],info[2],info[3])
		}
	},
	saveData:function()
	{
		MAP_DATA[this.mapID].groundData = this.groundData;
		MAP_DATA[this.mapID].objectData = new Array();

		for(var i=0;i<this.objectData.length;i++)
		{
			var info = this.objectData[i].data;
			if(info.type!=1)
				MAP_DATA[this.mapID].objectData.push([info.px,info.py,info.type,info.value]);
		}
	},
	getGround:function(x,y)
	{
		return this.groundData[y*MAP_SIZE.width+x];
	},
	setGround:function(x,y,type)
	{
		this.groundData[y*MAP_SIZE.width+x] = type;

		var tile = new MapTile(this.getGround(x,y));
		tile.setPosition(this.convertPos(x,y));
		this.addChild(tile,1);

		if(this.groundTiles[y*MAP_SIZE.width+x]!=null)this.groundTiles[y*MAP_SIZE.width+x].removeFromParent();
		this.groundTiles[y*MAP_SIZE.width+x] = tile;
	},
	getObject:function(x,y)
	{
		for(var i=0;i<this.objectData.length;i++)
		{
			var obj = this.objectData[i];
			if(obj.data.px == x&&obj.data.py == y)return obj;
		}
		return null;
	},
	putObject:function(x,y,type,value)
	{
		var obj;
		var objInfo = new ObjectInfo(x,y,type,value);
		switch(type)
		{
			case OBJECT_TYPE.HERO:obj = new Hero(objInfo);break;
			case OBJECT_TYPE.MONSTER:obj = new Monster(objInfo);break;
			case OBJECT_TYPE.BOX:obj = new Box(objInfo);break;
			case OBJECT_TYPE.GATE:obj = new Gate(objInfo);break;
			case OBJECT_TYPE.ITEM:obj = new Item(objInfo);break;
			case OBJECT_TYPE.DOOR:obj = new Door(objInfo);break;
			case OBJECT_TYPE.NPC:obj = new Npc(objInfo);break;
		}
		this.objectData.push(obj);
		obj.setPosition(this.convertPos(obj.data.px,obj.data.py))
		this.addChild(obj,2);
	},
	removeObject:function(obj)
	{
		for(var i=0;i<this.objectData.length;i++)
		{
			if(obj == this.objectData[i])
			{
				this.objectData.splice(i,1);
				break;
			}
		}
	},
	convertPos:function(x,y)
	{
		return cc.p(x*TILE_SIZE.width+TILE_SIZE.width/2,y*TILE_SIZE.height+TILE_SIZE.height/2);
	},
	trywalk:function(x,y,dir)
	{
		if(x<0||x>MAP_SIZE.width-1||y<0||y>MAP_SIZE.height-1)
		{
			return false;
		}
		if(this.getGround(x,y) == GROUND_TYPE.WALL || this.getGround(x,y) == GROUND_TYPE.WATER)
		{
			return false;
		}
		if(this.getObject(x,y)!=null)
		{
			return this.getObject(x,y).pushed(dir);
		}
		return true;
	},
	walkon:function(x,y)
	{

	},
	keyDown:function(keyCode, event)
	{
		switch(keyCode)
		{
			case 37:_hero.walk(DIRECTION.LEFT);break;
			case 38:_hero.walk(DIRECTION.UP);break;
			case 39:_hero.walk(DIRECTION.RIGHT);break;
			case 40:_hero.walk(DIRECTION.DOWN);break;
			case 32:_uilayer.showMonsterInfo();break;
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
        var p = target.convertTouchToNodeSpace(touch);

        var x= Math.floor(p.x/TILE_SIZE.width);
        var y= Math.floor(p.y/TILE_SIZE.height);

		if(x<0||x>MAP_SIZE.width-1||y<0||y>MAP_SIZE.height-1)
		{
			return;
		}
		else _hero.setDest(x,y);

    }
});