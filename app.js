// import functions and grab DOM elements
const shedButton = document.getElementById('shed-button');
const treeButton = document.getElementById('tree-button');
const boulderButton = document.getElementById('boulder-button');

const shedContainer = document.getElementById('shed-container');
const treeContainer = document.getElementById('tree-container');
const boulderContainer = document.getElementById('boulder-container');

const totalEl = document.getElementById('total');
const lossesEl = document.getElementById('losses');
const winsEl = document.getElementById('wins');

const treeGuessesEl = document.getElementById('treeGuessCount');
const shedGuessesEl = document.getElementById('shedGuessCount');
const boulderGuessesEl = document.getElementById('boulderGuessCount');

const guessHistoryTable = document.getElementById('guessHistory');


let correctGuesses = 0;
let totalGuesses = 0;
let treeGuesses = 0;
let shedGuesses = 0;
let boulderGuesses = 0;

shedButton.addEventListener('click', () => {
    // get a random item to call the 'correct spot'
    const correctSpot = getRandomHidingSpot();
    // call the handleGuess function with the correct parameters (the user's guess and the "correct" hiding place) to do DOM work
    handleGuess('shed', correctSpot);
    updateGuessCount('shed');
    addGuessHistory(totalGuesses, 'shed', correctSpot);
});

treeButton.addEventListener('click', () => {
    // get a random item to call the 'correct spot'
    const correctSpot = getRandomHidingSpot();
    // call the handleGuess function with the correct parameters (the user's guess and the "correct" hiding place) to do DOM work
    handleGuess('tree', correctSpot);
    updateGuessCount('tree');
    addGuessHistory(totalGuesses, 'tree', correctSpot);
});

boulderButton.addEventListener('click', () => {
    // get a random item to call the 'correct spot'
    const correctSpot = getRandomHidingSpot();
    // call the handleGuess function with the correct parameters (the user's guess and the "correct" hiding place) to do DOM work
    handleGuess('boulder', correctSpot);
    updateGuessCount('boulder');
    addGuessHistory(totalGuesses, 'boulder', correctSpot);
});


function getRandomHidingSpot() {
    // initialize state
    const hidingPlaces = [
        'tree',
        'shed',
        'boulder'
    ];

    const index = Math.floor(Math.random() * hidingPlaces.length);

    // use the random index above and the array of hidingPlaces to get a random hiding place string
    const randomHidingSpot = hidingPlaces[index];
    // return that random hiding place string
    return randomHidingSpot;
}

function handleGuess(userGuess, correctSpot) {
    // first, right after clicking, we need to remove the emoiji face from the previous hiding place that way we don't end up with more than one emoji face

    // we can do that by removing the .face class from all containers
    shedContainer.classList.remove('face');
    treeContainer.classList.remove('face');
    boulderContainer.classList.remove('face');

    // then increment the guesses

    // then use getElementById and the correctSpot string to grab the appropriate container from the DOM
    const correctSpotEl = document.getElementById(correctSpot + '-container');

    // then add the .face css class to that element so that the face shows up
    correctSpotEl.classList.add('face');

    // then if the user guess is correct, increment the correct guesses
    totalGuesses++;

    if (userGuess === correctSpot) {
        correctGuesses++;
    }
    // update the DOM to show the new value of wins, losses and total guesses to the user
    totalEl.textContent = totalGuesses;
    winsEl.textContent = correctGuesses;
    lossesEl.textContent = totalGuesses - correctGuesses;
}

function updateGuessCount(userGuess) {
    switch (userGuess) {
        case 'shed':
            shedGuesses++;
            break;
        case 'tree':
            treeGuesses++;
            break;
        case 'boulder':
            boulderGuesses++;
            break;
        default:
            break;
    }
    treeGuessesEl.textContent = treeGuesses;
    shedGuessesEl.textContent = shedGuesses;
    boulderGuessesEl.textContent = boulderGuesses;
}

function addGuessHistory(gameNumber, userGuess, hidingPlace) {
    const newRow = guessHistoryTable.insertRow(1);
    newRow.insertCell(0).innerHTML = gameNumber;
    newRow.insertCell(1).innerHTML = userGuess;
    newRow.insertCell(2).innerHTML = hidingPlace;
    if (userGuess === hidingPlace) {
        newRow.classList.add('correctGuess');
    }
}
