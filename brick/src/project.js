require=function e(t,i,c){function n(o,a){if(!i[o]){if(!t[o]){var r="function"==typeof require&&require;if(!a&&r)return r(o,!0);if(s)return s(o,!0);var h=new Error("Cannot find module '"+o+"'");throw h.code="MODULE_NOT_FOUND",h}var u=i[o]={exports:{}};t[o][0].call(u.exports,function(e){var i=t[o][1][e];return n(i||e)},u,u.exports,e,t,i,c)}return i[o].exports}for(var s="function"==typeof require&&require,o=0;o<c.length;o++)n(c[o]);return n}({Ball:[function(e,t,i){"use strict";cc._RF.push(t,"fc7e3WRwtBLgpjMMCE6948d","Ball");cc.Class({extends:cc.Component,properties:{v:null,prePos:null,gameScene:null,isBounced:!1},init:function(e,t){this.gameScene=e,this.v=t},start:function(){this.prePos=this.node.getPosition()},update:function(e){},step:function(e){var t=this.node.getPosition();this.prePos=cc.p(t.x,t.y),t.x<25&&(this.v.x=Math.abs(this.v.x)),t.x>1055&&(this.v.x=-Math.abs(this.v.x)),t.y>1735&&(this.v.y=-Math.abs(this.v.y)),this.node.setPosition(t.x+this.v.x*e,t.y+this.v.y*e);var i=this.gameScene.barNode.getBoundingBox();if(cc.rect(i.x-25,i.y-25,i.width+50,i.height+50).contains(this.node.getPosition())){this.v.y=Math.abs(this.v.y),this.v.x+=this.gameScene.barSpeed/2;var c=this.v.x,n=this.v.y;c=Math.min(3*n,c),c=Math.max(3*-n,c),this.v.x=1600*c/Math.sqrt(c*c+n*n),this.v.y=1600*n/Math.sqrt(c*c+n*n)}}}),cc._RF.pop()},{}],BaseBrick:[function(e,t,i){"use strict";cc._RF.push(t,"8162eD/h25MYok5LnGcYbdQ","BaseBrick"),cc.Class({extends:cc.Component,properties:{brickType:1,gameScene:null,x:0,y:0},bind:function(e,t,i){this.gameScene=e,this.x=t,this.y=i},start:function(){},hit:function(){},clash:function(){this.gameScene.removeBrick(this.x,this.y),this.node.removeFromParent()}}),cc._RF.pop()},{}],BaseBuff:[function(e,t,i){"use strict";cc._RF.push(t,"8aaf5fSll5IJq6+94sliuaE","BaseBuff"),cc.Class({extends:cc.Component,properties:{time:5,id:0,gameScene:null},bind:function(e){this.gameScene=e},start:function(){this.onEffect()},onEffect:function(){},removeEffect:function(){},update:function(e){this.time-=e,this.time<0&&(this.gameScene.removeBuff(this),this.removeEffect())}}),cc._RF.pop()},{}],BaseItem:[function(e,t,i){"use strict";cc._RF.push(t,"f6a73fvNopMdLXC5oEz1WLT","BaseItem"),cc.Class({extends:cc.Component,properties:{gameScene:null,v:cc.p(),isPicked:!1},bind:function(e){this.gameScene=e},start:function(){this.v.x=0,this.v.y=100},update:function(e){if(!this.isPicked){var t=this.node.getPosition();if(this.node.setPosition(t.x+this.v.x*e,t.y+this.v.y*e),this.v.y-=500*e,this.node.getPositionY()<-500)this.node.removeFromParent();else{var i=this.gameScene.barNode.getBoundingBox(),c=this.node.getBoundingBox();i.intersects(c)&&(this.picked(),this.node.removeFromParent(),this.isPicked=!0)}}},picked:function(){}}),cc._RF.pop()},{}],BgGradient:[function(e,t,i){"use strict";cc._RF.push(t,"48d7dMXFWpAbLJ+3C022uXa","BgGradient");var c=["#37a3ff","#84daff","#30cfd0","#330867","#f5f7fa","#c3cfe2","#fddb92","#d1fdff","#f6f3ff","#cd9cf2","#9795f0","#fbc8d4","#13547a","#80d0c7","#92fe9d","#00c9ff","#ed6ea0","#ec8c69"];cc.Class({extends:cc.Component,properties:{bgNode:cc.Node},start:function(){var e=Math.floor(Math.random()*c.length/2);this.node.setColor(this.parseColor(c[e+1])),this.bgNode.setColor(this.parseColor(c[e]))},parseColor:function(e){var t=e.substring(1,3),i=parseInt(t,16),c=e.substring(3,5),n=parseInt(c,16),s=e.substring(5,7),o=parseInt(s,16);return cc.color(i,n,o)}}),cc._RF.pop()},{}],BigBuff:[function(e,t,i){"use strict";cc._RF.push(t,"3a617kfWFtKyaDlHXQjFSyf","BigBuff");var c=e("BaseBuff");cc.Class({extends:c,properties:{},onEffect:function(){this.gameScene.onUltraBall()},removeEffect:function(){this.gameScene.cancelUltraBall()}}),cc._RF.pop()},{BaseBuff:"BaseBuff"}],BigItem:[function(e,t,i){"use strict";cc._RF.push(t,"6fa84gvLYJEeovZ2FmCaoaE","BigItem");var c=e("BaseItem"),n=e("../Buff/BaseBuff");cc.Class({extends:c,properties:{buffPrefab:cc.Prefab},picked:function(){var e=cc.instantiate(this.buffPrefab).getComponent(n);e.bind(this.gameScene),this.gameScene.addBuff(e)}}),cc._RF.pop()},{"../Buff/BaseBuff":"BaseBuff",BaseItem:"BaseItem"}],BombBrick:[function(e,t,i){"use strict";cc._RF.push(t,"fa2aeRsytNGnY5pNZakm8kF","BombBrick");var c=e("BaseBrick");cc.Class({extends:c,properties:{isTrigger:!1,soundBomb:cc.AudioClip},start:function(){},hit:function(){this.clash()},bomb:function(){for(var e=this.x-1;e<=this.x+1;e++)for(var t=this.y-1;t<=this.y+1;t++)this.gameScene.clashBrick(e,t);this.gameScene.removeBrick(this.x,this.y),this.node.removeFromParent(),cc.audioEngine.play(this.soundBomb)},clash:function(){this.isTrigger||(this.isTrigger=!0,this.node.runAction(new cc.Sequence(new cc.DelayTime(.4),new cc.CallFunc(this.bomb,this))))}}),cc._RF.pop()},{BaseBrick:"BaseBrick"}],BoxBrick:[function(e,t,i){"use strict";cc._RF.push(t,"66398W7Y51OP4QCdvH24/RC","BoxBrick");var c=e("BaseBrick");cc.Class({extends:c,properties:{isTrigger:!1},start:function(){},hit:function(){this.clash();var e=this.node.getPosition();this.gameScene.shotBall(e,cc.p(10+e.x,100+e.y)),this.gameScene.shotBall(e,cc.p(50+e.x,76+e.y)),this.gameScene.shotBall(e,cc.p(-50+e.x,76+e.y))}}),cc._RF.pop()},{BaseBrick:"BaseBrick"}],GameScene:[function(e,t,i){"use strict";function c(e,t){return e<=s.width-1&&e>=0&&t<=s.height-1&&t>=0}cc._RF.push(t,"3714cDJ9oJKyoHj3aEqU7BG","GameScene");var n=[[0,0,0,0,0,3,3,11,3,3,0,0,0,0,0,0,0,0,0,10,3,3,11,3,3,10,0,0,0,0,0,0,0,10,3,3,3,11,3,3,3,10,0,0,0,0,0,10,3,11,11,11,11,11,11,11,3,10,0,0,0,3,10,3,3,3,3,11,3,3,3,3,10,3,0,0,3,3,3,11,11,11,11,11,11,11,3,3,3,0,0,3,10,3,3,3,3,11,3,3,3,3,10,3,0,0,0,10,3,11,11,11,11,11,11,11,3,10,0,0,0,0,10,3,3,3,3,11,3,3,3,3,10,0,0,0,0,0,10,3,11,11,11,11,11,3,10,0,0,0,0,0,0,0,10,3,3,11,3,3,10,0,0,0,0,0,0,0,0,0,10,3,11,3,10,0,0,0,0,0,0,0,0,0,0,0,10,11,10,0,0,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,3,3,0,0,0,0,3,11,0,0,0,0,0,0,0,11,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,10,3,3,3,10,3,3,3,0,0,10,0,3,11,11,11,11,11,11,11,11,11,3,0,10,3,0,3,11,11,11,11,11,11,11,11,11,3,0,3,3,3,3,11,11,10,11,11,11,10,11,11,3,3,3,0,0,3,11,11,10,11,11,11,10,11,11,3,0,0,0,0,3,11,11,11,11,11,11,11,11,11,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,3,3,0,0,0,3,3,0,0,0,0,0,0,0,0,3,3,0,0,0,3,3,0,0,0,0,0,0,0,0,10,10,13,0,0,10,10,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,12,12,12,12,12,12,12,12,12,12,12,12,0,0,9,9,9,9,9,9,9,9,9,9,9,9,9,0,0,12,12,12,12,12,12,12,12,12,12,12,12,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,15,15,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,13,13,0,0,0,0,0,0,0,14,14,14,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,11,11,8,8,8,10,10,10,10,10,10,10,10,9,9,11,11,7,7,6,6,6,6,5,5,5,5,4,4,4,11,11,3,3,3,3,3,3,3,3,3,3,3,3,3,11,11,2,2,2,2,2,2,2,2,2,2,2,2,2,11,11,1,1,1,1,1,1,1,1,1,1,1,1,1,11]],s=cc.size(15,18),o=cc.size(72,72),a=cc.p(37,510),r=e("BaseBrick");cc.Class({extends:cc.Component,properties:{barNode:cc.Node,boardNode:cc.Node,gameLayer:cc.Node,txtBallCount:cc.Label,normalBrickPrefab:cc.Prefab,ironBrickPrefab:cc.Prefab,bombBrickPrefab:cc.Prefab,boxBrickPrefab:cc.Prefab,itemBrickPrefab:cc.Prefab,ballPrefab:cc.Prefab,soundKnock:cc.AudioClip,soundIron:cc.AudioClip,soundWin:cc.AudioClip,soundFail:cc.AudioClip,brickList:[],ballList:[],posDown:null,touchType:0,ballCount:0,ultraBall:!1,preBarPos:0,barSpeed:0},start:function(){cc.view.enableAntiAlias(!1);for(var e=0;e<s.width;e++)this.brickList[e]=[];this.initEvent()},newGame:function(){this.putBrick(),this.setBallCount(5),this.barNode.setOpacity(255),this.preBarPos=this.barNode.getPositionX(),this.barSpeed=0},initEvent:function(){this.node.on(cc.Node.EventType.TOUCH_START,function(e){var t=this.gameLayer.convertToNodeSpace(e.getLocation());this.posDown=t,this.touchType=0},this),this.node.on(cc.Node.EventType.TOUCH_MOVE,function(e){var t=this.gameLayer.convertToNodeSpace(e.getLocation());(1==this.touchType||cc.pDistance(t,this.posDown)>30)&&(this.touchType=1,this.barNode.setPositionX(t.x))},this),this.node.on(cc.Node.EventType.TOUCH_END,function(e){var t=this.gameLayer.convertToNodeSpace(e.getLocation());0==this.touchType&&this.drawBall(t)},this),this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(e){this.touchType=0},this)},putBrick:function(){for(var e=0;e<s.width;e++)for(var t=0;t<s.height;t++){var i,c=n[2][e+(s.height-t-1)*s.width];if(0!=c){if(c<10)(i=cc.instantiate(this.normalBrickPrefab)).getComponent("NormalBrick").setHitCount(c);else switch(c){case 10:i=cc.instantiate(this.ironBrickPrefab);break;case 11:i=cc.instantiate(this.bombBrickPrefab);break;case 12:i=cc.instantiate(this.boxBrickPrefab);break;case 13:(i=cc.instantiate(this.itemBrickPrefab)).getComponent("ItemBrick").setItemType(1);break;case 14:(i=cc.instantiate(this.itemBrickPrefab)).getComponent("ItemBrick").setItemType(2);break;case 15:(i=cc.instantiate(this.itemBrickPrefab)).getComponent("ItemBrick").setItemType(3)}i.getComponent(r).brickType=c,this.brickList[e][t]=i.getComponent(r),i.setPosition(e*o.width+a.x,t*o.height+a.y),i.getComponent(r).bind(this,e,t),i.setScale(0),i.runAction(new cc.Sequence(new cc.DelayTime(.05*(s.height-t-1)),new cc.EaseBackOut(new cc.ScaleTo(.8,1)))),this.boardNode.addChild(i)}}},drawBall:function(e){this.ballCount<=0||(this.setBallCount(this.ballCount-1),this.shotBall(this.barNode.getPosition(),cc.p(this.barNode.getPosition().x+.25,this.barNode.getPosition().y+1)))},shotBall:function(e,t){var i=t.x-e.x,c=t.y-e.y,n=1600*i/Math.sqrt(i*i+c*c),s=1600*c/Math.sqrt(i*i+c*c),o=cc.p(n,s),a=cc.instantiate(this.ballPrefab);a.getComponent("Ball").init(this,o),this.ballList[this.ballList.length]=a.getComponent("Ball"),a.setPosition(e),this.ultraBall&&a.setScale(2),this.gameLayer.addChild(a)},update:function(e){for(var t=0;t<this.ballList.length;t++){var i=this.ballList[t];this.ballContact(i),i.step(e)}0==e&&(e=.02),this.barSpeed=(this.barNode.getPositionX()-this.preBarPos)/e/5+this.barSpeed/5*4,this.preBarPos=this.barNode.getPositionX()},ballContact:function(e){for(var t=e.node.getPosition(),i=e.prePos,n=Math.floor((t.x-a.x)/o.width+.5),s=Math.floor((t.y-a.y)/o.height+.5),h=n-1;h<=n+1;h++)for(var u=s-1;u<=s+1;u++)if(c(h,u)){var d=this.brickList[h][u];if(null!=d){var f=d.node.getBoundingBox(),p=cc.rect(f.x-24,f.y-24,f.width+48,f.height+48),l=d.node.getPosition();if(p.contains(t)){var g=e.prePos.x-l.x,B=e.prePos.y-l.y;if(Math.abs(g)>Math.abs(B)?i.x>l.x?e.v.x=Math.abs(e.v.x):e.v.x=-Math.abs(e.v.x):i.y>l.y?e.v.y=Math.abs(e.v.y):e.v.y=-Math.abs(e.v.y),e.node.setPosition(e.prePos),this.ultraBall)for(var m=h-1;m<=h+1;m++)for(var b=u-1;b<=u+1;b++)this.clashBrick(m,b);else d.hit();10==d.getComponent(r).brickType?cc.audioEngine.play(this.soundIron):cc.audioEngine.play(this.soundKnock)}}}},clashBrick:function(e,t){c(e,t)&&null!=this.brickList[e][t]&&(this.brickList[e][t].hit(),null!=this.brickList[e][t]&&this.brickList[e][t].clash())},removeBrick:function(e,t){c(e,t)&&(this.brickList[e][t]=null)},addBall:function(e){this.setBallCount(this.ballCount+e)},setBallCount:function(e){this.ballCount=e,this.txtBallCount.string=e},addBuff:function(e){this.gameLayer.addChild(e.node)},removeBuff:function(e){this.gameLayer.removeChild(e.node)},onUltraBall:function(){this.ultraBall=!0;for(var e=0;e<this.ballList.length;e++)this.ballList[e].node.runAction(new cc.ScaleTo(.2,2))},cancelUltraBall:function(){this.ultraBall=!1;for(var e=0;e<this.ballList.length;e++)this.ballList[e].node.runAction(new cc.ScaleTo(.2,1))}}),cc._RF.pop()},{BaseBrick:"BaseBrick"}],GuideInfo:[function(e,t,i){"use strict";cc._RF.push(t,"ada45sm6IpLt5owFdYEUOkR","GuideInfo"),cc.Class({extends:cc.Component,properties:{moveGuide:cc.Node,txtStart:cc.Node,gameScene:cc.Node},start:function(){this.moveGuide.runAction(new cc.RepeatForever(new cc.Sequence(new cc.EaseSineInOut(new cc.MoveBy(2,cc.p(100,0))),new cc.EaseSineInOut(new cc.MoveBy(1,cc.p(-100,0)))))),this.txtStart.runAction(new cc.RepeatForever(new cc.Sequence(new cc.FadeTo(1,128),new cc.FadeTo(1,255)))),this.node.on(cc.Node.EventType.TOUCH_END,function(e){this.node.removeFromParent(),this.gameScene.getComponent("GameScene").newGame()},this)}}),cc._RF.pop()},{}],HeartItem:[function(e,t,i){"use strict";cc._RF.push(t,"cc5375b07xGRrzEdhApfQax","HeartItem");var c=e("BaseItem");cc.Class({extends:c,properties:{},picked:function(){this.gameScene.addBall(2)}}),cc._RF.pop()},{BaseItem:"BaseItem"}],IronBrick:[function(e,t,i){"use strict";cc._RF.push(t,"0c925TbwN9LPbeGXjGErboH","IronBrick");var c=e("BaseBrick");cc.Class({extends:c,properties:{},start:function(){},hit:function(){}}),cc._RF.pop()},{BaseBrick:"BaseBrick"}],ItemBrick:[function(e,t,i){"use strict";cc._RF.push(t,"c6b54j+eDZPP6o1K4im/F63","ItemBrick");var c=e("BaseBrick"),n=e("BaseItem");cc.Class({extends:c,properties:{isTrigger:!1,itemType:1,itemHeart:cc.Prefab,itemBig:cc.Prefab,itemLong:cc.Prefab},start:function(){},setItemType:function(e){this.itemType=e},hit:function(){this.clash();var e,t=this.node.getPosition();switch(this.itemType){case 1:e=this.itemHeart;break;case 2:e=this.itemBig;break;case 3:e=this.itemLong}var i=cc.instantiate(e);i.getComponent(n).bind(this.gameScene),i.setPosition(t),this.gameScene.gameLayer.addChild(i)}}),cc._RF.pop()},{BaseBrick:"BaseBrick",BaseItem:"BaseItem"}],LongBuff:[function(e,t,i){"use strict";cc._RF.push(t,"6381aciw/ZP460+cVKvORsD","LongBuff");var c=e("BaseBuff");cc.Class({extends:c,properties:{},onEffect:function(){this.gameScene.barNode.runAction(new cc.ScaleTo(.2,1.5,1))},removeEffect:function(){this.gameScene.barNode.runAction(new cc.ScaleTo(.2,1))}}),cc._RF.pop()},{BaseBuff:"BaseBuff"}],LongItem:[function(e,t,i){"use strict";cc._RF.push(t,"894022eD95EFLzNsSfsSj+i","LongItem");var c=e("BaseItem"),n=e("../Buff/BaseBuff");cc.Class({extends:c,properties:{buffPrefab:cc.Prefab},picked:function(){cc.log(n);var e=cc.instantiate(this.buffPrefab).getComponent(n);e.bind(this.gameScene),this.gameScene.addBuff(e)}}),cc._RF.pop()},{"../Buff/BaseBuff":"BaseBuff",BaseItem:"BaseItem"}],NormalBrick:[function(e,t,i){"use strict";cc._RF.push(t,"1c8b8U24v9CJpSzpOT/PlRl","NormalBrick");var c=e("BaseBrick");cc.Class({extends:c,properties:{brickImg1:cc.SpriteFrame,brickImg2:cc.SpriteFrame,brickImg3:cc.SpriteFrame,txtCount:cc.Label,hitCount:2},start:function(){},setHitCount:function(e){this.hitCount=e,this.setBrickImg()},setBrickImg:function(){var e;switch(this.hitCount%3){case 1:e=this.brickImg1;break;case 2:e=this.brickImg2;break;default:e=this.brickImg3}this.node.getComponent(cc.Sprite).spriteFrame=e,this.txtCount.string=this.hitCount},hit:function(){0==--this.hitCount?this.clash():this.setBrickImg()}}),cc._RF.pop()},{BaseBrick:"BaseBrick"}],btnStage:[function(e,t,i){"use strict";cc._RF.push(t,"905baa3f79Nvqyw7EcJYPj4","btnStage"),cc.Class({extends:cc.Component,properties:{id:0,image1:cc.SpriteFrame,image2:cc.SpriteFrame,image3:cc.SpriteFrame,image4:cc.SpriteFrame,label:cc.Label,isHidden:!1,layerStage:null},init:function(e,t){this.id=e,this.layerStage=t},start:function(){this.node.setScale(0),this.node.runAction(new cc.Sequence(new cc.DelayTime(1+.05*this.id),new cc.EaseBackOut(new cc.ScaleTo(.8,1))));var e;this.id<=4?e=this.image1:this.id<=8?e=this.image2:this.id<=12?e=this.image3:this.id<=16&&(e=this.image4),this.setSpriteFrame(e),this.label.string=this.id,this.node.on(cc.Node.EventType.TOUCH_START,function(e){return!this.layerStage.isHidden&&(this.node.setScale(.9),this.node.setOpacity(172),!0)},this),this.node.on(cc.Node.EventType.TOUCH_MOVE,function(e){this.layerStage.isHidden||(this.node.setScale(.9),this.node.setOpacity(172))},this),this.node.on(cc.Node.EventType.TOUCH_END,function(e){this.layerStage.isHidden||(this.node.setScale(1),this.node.setOpacity(255),this.layerStage.enterStage())},this),this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(e){this.layerStage.isHidden||(this.node.setScale(1),this.node.setOpacity(255))},this)},setSpriteFrame:function(e){this.node.getComponent(cc.Sprite).spriteFrame=e,this.node.width=e.getRect().width,this.node.height=e.getRect().height}}),cc._RF.pop()},{}],btnStart:[function(e,t,i){"use strict";cc._RF.push(t,"ee01d5KNPpO75zUumIDVPYC","btnStart"),cc.Class({extends:cc.Component,properties:{star1:cc.Node,star2:cc.Node,star3:cc.Node,star4:cc.Node,star5:cc.Node,star6:cc.Node,star7:cc.Node,logo:cc.Node,logoBg:cc.Node,stageLayer:cc.Node,isHidden:!1},start:function(){this.node.on(cc.Node.EventType.TOUCH_START,function(e){return!this.isHidden&&(this.node.setScale(.9),this.node.setOpacity(172),!0)},this),this.node.on(cc.Node.EventType.TOUCH_MOVE,function(e){this.isHidden||(this.node.setScale(.9),this.node.setOpacity(172))},this),this.node.on(cc.Node.EventType.TOUCH_END,function(e){this.isHidden||(this.node.setScale(1),this.node.setOpacity(255),this.gameStart())},this),this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(e){this.isHidden||(this.node.setScale(1),this.node.setOpacity(255))},this)},gameStart:function(){this.star1.getComponent("nodeStar").gone(),this.star2.getComponent("nodeStar").gone(),this.star3.getComponent("nodeStar").gone(),this.star4.getComponent("nodeStar").gone(),this.star5.getComponent("nodeStar").gone(),this.star6.getComponent("nodeStar").gone(),this.star7.getComponent("nodeStar").gone(),this.logo.stopAllActions(),this.logo.runAction(new cc.EaseSineInOut(new cc.MoveTo(1,cc.p(0,700)))),this.logo.runAction(new cc.EaseSineInOut(new cc.ScaleTo(1,.8))),this.logoBg.stopAllActions(),this.logoBg.runAction(new cc.EaseSineInOut(new cc.MoveTo(1,cc.p(0,700)))),this.logoBg.runAction(new cc.EaseSineInOut(new cc.ScaleTo(1,.8))),this.node.runAction(new cc.EaseSineInOut(new cc.FadeTo(1,0))),this.stageLayer.getComponent("layerStage").showStages(),this.isHidden=!0}}),cc._RF.pop()},{}],layerStage:[function(e,t,i){"use strict";cc._RF.push(t,"1f77dBu9PxPioBuMOWRNhRv","layerStage"),cc.Class({extends:cc.Component,properties:{btnStagePrefab:cc.Prefab,isHidden:!1,bgm:cc.AudioClip},start:function(){cc.view.enableAntiAlias(!1),cc.audioEngine.play(this.bgm,!0)},showStages:function(){for(var e=1;e<=16;e++){var t=cc.instantiate(this.btnStagePrefab);t.setPosition((e-1)%4*260-380,260-300*Math.floor((e-1)/4)),t.getComponent("btnStage").init(e,this),this.node.addChild(t)}},enterStage:function(){this.isHidden=!0,cc.director.loadScene("gameScene")}}),cc._RF.pop()},{}],nodeStar:[function(e,t,i){"use strict";cc._RF.push(t,"263c1M+KAJGppsqqK1qkCsF","nodeStar"),cc.Class({extends:cc.Component,properties:{delay:0,offset:0,goneX:0,goneY:0},start:function(){this.node.setOpacity(0),this.node.setPositionY(this.node.getPositionY()-50),this.node.runAction(new cc.Sequence(new cc.DelayTime(this.delay),new cc.Spawn(new cc.MoveBy(.5,cc.p(0,50)),new cc.FadeTo(.5,255)))),this.node.runAction(new cc.RepeatForever(new cc.Sequence(new cc.EaseSineInOut(new cc.MoveBy(6,cc.p(0,this.offset/2))),new cc.EaseSineInOut(new cc.MoveBy(10,cc.p(0,-1*this.offset))),new cc.EaseSineInOut(new cc.MoveBy(6,cc.p(0,this.offset/2))))))},gone:function(){this.node.runAction(new cc.EaseSineInOut(new cc.MoveBy(1,cc.p(this.goneX,this.goneY))))}}),cc._RF.pop()},{}]},{},["Ball","BgGradient","BaseBrick","BombBrick","BoxBrick","IronBrick","ItemBrick","NormalBrick","BaseBuff","BigBuff","LongBuff","GameScene","GuideInfo","BaseItem","BigItem","HeartItem","LongItem","btnStage","btnStart","layerStage","nodeStar"]);