//Module creates necessary game objects to store scores and marks on gameboard
const gameBoard = (() => {
    const grid = [...document.querySelectorAll('.field')];
    const arrayX = [];
    const arrayO = [];
    const array = [];
        return {
            grid,
            arrayX,
            arrayO,
            array
        }
})();

//Array of winning constellations + winner array
const winArr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];
//Tracks the game winner
let winner = [];

//Factory function to create players -- NOT IN USE
const Player = (string) => {
    const getMarker = () => string;
    return {
        getMarker
    }
}
//Dummy players -- NOT IN USE
const player1 = Player('x').getMarker();
const player2 = Player('o').getMarker();

//
const Markers = ['X', 'O'];
let tracking = gameBoard.array

//Module contains marker placing logic -- Alternating Xs and Os
const markerMod = (() => {
   const placeMark = (e) => {
    if(e.target.textContent === '' && tracking[tracking.length-1] === undefined) {
        tracking.push(Markers[0]);
        e.target.textContent = Markers[0];
        gameBoard.arrayX.push(parseInt(e.target.dataset.field))
    }
        else if(e.target.textContent === '' && tracking[tracking.length-1] === Markers[0]){
            tracking.push(Markers[1]);
            e.target.textContent = Markers[1];
            gameBoard.arrayO.push(parseInt(e.target.dataset.field))
        }
            else if(e.target.textContent === '' && tracking[tracking.length-1] === Markers[1]){
                tracking.push(Markers[0]);
                e.target.textContent = Markers[0];
                gameBoard.arrayX.push(parseInt(e.target.dataset.field))
            }
            else return
    evalWin()}
    return { placeMark } //Return fn to public
})();

//Play Module -- Makes grid interactive -- Clears grid -- Adds restart button
const playMod = (()=> {
    let game = () => gameBoard.grid.forEach(field => field.addEventListener('click', markerMod.placeMark))

    //Clear the fields text contents
    const clearBoard = () => {
        gameBoard.grid.forEach(field=>field.textContent = '');
        gameBoard.array = [];
        gameBoard.arrayX = [];
        gameBoard.arrayO = [];
        winner = [];
        tracking = gameBoard.array;
        game();
    }

    //Adds Restart button
const display = document.querySelector('.display');
    let restartBtn = document.createElement('button');
    restartBtn.textContent = 'Restart';
    restartBtn.classList.add('btn')
    display.append(restartBtn)
    let clear = () => restartBtn.addEventListener('click', clearBoard)
    return {
     game: game(),
     clear: clear()
    }
 })();

//Evaluates game outcome
function evalWin(){
    for (let i = 0; i < winArr.length; i++){
        if(winArr[i].every(val => gameBoard.arrayX.includes(val))){
            winner.push('x');
            console.log('X Wins!');
            gameWinner.winner('Player');
        }
        if(winArr[i].every(val => gameBoard.arrayO.includes(val))){
            winner.push('o');
            console.log('O Wins!');
            gameWinner.winner('Roboto');
        }
        if(gameBoard.array.length >= 9 && winner.length === 0) {
            console.log(`TIE`);
            gameWinner.tie();
        }
    }
    if(gameBoard.array.length >= 9 || winner.length !== 0) {
    gameBoard.grid.forEach(field=>field.removeEventListener('click', markerMod.placeMark))

    }
}

const gameWinner = (() => {
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('.close');
    const text = document.querySelector('.modal-text');
        const winner = (winner) => {
            text.textContent = `${winner} has won this match!`;
            modal.style.display = 'block';
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            })
            window.addEventListener('click', (e) => {
                if(e.target == modal) 
                modal.style.display = 'none';
            })
        };
        const tie = () => {
            text.textContent = `It's a tied game!`;
            modal.style.display = 'block';
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            })
            window.addEventListener('click', (e) => {
                if(e.target == modal) 
                modal.style.display = 'none';
            })
        }
    return {
        winner,
        tie
    }
})();
//DOM Manipulation:
//Create messages popup
//
//Try to create AI CPU opponent