var Gate = cc.Node.extend({
	data:null,
	ctor:function(data)
	{
		this._super();

		this.data = data;

		this.sp = cc.Sprite.create("res/Gate.png");
		this.addChild(this.sp);

	},
	pushed:function(dir)
	{
		var info = GATE_DATA[this.data.value];

		_maplayer.saveData();
		_maplayer.loadData(info[0]);

		_maplayer.putObject(info[1],info[2],1,0);
	},
	walkedon:function()
	{
	}
});