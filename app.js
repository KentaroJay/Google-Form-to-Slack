//デフォルトで設定している人物が送信しているように見せる関数;
function sendToSlackFromHirose(body, channel) {
  var url =
    "[channel_URL]";
  var data = { channel: channel, text: body };
  var payload = JSON.stringify(data);
  var options = {
    method: "POST",
    contentType: "application/json",
    payload: payload,
  };
  var response = UrlFetchApp.fetch(url, options);
}

//特定の人物が送信しているように見せる関数
function sendToSlack(body, channel, name) {
  var url =
    "[channl_URL]";
  var data = {
    channel: channel,
    username: name,
    text: body,
    icon_emoji: ":date: ",
  };
  var payload = JSON.stringify(data);
  var options = {
    method: "POST",
    contentType: "application/json",
    payload: payload,
  };
  var response = UrlFetchApp.fetch(url, options);
}

//ちゃんと動作してるか確認するためのテスト送信関数
function test() {
  sendToSlackFromHirose("テスト通知確認です", "[channel_name]");
  sendToSlack("テスト通知確認です", "[channel_name]", "テストユーザー");
}

//Google Formに回答がきたらSlackに通知する関数
function onFormSubmit(e) {
  var body = "進捗共有が来ました.\n";
  var itemResponse = e.response.getItemResponses();

  for (var j = 0; j < itemResponse.length; j++) {
    var formData = itemResponse[j];
    var title = formData.getItem().getTitle();
    var response = formData.getResponse();

      //Google Formの質問内容に即した処理を書く
    labelCancelLoops: switch (title) {
      case "あなたの名前を選んでください。":
        name = response;
        break;
      case "本日の進捗はありますか？":
        workDay = response;
        if (workDay == "いいえ") {
          break labelCancelLoops;
        } else {
          break;
        }
      case "本日進捗したタスクと、そのタスクに対しての進捗度を記入してください。":
        progress = response;
        break;
      case "それぞれのタスクの完了目安を記入してください。":
        dueDay = response;
        break;
      default:
        break;
    }
    switch (title) {
      case "備考・その他連絡":
        if (response == "") {
          information = "なし";
        } else {
          information = response;
        }
        break;
      default:
        break;
    }
  }
  if (workDay == "はい") {
    var bodyPublic =
      body +
      "名前:" +
      name +
      "\n本日の進捗:" +
      workDay +
      "\n\n進捗したタスクとその進捗度:\n" +
      progress +
      "\n\nそれぞれのタスクの完了目安\n" +
      dueDay +
      "\n\n備考・その他連絡:\n" +
      information;
    sendToSlack(bodyPublic, "[chennel_name]", name);
  } else if (workDay == "いいえ") {
    var bodyPublic =
      body +
      "名前:" +
      name +
      "\n本日は休みもしくは進捗はありません." +
      "\n\n備考・その他連絡:\n" +
      information;
    sendToSlack(bodyPublic, "[channel_name]", name);
  }
}

//時間主導型のタイマーによって、毎日定刻に実行される関数
function reminder() {
  body =
    "<!channel>本日の進捗共有よろしくお願いします！\nこちらからお願いします:bow:\n" +
    "[Google Formの共有リンク]";
  sendToSlackFromHirose(body, "07_進捗共有版");
}
