var MonsterInfoNode = cc.Node.extend({
	ctor:function(id)
	{
		this._super();

		var icon = cc.Sprite.create("res/Monster"+id+".png");
		icon.setPosition(0,0);
		this.addChild(icon);


		var nameLabel = cc.LabelTTF.create(MONSTER_DATA[id][1],"",8);
		nameLabel.setPosition(20,0);
		nameLabel.setAnchorPoint(cc.p());
		this.addChild(nameLabel);

		var hpLabel = cc.LabelTTF.create("生命 "+MONSTER_DATA[id][2],"",8);
		hpLabel.setPosition(20,-20);
		hpLabel.setAnchorPoint(cc.p());
		this.addChild(hpLabel);

		var atkLabel = cc.LabelTTF.create("攻击 "+MONSTER_DATA[id][3],"",8);
		atkLabel.setPosition(65,-20);
		atkLabel.setAnchorPoint(cc.p());
		this.addChild(atkLabel);

		var defLabel = cc.LabelTTF.create("防御 "+MONSTER_DATA[id][4],"",8);
		defLabel.setPosition(110,-20);
		defLabel.setAnchorPoint(cc.p());
		this.addChild(defLabel);

		var expLabel = cc.LabelTTF.create("经验 "+MONSTER_DATA[id][5],"",8);
		expLabel.setPosition(155,-20);
		expLabel.setAnchorPoint(cc.p());
		this.addChild(expLabel);

		var hurt;
		if(_heroInfo.atk<=MONSTER_DATA[id][4])hurt = "???";
		else 
		{
			var onehurt = MONSTER_DATA[id][3]-_heroInfo.def;
			if(onehurt<0)onehurt = 0;
			hurt = Math.ceil(MONSTER_DATA[id][2]/(_heroInfo.atk-MONSTER_DATA[id][4])-1)*(onehurt);
		}
		var hurtLabel = cc.LabelTTF.create("伤害 "+hurt,"",8);
		hurtLabel.setPosition(130,-0);
		hurtLabel.setAnchorPoint(cc.p());
		this.addChild(hurtLabel);
	}
	
})

var MonsterInfoLayer = cc.Node.extend({
	ctor:function()
	{
		this._super();

		var bg = cc.Sprite.create("res/black.png");
		bg.setPosition(135,172);
		bg.setOpacity(200);
		this.addChild(bg);
		var monsterList = new Array();
		for(var i = 0;i<_maplayer.objectData.length;i++)
		{
			if(_maplayer.objectData[i].data.type==2)
			{
				monsterList[_maplayer.objectData[i].data.value] = 1;
			}
		}
		var num = 0;
		for(var i = 0;i<999;i++)
		{
			if(monsterList[i]==1)
			{	
				var infoNode = new MonsterInfoNode(i);
				infoNode.setPosition(40,num*-40+260);
				this.addChild(infoNode);
				num++;
			}
		}

		cc.eventManager.addListener({     
        event: cc.EventListener.KEYBOARD,     
        onKeyPressed:  this.keyDown, 
        }, this);  


	},
	keyDown:function(keyCode, event)
	{
		var target = event.getCurrentTarget();
		event.stopPropagation();

		switch(keyCode)
		{
			case 32:_uilayer.showMonsterInfo();break;
		}

	}
});