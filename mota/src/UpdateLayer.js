var UpdateLayer = cc.Node.extend({
	ctor:function()
	{
		this._super();

		var bg = cc.Sprite.create("res/black.png");
		bg.setPosition(135,172);
		bg.setOpacity(200);
		this.addChild(bg);

		var text = cc.LabelTTF.create("~~英雄升级了，请选择一项升级效果~~","",12);
		text.setPosition(135,220);
		this.addChild(text);

		var atkbtn = cc.LabelTTF.create("1：攻击+3","",12);
		atkbtn.setPosition(135,180);
		this.addChild(atkbtn);

		var defbtn = cc.LabelTTF.create("2：防御+3","",12);
		defbtn.setPosition(135,150);
		this.addChild(defbtn);

		var hpbtn = cc.LabelTTF.create("3：生命上限+40","",12);
		hpbtn.setPosition(135,120);
		this.addChild(hpbtn);

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
			case 49:_heroInfo.atk+=3;target.removeFromParent();break;
			case 50:_heroInfo.def+=3;target.removeFromParent();break;
			case 51:_heroInfo.maxhp+=40;_heroInfo.hp = _heroInfo.maxhp;target.removeFromParent();break;
		}
		_uilayer.showInfo();
	}
});