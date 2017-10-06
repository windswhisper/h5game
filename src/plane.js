
var Plane = cc.Node.extend({
  shotcd:5,
  ctor:function(team)
  {
      this._super();

      this.team = team;

      this.sp = cc.Sprite.create("plane.png");
      this.addChild(this.sp);

      this.des = cc.p(540,300);

      if(team==-1)
      {
        this.setScale(-1);
        this.des = cc.p(540,1620);
      }
      this.scheduleUpdate();
  },
  update:function(dt)
  {
    var p = this.getPosition();
    this.setPosition(p.x+(this.des.x-p.x)/10,p.y+(this.des.y-p.y)/10);

    this.shotcd-=dt;
    if(this.shotcd<0)
    {
      this.shot();
      this.shotcd+=1;
    }
  },
  moveto:function(x,y)
  {
    this.des = cc.p(x,y);
  },
  shot:function()
  {
    var bullet = new Bullet(this.team);
    bullet.setPosition(this.getPosition());
    _gamescene.addChild(bullet);
  }
})
