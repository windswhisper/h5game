var GameLayer = cc.Layer.extend({
    hero:null,
    ctor:function(){
        this._super();

        this.hero2 = cc.Sprite.create("res/3.png");

        this.hero2.setPosition(800,270);

        this.addChild(this.hero2);
        this.hero = cc.Sprite.create("res/3.png");

        this.hero.setPosition(800,270);

        this.addChild(this.hero);

        this.dazhao1();
    },
    knock:function(){
        return cc.Sequence.create(cc.MoveBy.create(0.1,cc.p(0,50)),cc.MoveBy.create(0.1,cc.p(0,-70)),cc.MoveBy.create(0.1,cc.p(0,40)),cc.MoveBy.create(0.05,cc.p(0,-10)));
    },
    shake:function(t)
    {
        var action = cc.Sequence.create(cc.MoveBy.create(0.1*Math.random()+0.05,cc.p(0,10)),cc.MoveBy.create(0.1*Math.random()+0.05,cc.p(0,-10)));
        for(var i=0;i<t-1;i++)
        {
            action = cc.Sequence.create(cc.MoveBy.create(0.1*Math.random()+0.05,cc.p(0,10)),cc.MoveBy.create(0.1*Math.random()+0.05,cc.p(0,-10)),action);
        }
        return action;
    },
    flash:function(delay)
    {
        var layer = cc.LayerColor.create(cc.color(255,255,255,255),3000,3000);
        layer.setPosition(-1000,-1000);
        layer.setOpacity(0);
        layer.runAction(cc.Sequence.create(cc.DelayTime.create(delay),cc.FadeTo.create(1.8,255),cc.DelayTime.create(2),cc.FadeTo.create(2,0)));
        this.addChild(layer);
    },
    dazhao1:function()
    {
        this.flash(1);
        this.hero.setPosition(500,1200);
        this.hero.setScale(10,10);
        this.hero.runAction(cc.Sequence.create(cc.MoveBy.create(2,cc.p(-300,-900)),cc.FadeTo.create(2,0)));
        this.runAction(cc.Sequence.create(this.shake(10),this.knock()));
    },
});