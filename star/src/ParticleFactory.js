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
	},
	createCoinEffect:function(num,position)
	{
		for(var i=0;i<num;i++)
		{
			var cp = new CoinParticle(i);
			cp.setPosition(position);
			this.addChild(cp);
		}

		this.runAction(new cc.Sequence(new cc.DelayTime(1),new cc.CallFunc(this.removeFromParent,this)));
	},
	createLevelUpEffect:function(num,dir){
		for(var i=0;i<num;i++)
		{
			this.addChild(new StarParticle2(dir));
		}

		this.runAction(new cc.Sequence(new cc.DelayTime(10),new cc.CallFunc(this.removeFromParent,this)));
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

		this.runAction(new cc.RotateBy(0.5,Math.random()*1000-500));

		this.sp.runAction(new cc.FadeTo(0.5,0));
	}
});


var StarParticle2 = cc.Node.extend({
	dir:null,
	ctor:function(dir)
	{
		this._super();
		this.dir = dir;

		this.setPosition(Math.random()*20-10,Math.random()*20-10);
		this.setRotation(Math.random()*360);

		//var i = ["res/ani/star_1.png","res/ani/star_2.png","res/ani/star_3.png","res/ani/star_1.png"];

		this.sp = new cc.Sprite("res/ani/star_1.png");

		this.sp.setColor(cc.color(Math.random()*155+100,Math.random()*155+100,Math.random()*155+100));

		this.addChild(this.sp);

		this.sp.setOpacity(0);

		this.runAction(new cc.Sequence(new cc.DelayTime(Math.random()*0.7),new cc.CallFunc(this.show,this)));
	},
	show:function()
	{
		this.sp.setOpacity(255);

		this.runAction(new cc.EaseQuadraticActionOut(new cc.MoveBy(1.6,cc.p(this.dir.x*800+Math.random()*500-250,this.dir.y*800+Math.random()*500-250))));

		this.runAction(new cc.RotateBy(2,Math.random()*2000-1000));

		this.sp.runAction(new cc.Sequence(new cc.DelayTime(1),new cc.FadeTo(0.6,0)));
	}
});
var CoinParticle = cc.Node.extend({
	ctor:function(dt)
	{
		this._super();

		this.setPosition(Math.random()*20-10,Math.random()*20-10);
		
		this.sp = new cc.Sprite("res/playpage_chess_coin.png");

		this.addChild(this.sp);

		this.runAction(new cc.Sequence(new cc.DelayTime(dt*0.1),new cc.EaseBackIn(new cc.MoveTo(0.7,cc.p(540-106,1870-380))),new cc.CallFunc(this.removeFromParent, this)));
	
	}
});