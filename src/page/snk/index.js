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
const directionAry = ['left', 'up', 'right', 'down']; //37,38,39,40
const App = {
  init() {
    this.initMap();
    this.initGround();
    this.snake = this.initSnk();、、
    //this.food = this.initFood();
    var me = this;
    me.direction = 'left';
    me.interval = setInterval(function() {
      me.handleMove();
    }, 200);
    document.onkeydown = function(e) {
      var keyCode = e.keyCode;
      if (keyCode >= 37 && keyCode <= 40) {
        if ((keyCode == 37 || keyCode == 39) && (me.direction == 'left' || me.direction == 'right')) {
          return;
        } else if ((keyCode == 38 || keyCode == 40) && (me.direction == 'up' || me.direction == 'down')) {
          return;
        } else {
          me.direction = directionAry[e.keyCode - 37];
        }
      }
    }
  },
  handleMove() {
    var me = this;
    let fdt = me.snake.first().data;
    var remain = fdt % per_count;
    switch (me.direction) {
      case 'up': //上
        if (fdt < per_count) {
          alert('撞墙啦~');
          me.interval && clearInterval(me.interval);
          break;
        }
        var hd = fdt - per_count;
        me.updateBody(hd);
        break;
      case 'right': //右
        if (remain === 0) {
          alert('撞墙啦~');
          me.interval && clearInterval(me.interval);
          break;
        }
        var hd = fdt + 1;
        me.updateBody(hd);
        break;
      case 'down': //下
        if (fdt > per_count * (per_count - 1)) {
          alert('撞墙啦~');
          me.interval && clearInterval(me.interval);
          break;
        }
        var hd = fdt + per_count;
        me.updateBody(hd);
        break;
      case 'left': //左
        if (remain === 1) {
          alert('撞墙啦~');
          me.interval && clearInterval(me.interval);
          break;
        }
        var hd = fdt - 1;
        me.updateBody(hd);
        break;
      default:
        break;
    }
  },
  updateBody(hd) {
    var me = this;
    me.snake.unshift(hd);
    boxMap.get(hd).style.background = '#FF0000';
    boxMap.get(me.snake.last().data).style.background = 'none';
    me.snake.pop();
  },
  feed() {

  },
  initFood() {
    // let food = document.createElement('div');
    // food.style.width = square_w + 'px';
    // food.style.height = square_w + 'px';
    // food.style.position = 'absolute';
    // food.style.top = (Math.random() * per_count >> 0) * square_w + 'px';
    // food.style.left = (Math.random() * per_count >> 0) * square_w + 'px';
    // food.style.background = '#FFED5F';
    // mainCon.appendChild(food);
    // return food;
  },
  initMap() {
    for (let k = 0; k < total; k++) {
      let box = document.createElement('div');
      box.style.width = square_w + 'px';
      box.style.height = square_w + 'px';
      box.style.position = 'absolute';
      box.style.top = (k / per_count >> 0) * square_w + 'px';
      box.style.left = (k % per_count) * square_w + 'px';
      mainCon.appendChild(box);
      boxMap.set(k + 1, box);
    }
  },
  initGround() {
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
  initSnk() {
    let snake = new Chain([]);
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