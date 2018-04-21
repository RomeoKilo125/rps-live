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

}

$(document).ready(function() {
  game();
});
