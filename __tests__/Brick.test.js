class Rect {
    _height;
    _width;
    _positionX;
    _positionY;
    constructor(height, width) {
        this._width = width;
        this._height = height;
    }
    getHeight() {
        return this._height;
    }
    getWidth() {
        return this._width;
    }
    getPositionX() {
        return this._positionX;
    }
    getPositionY() {
        return this._positionY;
    }
    getBottom() {
        return this._positionY + this._height;
    }
    getRight() {
        return this._positionX + this._width;
    }
}
class Brick extends Rect {
    _status;
    _color = ["#005511", "#007533", "#009555", "#005577", "#007599", "#0095AA", "#0055CC", "#0075EE"];
    constructor(height, width, postX, postY, num) {
        super(height, width);
        super._positionX = postX;
        super._positionY = postY;
        this._status = Math.floor(Math.random() * num);
    }
    getStatus() {
        return this._status;
    }
    setStatus(status) {
        this._status = status;
    }
}
//https://jestjs.io/ja/docs/expect
//参考して機能を追加しました。
expect.extend({
    toBeWithinRange(received, floor, ceiling) {
      const pass = received >= floor && received <= ceiling;
      if (pass) {
        return {
          message: () =>
            `expected ${received} not to be within range ${floor} - ${ceiling}`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} to be within range ${floor} - ${ceiling}`,
          pass: false,
        };
      }
    },
  });
var brick = new Brick(20, 40,60,100, 7);
test('ブリックの初期値', ()=>{
    expect(brick.getHeight()).toBe(20);
    expect(brick.getWidth()).toBe(40);
    expect(brick.getPositionX()).toBe(60);
    expect(brick.getPositionY()).toBe(100);
    expect(brick.getBottom()).toBe(120);
    expect(brick.getRight()).toBe(100);
    expect(brick.getStatus()).toBeWithinRange(0,7);
    
});
test('ブリックのライフ変更', ()=>{
    brick.setStatus(10);
    expect(brick.getStatus()).toBe(10);
});
