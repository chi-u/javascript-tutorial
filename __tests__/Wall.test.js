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
class Wall extends Rect {
    constructor(height, width) {
        super(height, width);
        super._positionX = (480 - width) / 2;
        super._positionY = (600 - height) / 2;

    }
}
var wall = new Wall(540, 420);
test('壁の初期値', ()=>{
    expect(wall.getHeight()).toBe(540);
    expect(wall.getWidth()).toBe(420);
    expect(wall.getPositionX()).toBe(30);
    expect(wall.getPositionY()).toBe(30);
    expect(wall.getBottom()).toBe(570);
    expect(wall.getRight()).toBe(450);
    
});
