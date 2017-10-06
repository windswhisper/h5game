var _gamescene;
var MyScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    _gamescene = this;
    var size = cc.director.getWinSize();
    var label = cc.LabelTTF.create("Hello World", "Arial", 40);
    label.setPosition(size.width / 2, size.height / 2);
    this.addChild(label, 1);

    var plane = new Plane(1);
    this.addChild(plane);


    var plane2 = new Plane(-1);
    this.addChild(plane2);

    this.plane = plane;
      var touchListener = {
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchBegan,
          onTouchEnded: this.onTouchBegan
        };
        cc.eventManager.addListener(touchListener, this);
        this.m_touchListener = touchListener;



    var socket = new WebSocket('ws://111.206.45.12:30324');
    socket.onopen = function(event) { 

      socket.onmessage = function(result,nTime){
        plane2.moveto(JSON.parse(result.data).x,1920-JSON.parse(result.data).y);
      }

      socket.onclose = function(event) { 
      console.log('Client notified socket has closed',event); 
      };

      //socket.close() 
    };
    this.socket = socket;
  
    this.schedule(this.uploadInfo,0.05);
  },
    onTouchBegan:function(touch, event) 
    {
        var target = event.getCurrentTarget();

        target.plane.moveto(touch.getLocation());

        return true;
    },
    uploadInfo:function(dt)
    {
        this.socket.send(JSON.stringify(this.plane.getPosition()));
    }
});
