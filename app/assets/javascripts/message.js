$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="chat-main__message-list__box" data-message-id=${message.id}>
          <div class="chat-main__message-list__data">
            <p class="chat-main__message-list__data__name">
              ${message.user_name}
            </p>
            <p class="chat-main__message-list__data__time">
              ${message.created_at}
            </p>
          </div>
          <p class="chat-main__message-list__box__message">
            ${message.content}
          </p>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="chat-main__message-list__box" data-message-id=${message.id}>
          <div class="chat-main__message-list__data">
            <p class="chat-main__message-list__data__name">
              ${message.user_name}
            </p>
            <p class="chat-main__message-list__data__time">
              ${message.created_at}
            </p>
          </div>
          <p class="chat-main__message-list__box__message">
            ${message.content}
          </p>
        </div>`
      return html;
    };
  }

  $(function() {
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    console.log(formData)
    var url = $(this).attr('action');
    console.log(url)
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.chat-main__message-list__box:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.chat-main__message-list').append(insertHTML);
          $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert('error');
      });
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
  });
});
  