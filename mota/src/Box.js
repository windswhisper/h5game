var Box = cc.Node.extend({
	data:null,
	ctor:function(data)
	{
		this._super();

		this.data = data;

		this.sp = cc.Sprite.create("res/Box.png");
		this.addChild(this.sp);

	},
	pushed:function(dir)
	{
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

		if(x<0||x>MAP_SIZE.width-1||y<0||y>MAP_SIZE.height-1)
		{
			return false;
		}
		if((_maplayer.getGround(x,y)==GROUND_TYPE.FLOOR||_maplayer.getGround(x,y)==GROUND_TYPE.BOX_ON_WATER)&&_maplayer.getObject(x,y)==null)
		{
			this.runAction(cc.moveTo(0.1,_maplayer.convertPos(x,y)));
			this.data.px = x;
			this.data.py = y;
			return true;
		}
		if(_maplayer.getGround(x,y)==GROUND_TYPE.WATER&&_maplayer.getObject(x,y)==null)
		{
			_maplayer.setGround(x,y,GROUND_TYPE.BOX_ON_WATER);
			_maplayer.removeObject(this);
			this.removeFromParent();
			return true;
		}
	},
	clash:function()
	{
		this.removeFromParent();
		_maplayer.removeObject(this);
	}
});