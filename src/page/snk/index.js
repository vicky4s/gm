import Chain from "./chain.js";
const App = {
  init: function() {
    this.initAppearance();
  },
  initAppearance: function() {
    let canvas = document.getElementById('ground'),
      w = canvas.clientWidth,
      h = canvas.clientWidth;
    let tpl = '';
    for (let i = 0; i < 40; i++) {
      if (i < 20) {
        tpl += '<div class="row"></div>';
      } else {
        tpl += '<div class="col" style="left:' + (i - 20) * 16 + 'px"></div>';
      }
    }
    tpl = tpl + '<div class="box"></div>';
    canvas.innerHTML = tpl;
    var snake = new Chain();
    console.log(snake);
  },
  initGroundAry: function() {

  },
  initConfig: function() {

  }
}
App.init();