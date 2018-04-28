chat = function(id) {

  // console.log("Chat Player ID: " + id);

  let database = firebase.database();
  let chat = database.ref('/chat');
  let chatArray = []
  startChat = function() {
    chatArray = [];
    chat.set(chatArray.join('|'));
    $('#chatInput').val('');
    $('#chatArea').empty();
  }

  $('#btnSubmit').on("click", function(event) {
    event.preventDefault();
    let msg = $('#chatInput').val()
    chatArray.push(id + ": " + msg)
    chat.set(chatArray.join('|'));

    $('#chatInput').val('');

  });

  chat.on('value', function(shot) {
    let lastMsg = shot.val().split('|').pop();
    $('#chatArea').append(lastMsg + "<br />");
  });

  

}
