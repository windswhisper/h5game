var ITEM_INFO = [	["ID","名称","说明"],
					[1,"小钥匙","可以打开黄色的门"],
					[2,"红宝石","提升英雄4点攻击"],
					[3,"蓝宝石","提升英雄4点防御"],
					[4,"黄宝石","提升英雄25点最大生命值"],
					[5,"小血瓶","恢复英雄20%生命值"],
					[6,"大血瓶","恢复英雄50%生命值"],
					[7,"铁剑","提升英雄10点攻击"],
					[8,"铁盾","提升英雄20点防御"],
					[9,"锤子","可以打破挡路的箱子"],
					[10,"魔杖","可以发射远程飞弹"],
					[11,"怪物图鉴","可以查看怪物的属性"],
					[12,"钢剑","提升英雄25点攻击"],
					[13,"钢盾","提升英雄40点防御"],
				]

var Item = cc.Node.extend({
	data:null,
	ctor:function(data)
	{
		this._super();

		this.data = data;

		this.sp = cc.Sprite.create("res/Item"+data.value+".png");
		this.addChild(this.sp);
	},
	pushed:function(dir)
	{
		switch(this.data.value)
		{
			case 1:_backpack.keyNum++;break;
			case 2:_heroInfo.atk+=4;break;
			case 3:_heroInfo.def+=4;break;
			case 4:_heroInfo.maxhp+=25;break;
			case 5:
				_heroInfo.hp = Math.floor(_heroInfo.hp+_heroInfo.maxhp*0.2);
				if(_heroInfo.hp>_heroInfo.maxhp)_heroInfo.hp = _heroInfo.maxhp;
				break;
			case 6:
				_heroInfo.hp = Math.floor(_heroInfo.hp+_heroInfo.maxhp*0.5);
				if(_heroInfo.hp>_heroInfo.maxhp)_heroInfo.hp = _heroInfo.maxhp;
				break;
			case 7:_heroInfo.atk+=10;break;
			case 8:_heroInfo.def+=20;break;
			case 9:_backpack.hammer = 1;break;
			case 10:_backpack.cane = 1;break;
			case 11:_backpack.dictionary = 1;break;
			case 12:_heroInfo.atk+=25;break;
			case 13:_heroInfo.def+=40;break;
		}
		_toast.showTips(ITEM_INFO[this.data.value][1]+"："+ITEM_INFO[this.data.value][2]);
		_uilayer.showInfo();
		_maplayer.removeObject(this);
		this.removeFromParent();
	}
});