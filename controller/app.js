var app = angular.module("app", []);
app.controller("GameController", function ($scope) {
	var words = ["rat", "cat", "bat", "mat","remember","container","mountain"];
	$scope.incorrectLettersChosen = [];
	$scope.correctLettersChosen = [];
	$scope.guesses = 6;
	$scope.displayeWord = '';
	$scope.input = {
		letter:''
	}
	var selectRandomWord = function () {
		var index = Math.round(Math.random() * words.length);
		return words[index];
	}

	var newGame = function () {
		$scope.incorrectLettersChosen = [];
		$scope.correctLettersChosen = [];
		$scope.guesses = 6;
		$scope.displayeWord = '';

		selectedWord =selectRandomWord();
		var tempDisplayWord = '';
		for (var i = 0; i < selectedWord.length; i++) {
			tempDisplayWord += '*';
		}
		$scope.displayeWord = tempDisplayWord;
	}
	$scope.letterChosen = function () {
		for (var i = 0; i < $scope.correctLettersChosen.length; i++) {
			if ($scope.correctLettersChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
				$scope.input.letter = "";
				return;
			}
		}

		for (var i = 0; i < $scope.incorrectLettersChosen.length; i++) {
			if ($scope.incorrectLettersChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
				$scope.input.letter = "";
				return;
			}
		}

		var correct = false;
		for (var i = 0; i < selectedWord.length; i++) {
			if (selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
				$scope.displayeWord = $scope.displayeWord.slice(0, i) + $scope.input.letter.toLowerCase() + $scope.displayeWord.slice(i + 1);
				correct = true;
			}
		}

		if (correct) {
			$scope.correctLettersChosen.push($scope.input.letter.toLowerCase());
		}
		else {
			$scope.guesses--;
			$scope.incorrectLettersChosen.push($scope.input.letter.toLowerCase());
			
		}
		$scope.input.letter = "";
		//ran out of guesses
		if ($scope.guesses == 0) {
			alert("You lost !");
		}
		if ($scope.displayeWord.indexOf("*") == -1) {
			alert("You Won yeah !");
		}
	}
	newGame();
})