class Ball {

    _Radius;//rを小文字に（また来週）
    _x = 480 / 2;
    _y = 600 - 200;
    _dx = 5;
    _dy = -5;
    constructor(Radius) {
        this._Radius = Radius;
    }
    draw(c) {
        //console.log("ボールの情報：位置（" + this._x + "," + this._y + "）半径：" + this._Radius + "速度（" + this._dx + "," + this._dy + "）");
        /*c.beginPath();
        c.arc(this._x, this._y, this._Radius, 0, Math.PI * 2, false);
        c.fillStyle = "green";
        c.fill();
        c.closePath();*/
    }
    update() {
        this._x += this._dx;
        this._y += this._dy;
    }
    getRadius() {
        return this._Radius;
    }
    getX() {
        return this._x;
    }
    getY() {
        return this._y;
    }
    turnX() {
        this._dx *= -1;
    }
    turnY() {
        this._dy *= -1;
    }
    turnXY(i, j) {
        this._dx = -i;
        this._dy = -j;
    }
    //メソッドで一つのサイドにぶつけたかを判断します
    //option 1 ブリックの内側 -1　ブリックの外側 
    warningRightside(brick, option) {
        return this._x <= brick.getRight() - option * this._Radius;
    }
    warningLeftside(brick, option) {
        return this._x >= brick.getPositionX() + option * this._Radius;
    }
    warningTopside(brick, option) {
        return this._y >= brick.getPositionY() + option * this._Radius;
    }
    warningBottomside(brick, option) {
        return this._y <= brick.getBottom() - option * this._Radius;
    }

    //--------以上は静的------以下は動的-------
    touchRightWall(brick) {
        return this._x > brick.getRight() - this._Radius - Math.abs(this._dx);
    }
    touchLeftWall(brick) {
        return this._x < Math.abs(this._dx) + this._Radius + brick.getPositionX();
    }
    touchTopWall(brick) {
        return this._y < Math.abs(this._dy) + this._Radius + brick.getPositionY();
    }

    /*壁　ブリックの内側
      ブロック 　ブリックの外側  
    */
    strike(brick) {
        /*ブリックの種類を判断する
        ブリックの中にいると＞＞壁
        ブリックの外にいると＞＞スクリーンの半分以下＞＞パドル
                  ＞＞スクリーンの半分以上＞＞ブリック
        スクリーンの観点かるする左上は(0,0) 右下は(1960,1080)
        */
        if (this.warningRightside(brick, 1) && //右
            this.warningLeftside(brick, 1) && //左
            this.warningTopside(brick, 1) && //上
            this.warningBottomside(brick, 1)) { //下
            //壁の場合
            if (this.touchRightWall(brick) || this.touchLeftWall(brick)) {
                this.turnX();
                //console.log("横の壁をぶつけた");
            }
            if (this.touchTopWall(brick)) {
                this.turnY();
                //console.log("上の壁をぶつけた");
            }
            return false;
        } else {
            if (this._y > 200) {
                //パドルの場合
                //パドルの反射区域に入っているかを判断する
                if (this._x < brick.getRight() &&  //右
                    this._x > brick.getPositionX() && //左
                    this._y > brick.getPositionY() - this._Radius - Math.abs(this._dy) && //上
                    this._y < brick.getPositionY()) {　//下
                    var px = brick.getPositionX();
                    var bx = this._x;
                    var y = Math.PI * (bx - px) * 5 / 6 / brick.getWidth() + Math.PI / 12;
                    this.turnXY(5 * Math.sqrt(2) * Math.cos(y), 5 * Math.sqrt(2) * Math.sin(y));
                    //console.log("パドルをぶつけた");
                }
            } else {
                //ブリックの場合
                if (this.warningRightside(brick, -1) && //右
                    this.warningLeftside(brick, -1) && //左
                    this.warningTopside(brick, -1) && //上
                    this.warningBottomside(brick, -1)) {//下
                        this.draw(1);
                    if (this._x > brick.getPositionX() && this._x < brick.getRight()) {
                        this.turnY();
                        //console.log("ブリックの縦をぶつけた");
                    } else if (this._y > brick.getPositionY() && this._y < brick.getBottom()) {
                        this.turnX();
                        //console.log("ブリックの横をぶつけた");
                    } else {
                        this.turnY();
                        this.turnX();
                        //console.log("ブリックの隅をぶつけた");
                    }
                    return true;
                }
            }
        }
    }
}
//単体テスト
var ball = new Ball(5);
var firstX = ball.getX()
var firstY = ball.getY();
var firstR = ball.getRadius();

test('ボールの初期値', ()=>{
    expect(firstX).toBe(240);
    expect(firstY).toBe(400);
    expect(firstR).toBe(5);
});
var chdx1 = ball._dx;
ball.turnX() ;
var chdx2 = ball._dx;

var chdy1 = ball._dy;
ball.turnY() ;
var chdy2 = ball._dy;
test('曲がり（速度を変わる）', ()=>{
    expect(chdx2).toBe(-chdx1);
    expect(chdy2).toBe(-chdy1);
});
var chx1 = ball._x;
var chy1 = ball._y;
ball.update() ;
var chx2 = ball._x;
var chy2 = ball._y;
test('移動する', ()=>{
    expect(chx2).toBe(chx1+chdx2);
    expect(chy2).toBe(chy1+chdy2);
});
ball.turnXY(10, 10); 
test('速度をかわる', ()=>{
    expect(ball._dx).toBe(-10);
    expect(ball._dx).toBe(-10);
});
