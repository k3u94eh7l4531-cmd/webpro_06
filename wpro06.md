# webpro_06のページ遷移図

### じゃんけん関係
#### ページ遷移図
```mermaid
stateDiagram-v2
[*] --> /public/janken.html
/public/janken.html --> /janken:手を選択(1)
/janken --> /janken:手を選択(2)
```

#### (1)のパラメータ

パラメータ名 | 属性 | 内容 | 値
-|-|-|-
hand | text | ユーザの手 | グー/チョキ/パー
win | hidden | 勝利数 | 0
total | hidden | 対戦数 | 0

#### (2)のパラメータ

パラメータ名 | 属性 | 内容 | 値
-|-|-|-
hand | text | ユーザの手 | グー/チョキ/パー
win | hidden | 勝利数 | これまでの勝利数
total | hidden | 対戦数 | これまでの対戦数


### 京葉線の駅関係
#### ページ遷移図
```mermaid
stateDiagram-v2
[*] --> /keiyo:一覧表示
/keiyo --> /public/keiyo_add.html:駅を追加する
[*] --> /public/keiyo_add.html
/public/keiyo_add.html --> /keiyo_add:登録
/keiyo_add --> /public/keiyo_add.html:駅を追加する
```

/keiyo_add はデータを追加したあと，db2.ejs による一覧表示を返す．
（データ登録画面にリダイレクトする方法も試したが，追加したデータが反映されたかすぐに確認できる一覧表示の方が良いと判断した）

#### /keiyo_add のパラメータ

パラメータ名 | 属性 | 内容 | 値
-|-|-|-
id | number | ID | 数値
code | text | 駅コード | JE01 など
name | text | 駅名 | 文字列

### 日本の山関係
#### ページ遷移図
```mermaid
stateDiagram-v2
[*] --> /mountain:一覧表示
/mountain --> /public/mountain_add.html:山を追加する
/public/mountain_add.html --> /mountain_add:登録
/mountain_add --> /public/mountain_add.html:山を追加する
```

#### /mountain_add のパラメータ

パラメータ名 | 属性 | 内容 | 値
-|-|-|-
id | number | ID | 数値
name | text | 山名 | 文字列
height | number | 標高(m) | 数値
pref | text | 都道府県 | 文字列

### 京葉線データベースアプリ（keiyo2）
#### リソース名と機能

機能 | method | リソース名 | 内容
-|-|-|-
一覧表示 | GET | /keiyo2 | 駅の一覧を表示する
新規登録フォーム | GET | /keiyo2/create | /public/keiyo2_new.html にリダイレクトする
新規登録処理 | POST | /keiyo2 | 駅を追加し，一覧を表示する
詳細表示 | GET | /keiyo2/:number | 駅の詳細を表示する
編集フォーム | GET | /keiyo2/edit/:number | 編集画面を表示する
更新処理 | POST | /keiyo2/update/:number | 駅の情報を更新し，一覧にリダイレクトする
削除処理 | GET | /keiyo2/delete/:number | 駅を削除し，一覧にリダイレクトする

:number は配列の番号（0から始まる）である．

#### ページ遷移図
削除は詳細ページから実行する．

```mermaid
stateDiagram-v2
[*] --> /keiyo2
/keiyo2 --> /keiyo2/create:追加
/keiyo2/create --> /public/keiyo2_new.html:リダイレクト
/public/keiyo2_new.html --> post_/keiyo2:登録
post_/keiyo2 --> /keiyo2:一覧表示
/keiyo2 --> /keiyo2/:number:駅名を選択
/keiyo2/:number --> /keiyo2:駅一覧に戻る
/keiyo2/:number --> /keiyo2/edit/:number:編集
/keiyo2/edit/:number --> /keiyo2/update/:number:登録
/keiyo2/update/:number --> /keiyo2:リダイレクト
/keiyo2/:number --> /keiyo2/delete/:number:削除
/keiyo2/delete/:number --> /keiyo2:リダイレクト
```
