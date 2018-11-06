var gameNumber = ~~(Math.random() * 100000);

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBBocEFG1hxeBFkDwZP587L1APyZino7Ec",
  authDomain: "battletimer-24bb3.firebaseapp.com",
  databaseURL: "https://battletimer-24bb3.firebaseio.com",
  projectId: "battletimer-24bb3",
  storageBucket: "battletimer-24bb3.appspot.com",
  messagingSenderId: "957130983331"
};
firebase.initializeApp(config);
const database = firebase.database();

//======================================= INTEGRATED TIMERS on FIREBASE :(

function createGame() {
  var gameName = prompt("Enter your game number", gameNumber);
  alert(
    "Your game number is " +
      gameNumber +
      ". Give this number to your opponent to join."
  );

  database
    .ref()
    .child("/Games/" + gameNumber + "/Number/")
    .set(gameName);

  goToLanding();
}

function joinGame() {
  var gameName = prompt("Enter your game number", gameNumber);

  var ref = firebase.database().ref("Games/" + gameNumber);
  ref.once("value").then(function(snapshot) {
    var name = snapshot.child("Number").val();

    if (gameName === name) {
      console.log(name);
      alert("Game " + gameName + " joined.");
      goToLanding();
    } else {
      console.log(name);
      alert("Game not found!");
    }
  });
}

//----------------------------

$("#splash").show();

$("#returnbutton").hide();
$("#endGameDiv").hide();
$("#goBack").hide();
$("#OgoBack").hide();
$("#opponentTurn").hide();
$("#yourturn").hide();
$("#accordion").hide();
$("#Oaccordion").hide();
$("#settings").hide();
$("#landing").hide();
$("#aboutThisApp").hide();
$("#returnToLandingButton").hide();
$("#OreturnToLandingButton").hide();
$("#initialSetupDiv").hide();

setTimeout(function() {
  $("#landing").fadeIn();
  $("#splash").hide();
}, 1000);

function hideLanding() {
  $("#landing").hide();
  $("#yourturn").fadeIn();
  $("#accordion").fadeIn();

  $("#endTurn").fadeIn();
  $("#overwatch").fadeIn();
  $("#endGame").fadeIn();
  $("#settings").hide();
  $("#initialSetupDiv").hide();
}

function OhideLanding() {
  $("#landing").hide();
  $("#opponentTurn").fadeIn();
  $("#Oaccordion").fadeIn();

  $("#OendTurn").fadeIn();
  $("#Ooverwatch").fadeIn();
  $("#OendGame").fadeIn();
  $("#settings").hide();
  $("#initialSetupDiv").hide();
}

function showSettings() {
  $("#settings").fadeIn();
  $("#returnbutton").fadeIn();

  $("#opponentTurn").hide();
  $("#yourturn").hide();
  $("#accordion").hide();
  $("#Oaccordion").hide();
  $("#landing").hide();
  $("#initialSetupDiv").hide();
}

function initialSetup() {
  $("#initialSetupDiv").fadeIn();
  $("#returnbutton").fadeIn();

  $("#opponentTurn").hide();
  $("#yourturn").hide();
  $("#accordion").hide();
  $("#Oaccordion").hide();
  $("#landing").hide();
}

function goToLanding() {
  $("#landing").fadeIn();
  $("#aboutThisApp").hide();
  $("#opponentTurn").hide();
  $("#yourturn").hide();
  $("#accordion").hide();
  $("#Oaccordion").hide();
  $("#settings").hide();
  $("#returnbutton").hide();
}

// TIMER ----------------------------------------------------------------------
var chessClock;
var timerOn = false;
var time = 4500;
var customTime = false;

function setGameTime() {
  var userTime = prompt(
    "Please enter new total game round length in minutes",
    "150"
  );

  customTime = true;
  time = (parseInt(userTime) * 60) / 2;
  Otime = (parseInt(userTime) * 60) / 2;

  var minutes = ~~(time / 60);
  var seconds = time - minutes * 60;
  span = document.getElementById("timerCount");
  span.innerHTML = minutes + ":" + seconds;

  var Ominutes = ~~(Otime / 60);
  var Oseconds = Otime - Ominutes * 60;
  span = document.getElementById("OtimerCount");
  span.innerHTML = Ominutes + ":" + Oseconds;

  $("#settings").hide();
  console.log(time);
  console.log(Otime);
  database
    .ref()
    .child("/Games/" + gameNumber + "/Player1/Time")
    .set(time);
  database
    .ref()
    .child("/Games/" + gameNumber + "/Player2/Time")
    .set(Otime);
  $("#landing").fadeIn();
  $("#returnbutton").hide();
}

$("#startTimer").click(function() {
  database
    .ref()
    .child("/Games/" + gameNumber + "/Player1/Timer")
    .set(time);

  clearInterval(chessClock);
  timerOn = true;
  chessClock = setInterval(function() {
    time--;
    console.log(time);

    if (time >= 0) {
      var minutes = ~~(time / 60);
      var seconds = time - minutes * 60;
      span = document.getElementById("timerCount");
      span.innerHTML = minutes + ":" + seconds;
    }
    if (time === 0) {
      alert("You are out of time.");
      clearInterval(time);
    }
    if ((timerOn = true)) {
      clearInterval(time);
    }
  }, 1000);
});

$("#pause").click(function() {
  console.log("Stopping");
  clearInterval(chessClock);
  database
    .ref()
    .child("/Games/" + gameNumber + "/Player1/Timer")
    .set(time);
});

// OPPONENT TIMER ----------------------------------------------------------------------
var OchessClock;
var OtimerOn = false;
var Otime = 4500;

$("#OstartTimer").click(function() {
  database
    .ref()
    .child("/Games/" + gameNumber + "/Player2/Timer")
    .set(Otime);
  clearInterval(OchessClock);
  OtimerOn = true;
  OchessClock = setInterval(function() {
    Otime--;
    console.log(Otime);
    if (Otime >= 0) {
      var Ominutes = ~~(Otime / 60);
      var Oseconds = Otime - Ominutes * 60;
      span = document.getElementById("OtimerCount");
      span.innerHTML = Ominutes + ":" + Oseconds;
    }
    if (Otime === 0) {
      alert("You are out of time.");
      clearInterval(Otime);
    }
    if ((OtimerOn = true)) {
      clearInterval(Otime);
    }
  }, 1000);
});

$("#Opause").click(function() {
  console.log("Opponent Stopping");
  clearInterval(OchessClock);
  database
    .ref()
    .child("/Games/" + gameNumber + "/Player2/Timer")
    .set(Otime);
});

//  end turn button ---------------------------------

var count = 1;
var OCount = 1;

$("#endTurn").click(function() {
  $("#yourturn").hide();
  $("#accordion").hide();
  $("#opponentTurn").fadeIn();
  $("#Oaccordion").fadeIn();
  clearInterval(chessClock);
  console.log("stopping");
  count++;
  $("#turncounter").text(count);
  if (count > 1) {
    $(".pregame").hide();
  }
  database
    .ref()
    .child("/Games/" + gameNumber + "/Player1/Timer")
    .set(time);
  database
    .ref()
    .child("/Games/" + gameNumber + "/Player1/TurnTime")
    .push(
      "Turn: " + (count - 1) + " " + "Time: " + ((4500 - time) / 60).toFixed(2)
    );
});

$("#OendTurn").click(function() {
  $("#opponentTurn").hide();
  $("#Oaccordion").hide();
  $("#yourturn").fadeIn();
  $("#accordion").fadeIn();
  clearInterval(OchessClock);
  console.log("stopping");
  OCount++;
  console.log("enemy turn " + OCount);
  $("#Oturncounter").text(OCount);
  if (OCount > 1) {
    $(".pregame").hide();
  }
  database
    .ref()
    .child("/Games/" + gameNumber + "/Player2/Timer")
    .set(Otime);
  database
    .ref()
    .child("/Games/" + gameNumber + "/Player2/TurnTime")
    .push(
      "Turn: " +
        (OCount - 1) +
        " " +
        "Time: " +
        ((4500 - Otime) / 60).toFixed(2)
    );
});

// OVERWATCH button ------------------------------------------------

$("#overwatch").click(function() {
  $("#yourturn").hide();
  $("#accordion").hide();
  $("#opponentTurn").fadeIn();
  clearInterval(chessClock);
  console.log("stopping");
  $("#goBack").fadeIn();
});

$("#goBack").click(function() {
  $("#yourturn").fadeIn();
  $("#accordion").fadeIn();
  $("#opponentTurn").hide();
  clearInterval(OchessClock);
  console.log("stopping");
  $("#goBack").hide();
});

$("#Ooverwatch").click(function() {
  $("#yourturn").fadeIn();
  $("#opponentTurn").hide();
  $("#Oaccordion").hide();
  clearInterval(OchessClock);
  console.log("Ostopping");
  $("#OgoBack").fadeIn();
});

$("#OgoBack").click(function() {
  $("#yourturn").hide();
  $("#opponentTurn").fadeIn();
  $("#Oaccordion").fadeIn();
  clearInterval(chessClock);
  console.log("stopping");
  $("#OgoBack").hide();
});
//   counters ---------------------------------

$(".vpCounter").click(function(e) {
  var button_classes;
  var value = +$(".vpCounter").val();
  button_classes = $(e.currentTarget).prop("class");
  if (button_classes.indexOf("up_count") !== -1) {
    value = value + 1;
  } else {
    value = value - 1;
  }
  value = value < 0 ? 0 : value;
  $(".vpCounter").val(value);
  $("#player1VP").text(value);
});
$(".vpCounter").click(function() {
  $(this)
    .focus()
    .select();
});

$(".cpCounter").click(function(e) {
  var button_classes;
  var value = +$(".cpCounter").val();
  button_classes = $(e.currentTarget).prop("class");
  if (button_classes.indexOf("up_count") !== -1) {
    value = value + 1;
  } else {
    value = value - 1;
  }
  value = value < 0 ? 0 : value;
  $(".cpCounter").val(value);
});
$(".cpCounter").click(function() {
  $(this)
    .focus()
    .select();
});

//  OPPONENT counters ---------------------------------

$(".OvpCounter").click(function(e) {
  var button_classes;
  var value = +$(".OvpCounter").val();
  button_classes = $(e.currentTarget).prop("class");
  if (button_classes.indexOf("up_count") !== -1) {
    value = value + 1;
  } else {
    value = value - 1;
  }
  value = value < 0 ? 0 : value;
  $(".OvpCounter").val(value);
  $("#player2VP").text(value);
});
$(".OvpCounter").click(function() {
  $(this)
    .focus()
    .select();
});

$(".OcpCounter").click(function(e) {
  var button_classes;
  var value = +$(".OcpCounter").val();
  button_classes = $(e.currentTarget).prop("class");
  if (button_classes.indexOf("up_count") !== -1) {
    value = value + 1;
  } else {
    value = value - 1;
  }
  value = value < 0 ? 0 : value;
  $(".OcpCounter").val(value);
});
$(".OcpCounter").click(function() {
  $(this)
    .focus()
    .select();
});

// return to landing buttons

$("#returnToLandingButton").click(function() {
  $("#accordion").hide();
  $("#landing").fadeIn();
  $("#returnToLandingButton").hide();
});

$("#OreturnToLandingButton").click(function() {
  $("#Oaccordion").hide();
  $("#landing").fadeIn();
  $("#OreturnToLandingButton").hide();
});

// end game button -----------------------------------------

function endGame() {
  if (confirm("Are you sure you want to end the game?") === true) {
    clearInterval(chessClock);
    clearInterval(OchessClock);
    $("#endGameDiv").fadeIn();
    $("#goBack").hide();
    $("#OgoBack").hide();
    $("#opponentTurn").hide();
    $("#yourturn").hide();
    $("#accordion").hide();
    $("#Oaccordion").hide();
    $("#settings").hide();
    $("#landing").hide();
    $("#aboutThisApp").hide();
    if ($("#player1VP").text() > $("#player2VP").text()) {
      $("#winningPlayer").text("Player One Wins!");
    } else if ($("#player1VP").text() == $("#player2VP").text()) {
      $("#winningPlayer").text("Round Draw");
    } else {
      $("#winningPlayer").text("Player Two Wins!");
    }
  }
}

// buttons for resetting game state
$("#keepCurrent").click(function() {
  $("#endGameDiv").hide();
  $("#landing").fadeIn();

  var count = 1;
  var OCount = 1;
  $("#turncounter").text(count);
  $("#Oturncounter").text(OCount);

  $(".OvpCounter").val(0);
  $(".OcpCounter").val(0);

  $(".vpCounter").val(0);
  $(".cpCounter").val(0);

  var newTime = prompt(
    "Please enter new total game round length in minutes",
    "150"
  );
  var newestTime = parseInt(newTime);

  if (newTime != null) {
    time = (newestTime * 60) / 2;
    Otime = (newestTime * 60) / 2;

    var minutes = ~~(time / 60);
    var seconds = time - minutes * 60;
    span = document.getElementById("timerCount");
    span.innerHTML = minutes + ":" + seconds;

    var Ominutes = ~~(Otime / 60);
    var Oseconds = Otime - Ominutes * 60;
    span = document.getElementById("OtimerCount");
    span.innerHTML = Ominutes + ":" + Oseconds;
  }

  $("#settings").hide();
  console.log(time);
  console.log(Otime);
});

$("#resetGameButton").click(function() {
  if (
    confirm("Resetting will clear all data, do you want to proceed?") === true
  ) {
    location.reload();
  }
});
