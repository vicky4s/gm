import Chain from "./chain.js";
//import map from "./map.js";
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
const scoreText = document.getElementById('J_score');
const timeText = document.getElementById('J_time');

const directionAry = ['left', 'up', 'right', 'down']; //37,38,39,40

const Control = {
  init() {
    this.boxKeys = new Array();
    this.initMap();
    this.initGround();
    this.snake = this.initSnk();
    this.fId = 0;
    this.gameover = false;
    this.score = 0;
    this.palytime = 0;
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

    me.timeCount = setInterval(function() {
      if (!me.gameover) {
        me.palytime++;
        timeText.innerHTML = me.formatDuring(me.palytime);
      } else {
        me.timeCount && clearInterval(me.timeCount);
      }
    }, 1000);
    document.onkeydown = function(e) {
      var keyCode = e.keyCode;
      me.handleDirection(keyCode);
    };
    var btns = document.getElementsByClassName('J_directionBtn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].onclick = function() {
        var keyCode = parseInt(this.title);
        me.handleDirection(keyCode);
      };
    }
  },
  handleDirection(keyCode) {
    var me = this;
    if (keyCode >= 37 && keyCode <= 40) {
      if ((keyCode == 37 || keyCode == 39) && (me.direction == 'left' || me.direction == 'right')) {
        return;
      } else if ((keyCode == 38 || keyCode == 40) && (me.direction == 'up' || me.direction == 'down')) {
        return;
      } else {
        me.direction = directionAry[keyCode - 37];
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
    snakeNodeMap.set(hd, curtHead);
    if (me.fId !== hd) {
      let curtLast = me.snake.last().data;
      boxMap.get(curtLast).style.background = 'none';
      snakeNodeMap.delete(curtLast);
      me.snake.pop();
    } else {
      me.score++;
      scoreText.innerHTML = me.score;
      setTimeout(function() {
        me.feed();
      }, sceonds);
    }
  },
  feed() {
    var me = this,
      snakeKeys = [...snakeNodeMap.keys()],
      foodsAry = me.boxKeys.filter(x => !snakeKeys.includes(x));
    let fId = Math.random() * foodsAry.length >> 0;
    me.fId = foodsAry[fId];
    boxMap.get(me.fId).style.background = '#FFED5F';
  },
  initMap() {
    var me = this;
    for (let k = 0; k < total; k++) {
      let box = document.createElement('div');
      box.style.width = square_w + 'px';
      box.style.height = square_w + 'px';
      box.style.position = 'absolute';
      box.style.top = (k / per_count >> 0) * square_w + 'px';
      box.style.left = (k % per_count) * square_w + 'px';
      mainCon.appendChild(box);
      let key = k + 1;
      boxMap.set(key, box);
      me.boxKeys.push(key);
    }
  },
  initGround() {
    let pixel = 4;
    let canvas = document.getElementById('ground');
    canvas.width = w * pixel;
    canvas.height = h * pixel;
    canvas.style.background = '#8BC34A';
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    let ctx = canvas.getContext('2d');
    for (let i = 1; i < row; i++) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "#38521987";
      ctx.moveTo(i * square_w * pixel, 0);
      ctx.lineTo(i * square_w * pixel, w * pixel);
      ctx.closePath();
      ctx.stroke();
    }
    for (let j = 1; j < col; j++) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "#38521987";
      ctx.moveTo(0, j * square_w * pixel);
      ctx.lineTo(w * pixel, j * square_w * pixel);
      ctx.closePath();
      ctx.stroke();
    }
  },
  initSnk() {
    let snake = new Chain([]);
    var n1 = (per_count / 2 >> 0) * (per_count - 1),
      n2 = n1 + 1,
      n3 = n1 + 2;
    snake.push(n1);
    let node1 = boxMap.get(n1);
    node1.style.background = '#FF0000';
    snakeNodeMap.set(n1, node1);

    snake.push(n2);
    let node2 = boxMap.get(n2);
    node2.style.background = '#FF0000';
    snakeNodeMap.set(n2, node2);

    snake.push(n3);
    let node3 = boxMap.get(n3);
    node3.style.background = '#FF0000';
    snakeNodeMap.set(n3, node3);
    return snake;
  },
  formatDuring(mss) {
    let hours = parseInt((mss % (60 * 60 * 24)) / (60 * 60));
    let minutes = parseInt((mss % (60 * 60)) / 60);
    let seconds = mss % 60;
    return this.single2Double(hours) + ":" + this.single2Double(minutes) + ":" + this.single2Double(seconds);
  },
  single2Double(d) {
    return d < 10 ? ('0' + d) : d;
  }
};
Control.init();