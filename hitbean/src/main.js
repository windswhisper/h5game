
window.onload = function(){
    cc.game.onStart = function(){

      cc.director.setDisplayStats(false);
      cc.view.adjustViewPort(true);
      cc.view.resizeWithBrowserSize(true);
      cc.LoaderScene.preload([], function () {
          cc.director.runScene(new GameScene());
      }, this);
    };
    cc.game.run("gameCanvas");
};