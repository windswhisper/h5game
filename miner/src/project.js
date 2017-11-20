require=function t(o,e,i){function s(r,h){if(!e[r]){if(!o[r]){var n="function"==typeof require&&require;if(!h&&n)return n(r,!0);if(c)return c(r,!0);var l=new Error("Cannot find module '"+r+"'");throw l.code="MODULE_NOT_FOUND",l}var d=e[r]={exports:{}};o[r][0].call(d.exports,function(t){var e=o[r][1][t];return s(e||t)},d,d.exports,t,o,e,i)}return e[r].exports}for(var c="function"==typeof require&&require,r=0;r<i.length;r++)s(i[r]);return s}({HelloWorld:[function(t,o,e){"use strict";cc._RF.push(o,"280c3rsZJJKnZ9RqbALVwtK","HelloWorld");var i=t("Player");cc.Class({extends:cc.Component,properties:{player:cc.Node,blocks:cc.Node,dirtBlock:cc.Prefab,rockBlock:cc.Prefab},onLoad:function(){this.offsetY=0,this.worldBlocks=[],this.initPlayer(),this.createBlockPool(),this.renderBlocks(),this.renderBlocks(),this.addEvents()},initPlayer:function(){var t=this;this.Player=new i,this.Player.init(this.player,0,400),this.Player.checkFall=function(){var o=t.getBlock(t.Player.node.x,t.Player.node.y-50);(null===o||o.hp<=0)&&(t.Player.moveLock=!1,t.Player.down())}},renderBlocks:function(){for(var t,o=350+this.offsetY;o>-700+this.offsetY;o-=50){var e=o/50;this.worldBlocks[e]=this.worldBlocks[e]||[];for(var i=-350;i<400;i+=50){var s=i/50,c=Math.random();c<.9?(c<.7?(t=this.dirtPool.get()).hp=1:c<.9&&((t=this.rockPool.get()).hp=2),t.parent=this.blocks,t.setPosition(i,o),this.worldBlocks[e][s]=t):this.worldBlocks[e][s]=null}}this.offsetY-=1050},addEvents:function(){cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this)},onKeyDown:function(t){var o;switch(t.keyCode){case cc.KEY.w:if(this.Player.moveLock)return;(o=this.getBlock(this.Player.node.x,this.Player.node.y+50))||this.Player.jump();break;case cc.KEY.s:if(this.Player.moveLock)return;(o=this.getBlock(this.Player.node.x,this.Player.node.y-50))?(this.mine(o),o.hp<=0&&this.Player.down()):this.Player.down();break;case cc.KEY.a:if(this.Player.moveLock)return;(o=this.getBlock(this.Player.node.x-50,this.Player.node.y))?(this.mine(o),o.hp<=0&&this.Player.left()):this.Player.left();break;case cc.KEY.d:if(this.Player.moveLock)return;(o=this.getBlock(this.Player.node.x+50,this.Player.node.y))?(this.mine(o),o.hp<=0&&this.Player.right()):this.Player.right()}},mine:function(t){if(cc.isValid(t))if(t.hp-=1,t.hp<=0){"dirt"===t.type?this.dirtPool.put(t):"rock"===t.type&&this.rockPool.put(t);var o=Math.round(t.x/50),e=Math.round(t.y/50);this.worldBlocks[e][o]=null}else 1===t.hp&&(t.color=cc.Color.GRAY)},getBlock:function(t,o){var e=Math.round(t/50),i=Math.round(o/50);return this.worldBlocks[i]&&this.worldBlocks[i][e]?this.worldBlocks[i][e]:null},createBlockPool:function(){this.dirtPool=new cc.NodePool,this.rockPool=new cc.NodePool;for(o=0;o<810;++o){var t=cc.instantiate(this.dirtBlock);t.type="dirt",this.dirtPool.put(t)}for(var o=0;o<810;++o){var e=cc.instantiate(this.rockBlock);e.type="rock",this.rockPool.put(e)}},recycleBlocks:function(){var t,o;for(var e in this.worldBlocks)if(t=this.worldBlocks[e],50*e>this.Player.node.y+400){console.log(50*e,this.Player.node.y);for(var i in t)(o=t[i])&&("dirt"===o.type?this.dirtPool.put(o):"rock"===o.type&&this.rockPool.put(o));this.worldBlocks[e]=null}},update:function(t){this.Player.update(t),this.Player.node.y<this.offsetY+1800&&(this.recycleBlocks(),this.renderBlocks())}}),cc._RF.pop()},{Player:"Player"}],Player:[function(t,o,e){"use strict";cc._RF.push(o,"34e38a0LoxHvLAH9RzfJrwu","Player"),o.exports=function(){this.init=function(t,o,e){this.node=t,this.node.setPosition(o,e),this.destX=this.node.x,this.destY=this.node.y,this.vX=0,this.vY=0,this.moveLock=!1,this.speed=100},this.jump=function(){!this.moveLock&&this.node.y<650&&(this.moveLock=!0,this.lockTime=this.speed,this.destX=this.node.x,this.destY=this.node.y+50,this.vY=640)},this.down=function(){this.moveLock||(this.moveLock=!0,this.lockTime=this.speed,this.destX=this.node.x,this.destY=this.node.y-50,this.vY=-640)},this.left=function(){!this.moveLock&&this.node.x>-350&&(this.moveLock=!0,this.lockTime=this.speed,this.destX=this.node.x-50,this.destY=this.node.y,this.vX=-320)},this.right=function(){!this.moveLock&&this.node.x<350&&(this.moveLock=!0,this.lockTime=this.speed,this.destX=this.node.x+50,this.destY=this.node.y,this.vX=320)},this.update=function(t){var o=this;o.moveLock&&(Math.abs(this.destX-this.node.x)<10&&Math.abs(this.destY-this.node.y)<10?(this.vX=0,this.vY=0,this.node.x=this.destX,this.node.y=this.destY,this.checkFall(),this.lockTime-=1e3*t,this.lockTime<=0&&(o.moveLock=!1)):(this.node.x+=Math.round(this.vX*t),this.node.y+=Math.round(this.vY*t)))}},cc._RF.pop()},{}],Utils:[function(t,o,e){"use strict";cc._RF.push(o,"d5011sdGuxPWoZ5ibb7n2TX","Utils"),cocosAnalytics.init({appID:"13798",appSecret:"959b3ac0037d0f3c2fdce94f8421a9b2",channel:"000000",version:"1.6.2"}),cc._RF.pop()},{}],block:[function(t,o,e){"use strict";cc._RF.push(o,"03e91PUS6tBQ7wn36i9U4yl","block"),cc.Class({extends:cc.Component,properties:{target:cc.Node},update:function(t){this.node.y>this.target.y+400&&this.destroy()}}),cc._RF.pop()},{}],"camera-control":[function(t,o,e){"use strict";cc._RF.push(o,"99f8edpwUBKlpVo6orD+bqU","camera-control"),cc.Class({extends:cc.Component,properties:{target:cc.Node},update:function(t){this.node.y=this.target.y-400}}),cc._RF.pop()},{}]},{},["HelloWorld","Player","Utils","block","camera-control"]);