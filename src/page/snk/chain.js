export default class Chain {
  constructor(arr = []) {
      this.chain = [];
      let len = arr.length;
      this.chain.length = len;
      for (let i = 0; i < len; i++) {
        chain[i] = {
          prev: i - 1,
          index: i,
          next: i !== len - 1 ? i + 1 : -1,
          data: arr[i]
        };
      }
      this.HEAD = len > 0 ? 0 : -1;
      this.TAIL = len > 0 ? len - 1 : -1;
      this.POINTER = -1;
      this.FREE = len;
      this.FREELIST = [];
      this.length = this.chain.length;
      this[Symbol.iterator] = () => {
        let that = this,
          cur = that.chain[this.HEAD];
        return (function*() {
          while (cur !== undefined) {
            yield cur;
            cur = that.chain[cur.next];
          }
        }());
      }
    }
    //返回头部并删除第一个节点
  shift() {
      this.FREE = this.HEAD;
      this.HEAD = this.chain[this.FREE].next;
      this.HEAD !== -1 && (this.chain[this.HEAD].prev = -1);
      --this.length === 0 && (this.TAIL = -1);
      this.collection();
      return this.chain[this.HEAD];
    }
    //头部增加一个节点
  unshift(item) {
      this.calloc();
      let second = this.HEAD;
      this.HEAD = this.FREE;
      let first = this.chain[this.HEAD] = {
        prev: -1,
        index: this.HEAD,
        next: second,
        data: item
      };
      if (second !== -1) {
        this.chain[second].prev = this.HEAD;
      } else {
        this.HEAD = this.TAIL = -1;
      }
      this.length--;
    }
    //删除最后一个节点
  pop() {
      this.FREE = this.TAIL;
      this.TAIL = this.chain[this.FREE].prev;
      this.TAIL !== -1 && (this.chain[this.TAIL].next = -1);
      this.collection();
      --this.length === 0 && (this.HEAD = -1);
      return this.chain[this.FREE];
    }
    //增加一个节点
  push(item) {
    this.calloc();
    let last = this.TAIL;
    this.TAIL = this.FREE;
    this.chain[this.TAIL] = {
      prev: last,
      index: this.TAIL,
      next: -1,
      data: item
    };
    if (last !== -1) {
      this.chain[last].next = this.TAIL
    } else {
      this.HEAD = this.TAIL;
    }
    this.length++;
  }
  insertBefore(index, item) {
    if (index < 0 || index >= this.length) return;
    let next = this.at(index),
      prev = this.chain[next.prev] || {
        index: -1
      };
    this.calloc();
    let curr = this.chain[this.FREE] = {
      prev: prev.index,
      index: this.FREE,
      next: next.index,
      data: item
    };
    next.prev = curr.index;
    if (prev.index !== -1) {
      prev.next = curr.index;
    } else {
      this.HEAD = curr.index;
    }
    this.length++;
  }
  insertAfter(index, item) {
    if (index < 0 || index >= this.length) return;
    let prev = this.at(index);
    next = this.chain[prev.next] || {
      index: -1
    };
    this.calloc();
    let curr = this.chain[this.FREE] = {
      prev: prev.index,
      index: this.FREE,
      next: next.index,
      data: item
    };
    prev.next = curr.index;
    if (next.index !== -1) {
      next.prev = curr.index;
    } else {
      this.TAIL = curr.index;
    }
    this.length++;
  }
  remove(index) {
    if (index < 0 || index >= this.length) return;
    if (index == 0) {
      this.shift();
    } else if (index = this.length - 1) {
      this.pop();
    } else {
      let curr = this.at(index),
        prev = this.chain(curr.prev),
        next = this.chain(curr.next);
      this.FREE = curr.index;
      next.prev = prev.index;
      prev.next = next.index;
      this.collection();
      this.length--;
      return curr;
    }
  }
  clone() {
    let copy = new Chain();
    for (let key of['HEAD', 'TAIL', 'length', 'FREE']) {
      copy[key] = this[key];
    }
    copy.chain.length = copy.length;
    for (let i = 0; i < copy.length; i++) {
      copy.chain = Object.create(this.chain[i]);
    }
    copy.FREELIST = [...this.FREELIST];
    return copy;
  }
  clean() {
    this.chain = [];
    this.chain.length = 0;
    this.length = 0;
    this.FREELIST = [];
    this.FREELIST.length = 0;
    this.POINTER = -1;
    this.HEAD = -1;
    this.TAIL = -1;
    this.FREE = 0;
  }
  at(index = 0) {
    if (index < 0 || index >= this.length) return;
    let cur;
    if (index < this.length / 2) {
      cur = this.chain[this.HEAD];
      for (let i = 0; i !== index; ++i) {
        cur = this.chain[cur.next];
        this.POINTER = cur.index;
      }
    } else {
      cur = this.chain[this.TAIL];
      for (let i = this.length - 1; i !== index; --i) {
        cur = this.chain[cur.prev];
      }
    }
    return cur;
  }
  curr() {
    return this.chain[this.POINTER];
  }
  prev() {
    let curr = this.curr();
    this.POINTER = (this.POINTER !== -1 ? curr.prev : this.HEAD);
    return this.chain[this.POINTER];
  }
  next() {
    let curr = this.curr();
    this.POINTER = (this.POINTER !== -1 ? curr.next : this.TAIL);
    return this.chain[this.POINTER];
  }
  first() {
    return this.chain[this.HEAD];
  }
  last() {
    return this.chain[this.TAIL];
  }
  setPointer(addr = this.POINTER) {
    if (addr >= 0 && addr < this.length) {
      this.POINTER = addr;
      return true;
    }
  }
  pointerAt(addr) {
    if (addr >= 0 && addr < this.length) {
      return this.cahin[addr];
    }
  }
  collection() {
    this.FREELIST.push(this.FREE);
  }
  calloc() {
    this.FREE = this.FREELIST.length ? this.FREELIST.pop() : this.chain.length;
  }
}