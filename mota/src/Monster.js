var MONSTER_DATA = [
					["id","名称","生命","攻击","防御","经验","金币"],
					[1,"史莱姆",20,4,0,1,0],
					[2,"红史莱姆",50,6,0,2,0],
					[3,"小蝙蝠",32,10,0,3,0],
					[4,"青史莱姆",80,20,6,8,0],
					[5,"骷髅",60,36,8,8,0],
					[6,"大蝙蝠",100,80,40,12,0],
					[7,"骷髅士兵",200,110,50,20,0],
					[8,"恶魔人",240,130,60,28,0],
					[9,"初级法师",210,200,0,30,0],
					[10,"初级护卫",320,160,180,36,0],
					[11,"石头怪",400,180,220,40,0],
					[12,"骷髅队长",300,240,150,50,0],
					[13,"红蝙蝠",440,260,220,60,0],
					[14,"史莱姆王",800,240,160,72,0],
					[15,"高级法师",550,450,100,90,0],
					[16,"麻衣法师",0,0,0,0,0],
					[17,"红衣法师",0,0,0,0,0],
					[18,"恶魔战士",0,0,0,0,0],
					[19,"蓝衣主教",0,0,0,0,0],
					[20,"青衣主教",0,0,0,0,0],
					[21,"金铠卫士",0,0,0,0,0],
					[22,"金铠队长",0,0,0,0,0],
					[23,"中级护卫",0,0,0,0,0],
					[24,"高级护卫",0,0,0,0,0],
					[25,"双手剑士",0,0,0,0,0],
					[26,"红衣主教",0,0,0,0,0],
					[27,"大主教",800,480,200,100,0],
					[28,"铁头人",0,0,0,0,0],
					[29,"史莱姆人",0,0,0,0,0]
				   ];

var Monster = cc.Node.extend({
	data:null,
	ctor:function(data)
	{
		this._super();

		this.data = data;

		this.sp = cc.Sprite.create("res/Monster"+data.value+".png");
		this.addChild(this.sp);

	},
	pushed:function(dir)
	{
		var info = MONSTER_DATA[this.data.value];
		var heroHP = _heroInfo.hp;
		var monsterHP = info[2];
		var damage = _heroInfo.atk - info[4];
		var hurt = info[3] - _heroInfo.def;
		if(damage<0)damage = 0;
		if(hurt<0)hurt = 0;
		if(damage==0){_toast.showTips("你的攻击太低了，打不过的");return;}
		while(true)
		{
			monsterHP-=damage;
			if(monsterHP<=0){this.defeated();break;}
			heroHP-=hurt;
			if(heroHP<=0){heroHP=1;_toast.showTips("胜败乃兵家常事，勇者下次再来吧");break;}
		}
		_heroInfo.hp = heroHP;
		_uilayer.showInfo();
	},
	defeated:function()
	{
		_hero.getExp(MONSTER_DATA[this.data.value][5]);

		_maplayer.removeObject(this);
		this.removeFromParent();
	}
});
