
var currentCash = startingCash = 100;
var winnings = 0;
var betCount = 0;
var winCount = 0;
var startingCash = 100;

function randomTen() {
  return Math.ceil(Math.random() * 10);
}

function gameOverCheck() {
  $('#result').text('YOU LOSE');
  $('#log').empty();
  $('#answer').text('Play again?');
  $('#retryButton').closest('form').show();
  $('#submitButton').prop('disabled', 'true');

}

function cashUpdater() {
  currentCash += winnings;
  $('#cash').text(currentCash);
  $('#log').text("Total cash changed to $" + currentCash);
    if (currentCash <= 0) {
      gameOverCheck();
    }
}

function gameReset(e) {
  noPageRefresh(e);
  currentCash = startingCash = 100;
  winCount = betCount = 0;
  $('#cash').text(startingCash);
  $('.text').empty();
  $('.input').val('');
  $('#submitButton').removeProp('disabled');
  $('#retryButton').closest('form').hide();
  $('#wins').text(winCount)
  $('.title').find('h2').find('span').text(betCount);
  $('#winrate').text(0);
}

function noPageRefresh(e) {
  e.preventDefault();
  e.stopPropagation();
}


function rangeChecker(currentGuess, answer) {
  currentGuess === answer++ || currentGuess == answer--;
}

$(document).ready(function () {

  $('#retryButton').closest('form').hide();

  $('form').on('submit', function(e) {
    noPageRefresh(e);
    var currentBet = +$(this).find('#betAmount').val();
    var currentGuess = +$(this).find('#guessAmount').val();
    if (currentGuess < 1 || currentGuess > 10) {
      $('#answer').text('You have to guess between 1 and 10!');
      return;
    }
    var answer = randomTen();
    //console.log(randomTen());
    if (currentGuess === answer) {
      $('#answer').text('You guessed correctly! The winning number was ' + answer);
      winnings = currentBet;
      winCount++;
      $('#wins').text(winCount);
    } else if (rangeChecker(currentGuess, answer)) {
      $('#answer').text('You were close! The winning number was ' + answer + '. Try again!');
      winnings = 0;
    } else {
      $('#answer').text('You guessed incorrectly! The winning number was ' + answer);
      winnings = -currentBet;
    }

    if (currentBet > 0 && currentBet <= currentCash) {
      cashUpdater();
      betCount++;
    } else {
      $('#answer').text("You either bet a negative number or you bet more than you have.");
    }

    $('#winrate').text((winCount/betCount) * 100);
    $('.title').find('h2').find('span').text(betCount);
  });

    $('#retryButton').closest('form').on('submit', function (e) {
        gameReset(e);
    });
});