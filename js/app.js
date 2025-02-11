
/*-------------------------------- Notes ------------------------------------*/

// It’s a one-player game.
// The player is tasked with keeping a creature happy.
// Each creature a player ‘raises’ has three main statistics.
// The stats are:
// Boredom
// Hunger
// Sleepiness
// To keep the creature happy, a player must keep three stats within a given range - greater than 0 and less than 10.

/*---------------------------------------------------------------------------*/
/*--------------------- Minimum Requirements --------------------------------*/


// [] Display three buttons when the page is initially displayed.
// [] Display three stats that randomly increment a value between 0 and 3 at a set interval.
// [] A player can click a button to set the corresponding stat to 0.
// [] Include loss logic and display a message when the player has lost.
// [] Provide a Play Again button that will reset the game.



/*-------------------------------- Psuedocode -------------------------------*/

// 1) Define the required variables used to track the state of the game.

// 2) Store cached element references.

// 3) Upon loading, the game state should be initialized, and a function should 
//    be called to render this game state.

// 4) The state of the game should be rendered to the user.

// 5) Handle the game over logic. 

// 6) Handle each instance of a player clicking a button with the use of a 
//    `handleClick()` function.

// 7) Create reset functionality.


/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/

let state = {
    boredom: 0,
    hunger: 0,
    sleepiness: 0
};

let timer;

let gameOver;

/*------------------------ Cached Element References ------------------------*/

// stats displays
const boredomStatEl = document.querySelector('#boredom-stat');
const hungerStatEl = document.querySelector('#hunger-stat');
const sleepinessStatEl = document.querySelector('#sleepiness-stat');

// ALL action buttons
const actionButtonsEl = document.querySelector('.button-wrapper')

// game message
const gameMessageEl = document.querySelector('#message');

// reset button
const resetButtonEl = document.querySelector('#restart');

/*-------------------------------- Functions --------------------------------*/

// random integer generator
// thank you to MDN for this function; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    // The maximum is exclusive and the minimum is inclusive
}

const init = () => {
    resetButtonEl.classList.add('hidden');
    gameMessageEl.classList.add('hidden');
    gameOver = false;
    playBtnClick();
    feedBtnClick();
    sleepBtnClick();
    timer = setInterval(runGame, 2000);
};

const runGame = () => {
    updateStates();
    render();
    checkGameOver();
};

const updateStates = () => {
    state.boredom += getRandomInt(0, 3);
    state.hunger += getRandomInt(0, 3);
    state.sleepiness += getRandomInt(0, 3);
};

const render = () => {
    boredomStatEl.textContent = state.boredom;
    hungerStatEl.textContent = state.hunger;
    sleepinessStatEl.textContent = state.sleepiness;
};

checkGameOver = () => {
    if (state.boredom >= 10 || state.hunger >= 10 || state.sleepiness >= 10) {
        gameOver = true;
        clearInterval(timer);

        // could combine these to children of game-state-wrapper
        gameMessageEl.classList.remove('hidden');
        resetButtonEl.classList.remove('hidden');
    };
};

// could combine these all under a single function maybe?
const playBtnClick = () => {
    if (!gameOver) { state.boredom = 0 };
    render();
};

const feedBtnClick = () => {
    if (!gameOver) { state.hunger = 0 };
    render();
};

const sleepBtnClick = () => {
    if (!gameOver) { state.sleepiness = 0 };
    render();
};


/*----------------------------- Event Listeners -----------------------------*/


actionButtonsEl.addEventListener('click', (event)=> {
    let actionName = event.target.getAttribute('id') + 'BtnClick()'
    if (event.target.getAttribute('id')) {eval(actionName)};
});

resetButtonEl.addEventListener('click', init);

/*--------------------------- Actions on page load --------------------------*/

init();

/*--------------------------- code graveyard --------------------------------*/

// action buttons
// const playButtonEl = document.querySelector('#play');
// const feedButtonEl = document.querySelector('#feed');
// const sleepButtonEl = document.querySelector('#sleep');

// individual event listeners
// playButtonEl.addEventListener('click', playBtnClick);
// feedButtonEl.addEventListener('click', feedBtnClick);
// sleepButtonEl.addEventListener('click', sleepBtnClick);


/*---------------------------------------------------------------------------*/
