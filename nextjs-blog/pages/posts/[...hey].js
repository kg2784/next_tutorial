// 動的ページ
// [var]で囲う。varは任意の変数。

import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from '../../lib/posts'

// 全体的に返り値のキーは固定だけど、受け取る側は好きな名前で受け取れるぽい。
// どんな順番で記述しても、getStaticPaths -> getStaticProps -> FCの順で実行。記述順でエラーにはならない。まあ定義してるだけで実行順じゃないから当たり前か。

export async function getStaticProps(paramsss) {
  // params.id を使用して、ブログの投稿に必要なデータを取得する
  // ページパスとは別。コンテンツ用。
  // getStaticPathsで返されたpaths配列の要素のうち、ページ名に対応する要素オブジェクトを好きな名前で受け取れる

  console.log(paramsss);
  // console結果↓↓
  // {
  //   params: { hey: 'pre-rendering' },
  //   locales: undefined,
  //   locale: undefined,
  //   defaultLocale: undefined
  // }
  // 定義したparams以外にも余計なもんついてきてるな
  // サーバーサイドのみ実行

  // fetch(`http://localhost:3000/api/testapi.json`).then(response => response.json()).then(data => console.log(data));
  // うまくfetchできなかった。けど普通はできそう。fetchに不慣れだった。

  const data = getPostData(paramsss.params.hey)
  return {
    props: {
      // propsまで固定
      data
    }
  }
}

export default function Post(heyhey) {
  // getStaticPropsの返り値のpropsオブジェクトを好きな名前で受け取れる。
  // heyheyにpropsが代入されてる感じぽい

  console.log(heyhey);
  // console結果↓↓
  // {
  //   data: {
  //     id: 'pre-rendering',
  //     title: 'Two Forms of Pre-rendering',
  //     date: '2020-01-01'
  //   }
  // }
  // コンポーネントはクライアントサイドでもサーバサイドでも実行される

  return (
    <Layout>
      {heyhey.data.title}
      <br />
      {heyhey.data.id}
      <br />
      {heyhey.data.data}
    </Layout>
  )
}

export async function getStaticPaths() {
  // varとして取りうる値のリストを返す
  // ページパスはこれだけでok
  const paths = getAllPostIds();

  console.log('getStaticPathsだよーー');
  // サーバーサイドのみ実行

  // fallback: trueにした場合
  // 返したリストにないページも生成される
  // 無いページにアクセスしたときのサーバーログ
  //  getStaticPathsだよーー
  //  {}
  //  getStaticPathsだよーー
  //  {
  //    params: { hey: 'test' },
  //    locales: undefined,
  //    locale: undefined,
  //    defaultLocale: undefined
  //  }
  // getStaticPropsでもページコンポーネントでも、ページ名だけに紐づく静的なページなら問題なく出力できる。
  //  -> ページ名からマッチするデータを取得してそのデータを利用してページコンテンツを表示することはできない。
  //
  // falseのときは404ページに飛ぶ
  // pages/404.jsがあればそちらを使用
  return {
    paths,
    fallback: false,
  }
}

