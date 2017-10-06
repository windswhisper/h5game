var _uilayer;
var UILayer = cc.Node.extend({
	itemArray:[],
	ctor:function()
	{
		this._super();

		_uilayer = this;

		this.levelLabel = cc.LabelTTF.create("等级","",12);
		this.levelLabel.setPosition(23,320);
		this.levelLabel.setAnchorPoint(cc.p());
		this.addChild(this.levelLabel);

		this.hpLabel = cc.LabelTTF.create("生命值","",12);
		this.hpLabel.setPosition(23,400);
		this.hpLabel.setAnchorPoint(cc.p());
		this.addChild(this.hpLabel);

		this.atkLabel = cc.LabelTTF.create("攻击","",12);
		this.atkLabel.setPosition(23,380);
		this.atkLabel.setAnchorPoint(cc.p());
		this.addChild(this.atkLabel);

		this.defLabel = cc.LabelTTF.create("防御","",12);
		this.defLabel.setPosition(23,360);
		this.defLabel.setAnchorPoint(cc.p());
		this.addChild(this.defLabel);

		this.expLabel = cc.LabelTTF.create("经验","",12);
		this.expLabel.setPosition(23,340);
		this.expLabel.setAnchorPoint(cc.p());
		this.addChild(this.expLabel);

		this.keyLabel = cc.LabelTTF.create("钥匙","",12);
		this.keyLabel.setPosition(23,300);
		this.keyLabel.setAnchorPoint(cc.p());
		this.addChild(this.keyLabel);

		this.itemList = cc.Node.create();
		this.itemList.setPosition(PADDING.x,PADDING.y-38);
		this.addChild(this.itemList);

		this.showInfo();

      	var touchListener = {
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: false,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
        };
        cc.eventManager.addListener(touchListener, this);
        this.m_touchListener = touchListener;

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
        var p = target.itemList.convertTouchToNodeSpace(touch);

        if(_backpack.dictionary==1&&cc.rectContainsPoint(target.itemArray[0].getBoundingBox(),p))
        {
        	target.showMonsterInfo();
        }
        if(_backpack.hammer==1&&cc.rectContainsPoint(target.itemArray[1].getBoundingBox(),p))
        {
        	_hero.useHammer();
        }

    },
	showInfo:function()
	{
		this.levelLabel.setString("等级："+_heroInfo.level);
		this.hpLabel.setString("生命值："+_heroInfo.hp+"/"+_heroInfo.maxhp);
		this.atkLabel.setString("攻击："+_heroInfo.atk);
		this.defLabel.setString("防御："+_heroInfo.def);
		this.expLabel.setString("经验："+_heroInfo.exp+"/"+_hero.maxExp());
		this.keyLabel.setString("钥匙："+_backpack.keyNum);

		this.showItems();
	},
	showItems:function()
	{
		this.itemList.removeAllChildren();

		if(_backpack.dictionary!=0)
		{
			var icon = cc.Sprite.create("res/Item11.png");
			icon.setPosition(0,0);
			this.itemList.addChild(icon);
			this.itemArray[0]=icon;
		}
		if(_backpack.hammer!=0)
		{
			var icon = cc.Sprite.create("res/Item9.png");
			icon.setPosition(32,0);
			this.itemList.addChild(icon);
			this.itemArray[1]=icon;
		}
		if(_backpack.cane!=0)
		{
			var icon = cc.Sprite.create("res/Item10.png");
			icon.setPosition(64,0);
			this.itemList.addChild(icon);
			this.itemArray[2]=icon;
		}
	},
	showMonsterInfo:function()
	{
		if(!this.hasMonsterInfo)
		{
			this.hasMonsterInfo = true;
			this.monsterInfo = new MonsterInfoLayer();
			this.addChild(this.monsterInfo);
		}
		else
		{
			this.hasMonsterInfo = false;
			this.monsterInfo.removeFromParent();
		}
	}
});