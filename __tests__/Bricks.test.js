class Bricks {
    _row;
    _col;
    _padding;
    _OffsetTop;
    _OffsetLeft;
    _totalscore = 0;
    bricktable = [];
    constructor(row, col, padding, OffsetTop, OffsetLeft, num) {
        this._row = row;
        this._col = col;
        this._padding = padding;
        this._OffsetTop = OffsetTop;
        this._OffsetLeft = OffsetLeft;
        if (num > 9) {
            num = 9;
        }
        for (var c = 0; c < col; c++) {
            this.bricktable[c] = [];
            for (var r = 0; r < row; r++) {
                // 指定される場所にオブジェクトを代入する（x=0,y=0)
                //this.bricktable[c][r] = { brick: new Brick(20, 40, c * (40 + padding) + 1 + OffsetLeft, r * (20 + padding) + 1 + OffsetTop, num) };
                //this._totalscore += this.bricktable[c][r].brick.getStatus();
                this._totalscore += num;
            }
        }

    }
    draw(ctx) {
        for (var c = 0; c < this._col; c++) {
            for (var r = 0; r < this._row; r++) {
                if (this.bricktable[c][r].brick.getStatus() > 0) {
                    this.bricktable[c][r].brick.draw(ctx);
                }
            }
        }
    }
    getTotal() {
        return this._totalscore;
    }
    setTotal(score) {
        this._totalscore = score;
    }
    getCol() {
        return this._col;
    }
    getRow() {
        return this._row;
    }
}
var bricks = new Bricks(4, 9, 0, 50, 30, 2);
test('ブリックの初期値', ()=>{
    expect(bricks.getCol()).toBe(9);
    expect(bricks.getRow()).toBe(4);
    expect(bricks.getTotal()).toBe(72);
});
test('ブリックの合計ライフ', ()=>{
    bricks.setTotal(1999);
    expect(bricks.getTotal()).toBe(1999);
});

