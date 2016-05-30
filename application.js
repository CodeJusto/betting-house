
var currentCash = startingCash = 100;
var winnings = 0
var count = 1

function randomTen() {
  return Math.ceil((Math.random() * 10))
}

function gameOverCheck() {
  $('#result').text('YOU LOSE');
  $('#log').empty()
  $('#answer').text('Play again?');
  $('#retryButton').show();
}

function cashUpdater() {
  currentCash += winnings;
  $('#cash').text(currentCash);
  $('#log').text("Total cash changed to $" + currentCash);
  if (currentCash <= 0) {
    gameOverCheck()
  }
}

function gameReset(e) {
  e.preventDefault();
  e.stopPropagation();
  currentCash = startingCash = 100;
  $('#cash').text(startingCash);
  $('#answer').empty();
  $('#log').empty();
  $('#betAmount').val("");
  $('#guessAmount').val("");
  $('#result').text("");
  $('.title').find('h2').find('span').text(++count);
  $('#retryButton').hide();
}

$(document).ready(function () {

  $('#retryButton').hide();

  $('form').on('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var currentBet = +$(this).find('#betAmount').val();
    var currentGuess = +$(this).find('#guessAmount').val();
    var answer = randomTen();
    console.log(randomTen());
    if (currentGuess === answer) {
      $('#answer').text('You guessed correctly! The winning number was ' + answer)
      winnings = currentBet
    } else if (currentGuess === answer++ || currentGuess == answer--) {
      $('#answer').text('You were close! The winning number was ' + answer + '. Try again!');
      winnings = 0;
    } else {
      $('#answer').text('You guessed incorrectly! The winning number was ' + answer);
      winnings = -currentBet;
    }

    if (currentBet > 0 && currentBet <= currentCash) {
      cashUpdater();
    } else {
      $('#answer').empty();
      $('#log').text("You either bet a negative number or you bet more than you have.");
    }
  });

  $('#retryButton').closest('.form').on('submit', function(e) {
    gameReset(e);
  });


});