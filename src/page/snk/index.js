import Chain from "./chain.js";
const per_count = 20;
const row = per_count,
  col = per_count,
  total = row * col;
const w = window.innerWidth,
  h = w,
  square_w = w / per_count;

const boxMap = new Map();
const mainCon = document.getElementById('mainCon');

const App = {
  init: function() {
    this.initMap();
    this.initGround();
    this.snake = this.initSnk();
    var me = this;
    document.onkeydown = function(e) {
      switch (e.keyCode) {
        case 38:
          //alert('上');
          break;
        case 39:
          //alert('右');
          break;
        case 40:
          //alert('下');
          break;
        case 37:
          //alert('左');
          // boxMap.get(me.snake.at(me.snake.HEAD).data).style.background = '#FF0000';
          console.log(me.snake.at(me.snake.TAIL));
          console.log(boxMap.get(me.snake.at(me.snake.TAIL).data).style.background = '#00FF00');
          // boxMap.get(me.snake.at(me.snake.TAIL).data).style.background = '#FF0000';
          // me.snake.pop();
          break;
        default:
          break;
      }
    }
  },
  initMap: function() {
    for (let k = 0; k < total; k++) {
      let box = document.createElement('div');
      box.style.width = square_w + 'px';
      box.style.height = square_w + 'px';
      box.style.position = 'absolute';
      box.style.top = (k / 20 >> 0) * square_w + 'px';
      box.style.left = (k % 20) * square_w + 'px';
      mainCon.appendChild(box);
      boxMap.set(k + 1, box);
    }
  },
  initGround: function() {
    let canvas = document.getElementById('ground');
    canvas.width = w;
    canvas.height = h;
    canvas.style.background = '#8BC34A';
    let ctx = canvas.getContext('2d');
    for (let i = 1; i < row; i++) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "#38521987";
      ctx.moveTo(i * square_w, 0);
      ctx.lineTo(i * square_w, w);
      ctx.closePath();
      ctx.stroke();
    }
    for (let j = 1; j < col; j++) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "#38521987";
      ctx.moveTo(0, j * square_w);
      ctx.lineTo(w, j * square_w);
      ctx.closePath();
      ctx.stroke();
    }
  },
  initSnk: function() {
    var snake = new Chain([]);
    snake.push(190);
    boxMap.get(190).style.background = '#FF0000';
    snake.push(191);
    boxMap.get(191).style.background = '#FF0000';
    snake.push(192);
    boxMap.get(192).style.background = '#FF0000';
    return snake;
  }
}
App.init();