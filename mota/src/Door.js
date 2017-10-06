//1:钥匙门 2:监狱门 3:机关门

var Door = cc.Node.extend({
	data:null,
	ctor:function(data)
	{
		this._super();

		this.data = data;

		this.sp = cc.Sprite.create("res/Door"+data.value+".png");
		this.addChild(this.sp);

	},
	pushed:function(dir)
	{
		switch(this.data.value)
		{
			case 1:
				if(_backpack.keyNum>=1)
				{
					_backpack.keyNum--;
					this.open();
				}
				else 
				{
					_toast.showTips("需要使用钥匙才能打开");
				}
				break;
			case 2:
				this.open();
				break;
			case 3:
				_toast.showTips("需要启动机关才能打开");
				break;
		}
		_uilayer.showInfo();
	},
	open:function()
	{
		_maplayer.removeObject(this);
		this.removeFromParent();
	}
});