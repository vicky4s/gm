import Chain from "./chain.js";
const per_count = 20;
const row = per_count,
  col = per_count,
  total = row * col;
const w = window.innerWidth,
  h = w,
  square_w = w / per_count;
const sceonds = 300;

const boxMap = new Map();
const snakeNodeMap = new Map();
const mainCon = document.getElementById('mainCon');
const directionAry = ['left', 'up', 'right', 'down']; //37,38,39,40
const App = {
  init() {
    this.initMap();
    this.initGround();
    this.snake = this.initSnk();
    this.fId = 0;
    this.gameover = false;
    this.feed();
    var me = this;
    me.direction = 'left';
    me.interval = setInterval(function() {
      if (!me.gameover) {
        me.handleMove();
      } else {
        me.interval && clearInterval(me.interval);
      }
    }, sceonds);
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
    };
    var btns = document.getElementsByClassName('J_directionBtn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].onclick = function() {
        me.direction = this.title;
      };
    }
  },
  handleMove() {
    var me = this;
    let fdt = me.snake.first().data;
    var remain = fdt % per_count;
    switch (me.direction) {
      case 'up': //上
        if (fdt < per_count) {
          me.gameover = true;
          alert('Ouch~撞墙啦T_T');
          break;
        }
        var hd = fdt - per_count;
        me.updateBody(hd);
        break;
      case 'right': //右
        if (remain === 0) {
          me.gameover = true;
          alert('Ouch~撞墙啦T_T');
          break;
        }
        var hd = fdt + 1;
        me.updateBody(hd);
        break;
      case 'down': //下
        if (fdt > per_count * (per_count - 1)) {
          me.gameover = true;
          alert('Ouch~撞墙啦T_T');
          break;
        }
        var hd = fdt + per_count;
        me.updateBody(hd);
        break;
      case 'left': //左
        if (remain === 1) {
          me.gameover = true;
          alert('Ouch~撞墙啦T_T');
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
    if (snakeNodeMap.has(hd)) {
      alert('Ouch~咬到自己啦T_T');
      me.gameover = true;
      return;
    }
    me.snake.unshift(hd);
    let curtHead = boxMap.get(hd);
    curtHead.style.background = '#FF0000';
    if (me.fId !== hd) {
      let curtLast = me.snake.last().data;
      boxMap.get(curtLast).style.background = 'none';
      snakeNodeMap.set(hd, curtHead);
      snakeNodeMap.delete(curtLast);
      me.snake.pop();
    } else {
      setTimeout(function() {
        me.feed();
      }, sceonds);
    }

  },
  feed() {
    var me = this;
    let fId = Math.random() * total >> 0;
    if (snakeNodeMap.has(fId)) {
      me.feed();
    } else {
      this.fId = fId;
      let fd = boxMap.get(fId);
      fd.style.background = '#FFED5F';
    }
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
    let node1 = boxMap.get(190);
    node1.style.background = '#FF0000';
    snakeNodeMap.set(190, node1);

    snake.push(191);
    let node2 = boxMap.get(191);
    node2.style.background = '#FF0000';
    snakeNodeMap.set(191, node2);

    snake.push(192);
    let node3 = boxMap.get(192);
    node3.style.background = '#FF0000';
    snakeNodeMap.set(192, node3);
    return snake;
  }
}
App.init();