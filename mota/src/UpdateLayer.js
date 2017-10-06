var UpdateLayer = cc.Node.extend({
	ctor:function()
	{
		this._super();

		var self = this;

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
        	event: cc.EventListener.TOUCH_ONE_BY_ONE,
        	swallowTouches: true,   
        	onTouchBegan: function (touch, event) {
        		var p = self.convertToNodeSpace(touch.getLocation()); 

        		if(cc.rectContainsPoint(atkbtn.getBoundingBox(),p))
        			self.select(1);
        		if(cc.rectContainsPoint(defbtn.getBoundingBox(),p))
        			self.select(2);
        		if(cc.rectContainsPoint(hpbtn.getBoundingBox(),p))
        			self.select(3);
        		return true;
        	}
    	}, this);

	 	var listener1 = cc.EventListener.create({
	        event: cc.EventListener.TOUCH_ONE_BY_ONE,
	        swallowTouches: true, 
	        onTouchBegan: function (touch, event) {
        		var p = self.convertToNodeSpace(touch.getLocation()); 
        		if(cc.rectContainsPoint(atkbtn.getBoundingBox(),p))
        			self.select(1);
        		if(cc.rectContainsPoint(defbtn.getBoundingBox(),p))
        			self.select(2);
        		if(cc.rectContainsPoint(hpbtn.getBoundingBox(),p))
        			self.select(3);
        		return true;
        	}
	    });
	    cc.eventManager.addListener(listener1, this);
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
			case 49:target.select(1);break;
			case 50:target.select(2);break;
			case 51:target.select(3);break;
		}
	},
	select:function(option){
		switch(option)
		{
			case 1:_heroInfo.atk+=3;this.remove();break;
			case 2:_heroInfo.def+=3;this.remove();break;
			case 3:_heroInfo.maxhp+=40;_heroInfo.hp = _heroInfo.maxhp;this.remove();break;
		}
		_uilayer.showInfo();
	},
	remove:function()
	{
		var self = this;
		this.schedule(function(){
			self.removeFromParent();
		}.bind(this),0);
	}

});