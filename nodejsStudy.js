'use Strict'
//変数の定義

//モジュールの読み込み
//ファイル操作
const fs = require('fs');
//htmlテンプレート
const ejs = require('ejs');
//urlのバース
const url = require('url');
//httpサーバー
const http = require('http');

//fsを使ってファイルを読み込む
const indexPage = fs.readFileSync('./index.ejs', 'utf8');
const otherPage = fs.readFileSync('./other.ejs', 'utf8');
const StyleCss = fs.readFileSync('./style.css', 'utf8');

//バックコール関数の定義
function call(tmp) {
    tmp
}

//httpサーバーのポート番号
const port = 8000;

//httpサーバーの作成
const server = http.createServer(getFormClient);

//httpサーバーの起動
server.listen(port);

//httpサーバー内の処理
function getFormClient(request, response) {
    /**
     * クライアントからのリクエストの処理
     * request.urtでアクセスしたurlを取得後url.parseでパースする
     */
    var urlParts = url.parse(request.urt, true);
    //ルーティング
    //urlParts内に収納されているパス名をもとに処理を分岐する
    switch (urlParts.pathname) {

        case '/':
            var content = 'これはIndexページです。';
            var query = urlParts.query;
            if (query.msg != undefined) {
                var queryObj =
                    content += 'あなたは、「' + query.msg + '」と送りました。';
            }
            //ejsを使ってテンプレートを作成する
            var content = ejs.render(indexPage, {
                title: 'Index',
                content: content,
            });
            //httpサーバーのレスポンス
            response.writeHead(200, {
                'content-Type': 'text/html'
            });
            response.write(content);
            response.end();
            break;
        case '/other':
            response.writeHead(200, {
                'content-Type': 'text/html'
            });
            response.write(otherPage);
            response.end();
            break;
        case '/style.css':
            response.writeHead(200, {
                'content-Type': 'text/css'
            });
            response.write(StyleCss);
            response.end();
            break;
        default:
            response.writeHead(200, {
                'content-Type': 'text/plain'
            });
            response.end('no page...');
            break;
    }
}
