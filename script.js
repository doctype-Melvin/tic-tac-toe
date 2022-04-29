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

//Module contains marker placing logic -- Alternating Xs and Os -- Human vs AI
const markerMod = (() => {
    //Two human players
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
    evalWin()
};
    //Man vs Roboto
    const placeX = (e) => {
    if(e.target.textContent === '' && tracking[tracking.length-1] === undefined) {
        e.target.textContent = Markers[0];
        tracking.push(Markers[0]);
        gameBoard.arrayX.push(parseInt(e.target.dataset.field));
    }
        else if(e.target.textContent === '' && tracking[tracking.length-1] === Markers[1]){
            e.target.textContent = Markers[0];
            tracking.push(Markers[0]);
            gameBoard.arrayX.push(parseInt(e.target.dataset.field));
        }
        else return;
    evalWin()
    aiMarker()
};
    const aiMarker = () => {
        let field = Math.floor(Math.random()*9);
        if(gameBoard.grid[field].textContent === '' && winner.length === 0){
        gameBoard.grid[field].textContent = Markers[1];
        tracking.push(Markers[1]);
        gameBoard.arrayO.push(field)
        }
        else if(gameBoard.grid[field].textContent !== '' && gameBoard.array.length >= 9) return
            else if(gameBoard.grid[field].textContent !== ''){
                aiMarker()
            }
    }
    return {
        placeMark,
        placeX,
        aiMarker
    } //Return fn to public
})();

//Play Module -- Makes grid interactive -- Clears grid -- Adds restart button
const playMod = (()=> {
    let game = () => gameBoard.grid.forEach(field => field.addEventListener('click', markerMod.placeMark))
    
    //Clear the fields text contents
    const clear = () => {
        gameBoard.grid.forEach(field=>field.textContent = '');
        gameBoard.array = [];
        gameBoard.arrayX = [];
        gameBoard.arrayO = [];
        winner = [];
        tracking = gameBoard.array;
        console.clear()
    }

    //Adds different game modes
const display = document.querySelector('.display');
    let vsHuman = document.createElement('button');
    vsHuman.textContent = 'vs Human';
    vsHuman.classList.add('btn');
    display.append(vsHuman);
    let vsPlayer = () => {
        gameBoard.grid.forEach(field => field.removeEventListener('click', markerMod.placeX));
        gameBoard.grid.forEach(field => field.addEventListener('click', markerMod.placeMark));
        clear()
    }
    vsHuman.addEventListener('click', vsPlayer);
        
        let vsRoboto = document.createElement('button');
        vsRoboto.textContent = `vs Roboto`;
        vsRoboto.classList.add('btn');
        display.append(vsRoboto);
        let vsCpu = () => {
            gameBoard.grid.forEach(field => field.removeEventListener('click', markerMod.placeMark));
            gameBoard.grid.forEach(field => field.addEventListener('click', markerMod.placeX));
            clear()
        };
        vsRoboto.addEventListener('click', vsCpu);
        game()
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
       else if(winner[0] === undefined && gameBoard.array.length >= 9) {
            console.log(`TIE`);
            gameWinner.tie();
        }
    }
    if(gameBoard.array.length >= 9 || winner.length !== 0) {
    gameBoard.grid.forEach(field=>field.removeEventListener('click', markerMod.placeMark))
    }
}

//Creates the popup at the end of the game
const gameWinner = (() => {
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('.close');
    const text = document.querySelector('.modal-text');
        //Declares winner
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
        //Declares tie
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
//Try to create AI CPU opponent
//Add button that removes eventlistener for human vs human mode