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
class Paddle extends Rect {
    constructor(height, width) {
        super(height, width);
        super._positionX = (480-width)/2;
        super._positionY = 600 - 100;
    }

    setPositionX(position) {
        this._positionX = position;
    }
    setWidth(width) {
        super._width = width;
    }
}
var paddle = new Paddle(10, 70);
test('パドルの初期値', ()=>{
    expect(paddle.getHeight()).toBe(10);
    expect(paddle.getWidth()).toBe(70);
    expect(paddle.getPositionX()).toBe(205);
    expect(paddle.getPositionY()).toBe(500);
    expect(paddle.getBottom()).toBe(510);
    expect(paddle.getRight()).toBe(275);
    
});
test('パドルの位置変更', ()=>{
    paddle.setPositionX(90)
    expect(paddle.getPositionX()).toBe(90);
});
test('パドルの長さ変更', ()=>{
    paddle.setWidth(90)
    expect(paddle.getWidth()).toBe(90);
});