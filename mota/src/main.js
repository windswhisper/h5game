
window.onload = function(){
    cc.game.onStart = function(){

      cc.director.setDisplayStats(false);
      cc.view.adjustViewPort(true);
      cc.view.setDesignResolutionSize(270, 480, cc.ResolutionPolicy.SHOW_ALL);
      cc.view.resizeWithBrowserSize(true);
      cc.LoaderScene.preload(["res/Braver.png"], function () {
          cc.director.runScene(new GameScene());
      }, this);
    };
    cc.game.run("gameCanvas");
};