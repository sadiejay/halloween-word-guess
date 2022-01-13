// The unordered list where the player’s guessed letters will appear.
var guessList = document.querySelector('.guessed-letters');

// The button with the text “Guess!” in it.\
var guessButton = document.querySelector('.guess');

// The text input where the player will guess a letter.
var guessLetter = document.querySelector('.letter');

// Label for guess form
var labelForm = document.querySelector('.label-form');

// The empty paragraph where the word in progress will appear.
var wordIP = document.querySelector('.word-in-progress');

// The paragraph where the remaining guesses will display.
var guessRemainingPara = document.querySelector('.remaining');

// The span containing the number of guesses inside the paragraph where the remaining guesses will display.
var guessRemainingHave = document.querySelector('.span-have');
// The span containing the number of guesses inside the paragraph where the remaining guesses will display.
var guessRemainingNumber = document.querySelector('.span-number');
// the second span containing the word 'remaining'
var guessRemainingWord = document.querySelector('.span-remaining');
// The empty paragraph where messages will appear when the player guesses a letter.
var message = document.querySelector('.message');

// The hidden button that will appear prompting the player to play again.
var playAgain = document.querySelector('.play-again');

// Magnolia is your starting word to test out the game 
var word = 'magnolia';

// Holds user's guessed letters
var guessedLetters = [];

// number of guesses
let remainingGuesses = 11;

// wrapping async code with function
const getWord = async function () {
    Promise.all([
        (async () => {
            let getObjects = await fetch('https://raw.githubusercontent.com/sadiejay/spooky-words/main/words/objects.txt');
            let getObjectsData = await getObjects.text();

            //   collections data
            let getCollections = await fetch('https://raw.githubusercontent.com/sadiejay/spooky-words/main/words/collections.txt');
            let getCollectionsData = await getCollections.text();

            //   
            let getPredicates = await fetch('https://raw.githubusercontent.com/sadiejay/spooky-words/main/words/predicates.txt');
            let getPredicatesData = await getPredicates.text();

            //   
            let getTeams = await fetch('https://raw.githubusercontent.com/sadiejay/spooky-words/main/words/teams.txt');
            let getTeamsData = await getTeams.text();

            // adds all the words together in one list 
            const data = getObjectsData.concat(getCollectionsData, getPredicatesData, getTeamsData)

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
                console.log(wordArray);
            }

        })(),
    ]);
}

// Display our symbols as placeholders for the chosen word's letters
// const wordIPSymbol = function (word) {
const wordIPSymbol = word => {
    // Focus on letter input
    guessLetter.focus();
    const placeholderLetters = [];
    for (const letter of word) {
        //! umcomment below for answer  
        // console.log(letter);
        placeholderLetters.push('⚰️');
    }
    wordIP.innerText = placeholderLetters.join('');

}

// Start the game
getWord();

guessButton.addEventListener('click', function (e) {
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
const validateInput = (input) => {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === '') {
        message.innerText = "You forgot your letter. . .  Or are you too scared?"
    } else if (input.length > 1) {
        message.innerText = 'Only one letter can be conjured at a time.'
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "I require letters from the English language for my magic."
    } else {
        return input;
    }
}

const makeGuess = function (guess) {
    //  transform input to uppercase
    guess = guess.toUpperCase();

    if (guessedLetters.includes(guess)) {
        message.innerText = 'This letter has been called before. Try again.'
    } else {
        guessedLetters.push(guess);
        guessesCount(guess);
        showGuessedLetters();
        updateWIP(guessedLetters);
    }
    // console.log(guessedLetters);
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
    // ! to see the answer uncomment below
    // console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("⚰️");
        }
    }
    wordIP.innerText = revealWord.join("");
    winningGuess();
};

// counts guesses remaining
const guessesCount = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `No ${guess}, summon a new letter. `;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Indeed our word has the letter ${guess}.`;
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `Our time here is done. The word was <span class="highlight">${word}</span>.`;
        // ! show word
        // console.log(wordArray);
        const revealWordEnding = [];
        for (const letter of upperWord) {
            revealWordEnding.push(letter.toUpperCase());
            // console.log(revealWordEnding);
        }
        wordIP.innerText = revealWordEnding.join("");
        startOver();
    } else if (remainingGuesses === 1) {
        // guessRemainingWord.innerText = '';
        guessRemainingHave.classList.add('hide');
        guessRemainingWord.classList.add('hide');
        guessRemainingNumber.innerText = `${remainingGuesses} guess left! Choose wisely.`;
        //! fix by adding another span around "remaining."
    } else {
        guessRemainingNumber.innerText = `${remainingGuesses} guesses`;
    }
};


// verifies if player won
const winningGuess = function () {
    if (word.toUpperCase() === wordIP.innerText) {
        message.classList.add('win');
        wordIP.classList.add('highlight');
        message.innerHTML = '<p class="highlight">Conjuring complete. Our word is now undead. Thank you for your cooperation.</p>';
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
    // Guess form area
    labelForm.classList.add('hide')
    // Gues letter box
    guessLetter.classList.add('hide')
    // remove highlight from word-in-progress
    wordIP.classList.remove('highlight');
    // play again
    playAgain.classList.remove('hide');
    playAgain.focus();
};

// play again / reset
playAgain.addEventListener('click', function () {
    message.classList.remove('win');
    remainingGuesses = 11;
    guessedLetters = [];
    guessRemainingNumber.innerText = `${remainingGuesses} guesses`;
    guessList.innerHTML = "";
    message.innerText = "";
    getWord();

    // button
    guessButton.classList.remove('hide');
    // remaianig guesses
    guessRemainingPara.classList.remove('hide');
    guessRemainingHave.classList.remove('hide');
    guessRemainingWord.classList.remove('hide');
    // Guess form
    labelForm.classList.remove('hide')
    guessLetter.classList.remove('hide')

    // undordered list
    guessList.classList.remove('hide');
    // play again button
    playAgain.classList.add('hide');

});