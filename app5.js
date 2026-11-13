const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db2', { data: station });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  // 登録後はデータ一覧ページを返す（追加されたことをすぐ確認できるため）
  // 入力ページに戻す場合は res.redirect('/public/keiyo_add.html'); とする
  res.render('db2', { data: station });
});

// 課題(2)(3)：日本の山の一覧と追加
let mountain = [
  { id:1, name:"富士山",   height:3776, pref:"静岡県・山梨県"},
  { id:2, name:"北岳",     height:3193, pref:"山梨県"},
  { id:3, name:"奥穂高岳", height:3190, pref:"長野県・岐阜県"},
  { id:4, name:"槍ヶ岳",   height:3180, pref:"長野県"},
  { id:5, name:"御嶽山",   height:3067, pref:"長野県・岐阜県"},
  { id:6, name:"筑波山",   height:877,  pref:"茨城県"},
];

app.get("/mountain", (req, res) => {
  res.render('mountain', { data: mountain });
});

app.get("/mountain_add", (req, res) => {
  let id = Number( req.query.id );
  let name = req.query.name;
  let height = Number( req.query.height );
  let pref = req.query.pref;
  let newdata = { id: id, name: name, height: height, pref: pref };
  mountain.push( newdata );
  res.render('mountain', { data: mountain });
});

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
