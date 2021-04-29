# api-system001
Google App Script上で、Slack apiを用いて、Google FormからSlackに通知するシステム
## 使用言語
JavaScript
## 使用ライブラリ等
Slack api
Google App Script
### 前提
- [channel_URL]と書かれている部分はSlackチャンネルのURLを代入してください。
- [channel_name]と書かれている部分はSlackチャンネルの表示名を代入してください。
### 各関数の説明
- sendToSlackFromHirose

    デフォルトの名前でSlackに通知する関数です。
- sendToSlack

    Google Formの回答から取得した回答者の名前でSlackに通知する関数です。
- test

    開発段階で、きちんとメッセージがSlackに送信されるか確認するための関数です。
- onFormSubmit

    Google Formが回答されたタイミングで、その回答内容を変数に格納し、sendToSlackに渡します。
- reminder

    Google App Scriptのトリガー機能によって、毎日決まった時間帯にSlackに進捗報告の催促メッセージをsendToSlackFromHiroseに渡します。