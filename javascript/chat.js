chat = function(id) {

  // console.log("Chat Player ID: " + id);

  let database = firebase.database();
  let chat = database.ref('/chat');
  let chatArray = []
  startChat = function() {
    chatArray = [];
    chat.set('');
    $('#chatInput').val('');
    $('#chatArea').empty();
  }

  $('#btnSubmit').on("click", function(event) {
    event.preventDefault();
    let msg = $('#chatInput').val().trim();
    chatArray.push(id + ": " + msg);
    chat.set(chatArray.join('|'));

    $('#chatInput').val('');

  });

  chat.on('value', function(shot) {
    chatArray = shot.val().split('|');
    let lastMsg = shot.val().split('|').pop();
    $('#chatArea').append(lastMsg + "<br />");
  });

  $(document).on('keyup', function(e) {
    e.keyCode === 13 ? $('#btnSubmit').trigger('click') : '';
  });

}
