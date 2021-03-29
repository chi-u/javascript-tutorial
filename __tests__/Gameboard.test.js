class gameboard {
    _score;
    _lives;
    _bricks;
    _level = 1;
    _highscore;
    constructor(score, life, bricks) {
        this._score = score;
        this._lives = life;
        this._bricks = bricks;
    }

    draw(c) {
        //console.log("ゲームの情報：ライフ" + this.getLives() + "トップ" + this._height);
/*
        c.font = "16px Arial";
        c.fillStyle = "#0095DD";
        c.fillText("Score: " + this._score, 8, 20);
        c.fillText("レベル:" + this._level + "   あと:" + this._bricks.getTotal() + "   トップ:" + this._highscore, 480 / 2 - 150, 20);

        c.fillText("Lives " + this._lives, 480 - 65, 20);
*/
    }
    setHighscore(hs) {
        this._highscore = hs;
    }

    getScore() {
        return this._score;
    }
    plusScore() {
        this._score++;
    }
    minusLives() {
        this._lives--;
    }
    getLives() {
        return this._lives;
    }
    levelup() {
        this._level++;
    }
    getLevel() {
        return this._level;
    }
    setBricks(b) {
        this._bricks = b;
    }
}
var board = new gameboard(0, 3, null);
test('ボードの初期値', ()=>{
    expect(board.getScore()).toBe(0);
    expect(board.getLives()).toBe(3);
    expect(board.getLevel()).toBe(1);   
});
test('ボードのトップ点数変更', ()=>{
    expect(board._highscore).toBeUndefined();
    board.setHighscore(50);
    expect(board._highscore).toBe(50);   
});
test('ボードの点数増加', ()=>{
    board.plusScore();
    expect(board.getScore()).toBe(1);   
});
test('ボードのライフ減少', ()=>{
    board.minusLives() ;
    expect(board.getLives()).toBe(2);   
});
test('ボードのレベルアップ', ()=>{
    board.levelup();
    expect(board.getLevel()).toBe(2);   
});




