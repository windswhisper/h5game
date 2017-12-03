var ParticleFactory = cc.Node.extend({
	ctor:function()
	{
		this._super();

	},
	createIceEffect:function(num)
	{
		for(var i=0;i<num;i++)
		{
			this.addChild(new IceParticle());
		}

		this.runAction(new cc.Sequence(new cc.DelayTime(1),new cc.CallFunc(this.removeFromParent,this)));
	},
	createStarEffect:function(num)
	{
		for(var i=0;i<num;i++)
		{
			this.addChild(new StarParticle());
		}

		this.runAction(new cc.Sequence(new cc.DelayTime(1),new cc.CallFunc(this.removeFromParent,this)));
	}
});

var IceParticle = cc.Node.extend({
	vx:0,
	vy:0,
	ctor:function()
	{
		this._super();


		this.setPosition(Math.random()*80-40,Math.random()*80-40);
		this.setRotation(Math.random()*360);
		this.setScale(Math.random()*1+0.5,Math.random()*1+0.5);

		this.sp = new cc.Sprite("res/ani/playpage_ico_ice_particle.png");

		this.addChild(this.sp);

		this.vx = Math.random()*12-6;
		this.vy = Math.random()*9;

		this.scheduleUpdate();
	},
	update:function(dt)
	{
		this.vy-=1;
		this.setPosition(this.getPosition().x+this.vx,this.getPosition().y+this.vy);
	}
});


var StarParticle = cc.Node.extend({
	ctor:function()
	{
		this._super();

		this.setPosition(Math.random()*20-10,Math.random()*20-10);
		this.setRotation(Math.random()*360);
		this.setScale(2);

		this.sp = new cc.Sprite("res/ani/playpage_point_3.png");

		this.addChild(this.sp);

		this.runAction(new cc.EaseQuadraticActionOut(new cc.MoveBy(0.5,cc.p(Math.random()*300-150,Math.random()*300-150))));

		this.runAction(new cc.RotateBy(0.5,Math.random()*1000-5000));

		this.sp.runAction(new cc.FadeTo(0.5,0));
	}
});