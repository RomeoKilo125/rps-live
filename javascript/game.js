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
  let player1Score = 0;
  let player2Score = 0;
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

    $('#score').text("ME 0 : 0 THEM");

    score.set({
      'player1': 0,
      'player2': 0
    });

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
    if (playerID && snapshot.val().player1.status && snapshot.val().player2.status) {
      startGame();
    }
  });

  weapons.on('value', function(snapshot) {
    if (snapshot.val().player1 && snapshot.val().player2) {
      let weapon1 = snapshot.val().player1;
      let weapon2 = snapshot.val().player2;

      if (weapon1 === weapon2) {
        $('#score').html('<h3>TIE</h3>');
      } else if (
        (weapon1 === 'S' && weapon2 === 'P') ||
        (weapon1 === 'P' && weapon2 === 'B') ||
        (weapon1 === 'B' && weapon2 === 'D') ||
        (weapon1 === 'D' && weapon2 === 'W') ||
        (weapon1 === 'W' && weapon2 === 'S') ||
        (weapon1 === 'S' && weapon2 === 'D') ||
        (weapon1 === 'D' && weapon2 === 'P') ||
        (weapon1 === 'P' && weapon2 === 'W') ||
        (weapon1 === 'W' && weapon2 === 'B') ||
        (weapon1 === 'B' && weapon2 === 'S')
      ) {
        player1Score++;
        $('#score').html('<h3>PLAYER 1!</h3>');
      } else {
        player2Score++;
        $('#score').html('<h3>PLAYER 2!</h3>');
      }

      score.set({
        'player1': player1Score,
        'player2': player2Score
      });

      setTimeout(function() {
        if (playerID === 'player1') {
          $('#score').text("YOU " + player1Score + " : THEM " + player2Score);
        } else {
          $('#score').text("YOU " + player2Score + " : THEM " + player1Score);
        }

        if (playerID === 'player1' && player1Score === 5) {
          $('#score').text("YOU WIN!!");
        } else if (playerID === 'player1' && player2Score === 5) {
          $('#score').text("YOU LOSE...");
        } else if (playerID === 'player2' && player2Score === 5) {
          $('#score').text("YOU WIN!!");
        } else if (playerID === 'player2' && player1Score === 5) {
          $('#score').text("YOU LOSE...");
        }

      }, 3000);
      weapons.child(playerID).set('');
    }
  });

  $('.weapon').on('click', function(event) {
    if (!playerID) {
      return
    }
    let selectedWeapon = $(this).attr('id');
    weapons.child(playerID).set(selectedWeapon);
  });
}

$(document).ready(function() {
  game();
});
