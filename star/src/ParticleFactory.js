var ParticleFactory = cc.Node.extend({
	ctor:function()
	{
		this._super();

		for(var i=0;i<5;i++)
		{
			this.addChild(new IceParticle());
		}

		this.runAction(new cc.Sequence(new cc.DelayTime(1),new cc.CallFunc(this.removeFromParent,this)));
	},

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

		this.sp = new cc.Sprite("res/playpage_ico_ice_particle.png");

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