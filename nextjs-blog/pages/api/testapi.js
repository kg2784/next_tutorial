// なんで無名関数？
// どこにデプロイされる？？

// export default (q, s, i3) => {
//   console.log('test'); // サーバー側にしか出ない。サーバーで実行されてる。
//   // console.log(i3); // 3つめはundefinedになるから引数は2つ。jsだとエラーにはならない。
//   // console.log('req', req);
//   // console.log('res', res); // reqもresもなんかでかめのデータ入ってきた。「引数を2つ持つ無名関数をpage/api/xxx.jsに置くこと」がnextのルールなのかも。
//   // 違う。node.jsのルールぽい

//   // 第一引数：node.jsで定められたhttp.IncomingMessage
//   // 第二引数：node.jsで定められたhttp.ServerResponse

//   // これなんだ？返り値はない。レスポンスのstatus200にjsonをセットするだけだ。
//   // console.log(s.status(200)); // ServerResponseのインスタンスだった
//   s.status(200).json({ text: 'Hello' }) // status code 200のときにServerResponseのjsonメソッドの引数に返したいデータを渡してセットしてもらってる
// }

export function hello(req, res) {
  // 名前付きの関数でも正常に返ってくる
  res.status(200).json({ text: '名前つけた' })
}

// defaultがついた関数でreqとresを受け取って操作できるみたい。
export default function gallo(rq, rs) {
  rs.status(200).json({ text: 'gallo' })
}

// defaultが同時に2つあるとリクエスト時にエラーになる