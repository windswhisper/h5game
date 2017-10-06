
var Bullet = cc.Node.extend({
  ctor:function(team)
  {
      this._super();
      this.sp = cc.Sprite.create("bullet.png");
      this.addChild(this.sp);

      this.runAction(cc.MoveBy.create(3,cc.p(0,2000*team)));

      this.scheduleUpdate();
  },
  update:function(dt)
  {
    var p = this.getPosition();
  }
})
