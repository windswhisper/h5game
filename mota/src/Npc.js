NPC_DATA = [
			["name","text"],
			["精灵","这里就是魔塔","拿钥匙开门就能进去了","里面都是怪物，请小心"],
			["老人","宝石和装备能让你变得更强","建议尽快拿到"],
			["商人","升级生命上限时也会补满血哦","不过尽量不要用到更好"],
			["小偷",""],
			["公主","你好，我是作者阿浩","因为这个版本数值有点崩","我打算重制本作品","所以你的冒险旅程只能到这里了","如果你想联系我","请发邮件到649008904@qq.com","最后，很感谢你来玩这个游戏！"]
			];


var Npc = cc.Node.extend({
	data:null,
	ctor:function(data)
	{
		this._super();

		this.data = data;

		this.id = data.value;

		this.name = NPC_DATA[this.id][0]

		this.textNum = 1;

		this.sp = cc.Sprite.create("res/NPC"+this.id+".png");

		this.addChild(this.sp);
	},
	pushed:function()
	{
		this.speak();
		this.schedule(this.speak, 3);  
	},
	speak:function(dt)
	{
		_toast.showTips(NPC_DATA[this.id][this.textNum]);
		this.textNum++;
		if(this.textNum>=NPC_DATA[this.id].length)
		{
			this.textNum = 1;
			this.unschedule(this.speak);
		}
	}
});