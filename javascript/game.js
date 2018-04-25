game = function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBP18GvJXH3iePVVmaXK4jaiPJAs1Isrpw",
    authDomain: "bpswd-ef604.firebaseapp.com",
    databaseURL: "https://bpswd-ef604.firebaseio.com",
    projectId: "bpswd-ef604",
    storageBucket: "",
    messagingSenderId: "160046888502"
  };
  firebase.initializeApp(config);

  let database = firebase.database();
  let connections = database.ref('/connections');
  let connected = database.ref('.info/connected');
  let numOfPlayers = 0;
  let score1 = 0
  let score2 = 0

  startGame = function() {
    score1 = 0;
    score2 = 0;
    console.log(score1 + ":" + score2);

  }

  connected.on('value', function(snapshot) {

    if (snapshot.val()) {
      let con = connections.push(true);

      con.onDisconnect().remove();
    }

  });

  connections.on('value', function(snapshot) {

    numOfPlayers = snapshot.numChildren();
    console.log(numOfPlayers);
    if (numOfPlayers === 2) {
      startGame();
    }
  });


}

$(document).ready(function() {
  game();
});
