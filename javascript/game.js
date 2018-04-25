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

  let playerID = "";
  let database = firebase.database();
  let weapons = database.ref('/weapons');
  let score = database.ref('/score');
  let connections = database.ref('/connections');
  let users = database.ref('/users');
  let connected = database.ref('.info/connected');
  let numOfPlayers = 0;
  let myScore = 0;
  let theirScore = 0;

  getPlayerID = function() {
    users.once('value', function(snap) {
      if (snap.val() && snap.val().player1.status) {
        playerID = 'player2';
      } else {
        playerID = 'player1';
      }
      console.log("Player ID: " + playerID);
      score.child(playerID).set(myScore);
      weapons.child(playerID).set('');
    }).then(function() {
      let statusRef = database.ref('/users/' + playerID + "/status");
      statusRef.set(true);
      statusRef.onDisconnect().set(false);
    });
  }

  startGame = function() {
    console.log('startgame');
    myScore = 0;
    theirScore = 0;

    $('#score').text("YOU " + myScore + " : " + theirScore + " THEM");

    weapons.set({
      'player1': '',
      'player2': ''
    });
  }

  connected.on('value', function(snapshot) {
    if (snapshot.val()) {

      let con = connections.push(true);

      connections.once('value', function(snapshot) {
        if (snapshot.numChildren() <= 2) {
          getPlayerID();
        }
      });

      con.onDisconnect().remove();
    }
  });

  users.on('value', function(snapshot) {
    console.log(playerID);
    if (playerID && snapshot.val().player1.status && snapshot.val().player2.status) {
      startGame();
    }
  });

  weapons.on('value', function(snapshot) {
    
  });

  $('.weapon').on('click', function(event) {
    if (!playerID) {
      return
    }
    let selectedWeapon = $(this).attr('id');
    console.log(selectedWeapon);
    weapons.child(playerID).set(selectedWeapon);
  });
}

$(document).ready(function() {
  game();
});
