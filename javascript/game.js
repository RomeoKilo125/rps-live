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
  let weapons = database.ref('/weapons');
  let score = database.ref('/score');
  let connections = database.ref('/connections');
  let connected = database.ref('.info/connected');
  let numOfPlayers = 0;
  let myScore = 0;
  let theirScore = 0;
  let playerID = "";

  getPlayerID = function() {
    connections.once('value', function(snap) {
      playerID = snap.numChildren().toString();
      console.log("Player ID: " + playerID);
      score.child(playerID).set(myScore);
    });
  }

  startGame = function() {
    myScore = 0;
    theirScore = 0;

    $('#score').text("YOU " + myScore + " : " + theirScore + " THEM");

    weapons.set({
      1: '',
      2: ''
    });
  }

  connected.on('value', function(snapshot) {
    if (snapshot.val()) {
      let con = connections.push(true);
      getPlayerID();
      con.onDisconnect().remove();
    }
  });

  connections.on('value', function(snapshot) {
    numOfPlayers = snapshot.numChildren();
    numOfPlayers === 2 ? startGame() : '';
  });

  $('.weapon').on('click', function(event) {
    let selectedWeapon = $(this).attr('id');
    console.log(selectedWeapon);
    weapons.child(playerID).set(selectedWeapon);
  });
}

$(document).ready(function() {
  game();
});
