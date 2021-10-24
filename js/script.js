// The unordered list where the player’s guessed letters will appear.
var guessList = document.querySelector('.guessed-letters');

// The button with the text “Guess!” in it.\
var guessButton = document.querySelector('.guess');

// The text input where the player will guess a letter.
var guessLetter = document.querySelector('.letter');

// The empty paragraph where the word in progress will appear.
var wordIP = document.querySelector('.word-in-progress');

// The paragraph where the remaining guesses will display.
var guessRemainingPara = document.querySelector('.remaining');

// The span inside the paragraph where the remaining guesses will display.
var guessRemainingSpan = document.querySelector('.remaining span');
// ! add second span and class names to the 2 spans

// The empty paragraph where messages will appear when the player guesses a letter.
var message = document.querySelector('.message');

// The hidden button that will appear prompting the player to play again.
var playAgain= document.querySelector('.play-again');

// Magnolia is your starting word to test out the game 
var word = 'magnolia';

// Holds user's guessed letters
var guessedLetters = [];

// number of guesses
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch(
        'https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt'
      );
    const data = await res.text();
    //   console.log(data);

    const wordArray = data.split("\n");

    // select random word

    const randomIndex = Math.floor(Math.random() * wordArray.length);
    // console.log(randomIndex);
    word = wordArray[randomIndex].trim();
    // grab words less than 10 characters
    if (word.length > 10) {
        getWord();
      } else {
        wordIPSymbol(word);
    // console.log(wordArray);
      }


};


// Display our symbols as placeholders for the chosen word's letters
const wordIPSymbol = function (word) {
    // Focus on letter input
    guessLetter.focus();
    const placeholderLetters = [];
    for (const letter of word) {
      console.log(letter);
      placeholderLetters.push('●');
    }
    wordIP.innerText = placeholderLetters.join('');
}

// Start the game
getWord(); 

guessButton.addEventListener ('click', function (e) {
    e.preventDefault(); 
    // Focus on letter input
    guessLetter.focus();
    message.innerText = '';
    const guess = guessLetter.value;
    const goodGuess = validateInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    }
    guessLetter.value = '';

});

//  check users input
 const validateInput= function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === '') {
        message.innerText = "Hey! You forgot your letter!"
    } else if (input.length > 1) {
        message.innerText ='Oops! One letter at a time please!'
    } else if (!input.match(acceptedLetter)) {
       message.innerText = "That doesn't look like an Enligsh letter to me!"
    } else {
        return input;
    }
 }

 const makeGuess = function (guess) {
    //  transform input to uppercase
    guess = guess.toUpperCase();
     
    if (guessedLetters.includes(guess)) {
        message.innerText = 'Uh oh! You already guessed that letter! Try again.'
    } else {
        guessedLetters.push(guess);
        guessesCount(guess);
        showGuessedLetters();
        updateWIP(guessedLetters);
    }
    console.log(guessedLetters);
 }

//  function updates the page with users' guesses
 const showGuessedLetters = function () {
    // clears list first
    guessList.innerHTML = '';
    for (const letter of guessedLetters) {
        const li = document.createElement('li');
        li.innerText = letter;
        guessList.append(li);
    }

 };

 // function replaces circle symbols
 const updateWIP = function (guessedLetters) {
    let wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split('');
    console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
        revealWord.push(letter.toUpperCase());
        } else {
        revealWord.push("●");
        }
    }
    wordIP.innerText = revealWord.join("");
    winningGuess();
};

// counts guesses remaining
const guessesCount = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Nice guess! The word has the letter ${guess}.`;
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `Ooo sorry. Game Over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        guessRemainingSpan.innerText = `${remainingGuesses} guess left! Choose wisely.`
        //! fix by adding another span around "remaining."
    } else {
        guessRemainingSpan.innerText = `${remainingGuesses} guesses`
    }
};


// verifies if player won
const winningGuess = function () {
    if (word.toUpperCase() === wordIP.innerText) {
        message.classList.add('win');
        message.innerHTML = '<p class="highlight">Yay! You found the right word! Congrats!</p>';
        startOver();
    }
};

const startOver = function () {
     // Show play again button and shift focus there - hide guess button and letters
     guessLetter.blur();
    // button
    guessButton.classList.add('hide');
    // remaianig guesses
    guessRemainingPara.classList.add('hide');
    // undordered list
    guessList.classList.add('hide');
    // play again
    playAgain.classList.remove('hide');
    playAgain.focus();
};

    // play again / reset
playAgain.addEventListener('click', function() {
    message.classList.remove('win');
    remainingGuesses = 8;
    guessedLetter = [];
    guessRemainingSpan.innerText = `${remainingGuesses} guesses`;
    guessList.innerHTML = "";
    message.innerText = "";
    getWord();

    // button
    guessButton.classList.remove('hide');
    // remaianig guesses
    guessRemainingPara.classList.remove('hide');
    // undordered list
    guessList.classList.remove('hide');
    // play again button
    playAgain.classList.add('hide');

});