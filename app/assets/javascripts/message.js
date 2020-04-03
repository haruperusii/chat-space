$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="chat-main__message-list__box">
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
       `<div class="chat-main__message-list__box">
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
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
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
});
});