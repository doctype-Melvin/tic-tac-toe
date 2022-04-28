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

//Array of winning array constellations
const winArr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

//Factory function to create players
const Player = (string) => {
    const getMarker = () => string;
    return {
        getMarker
    }
}
//Dummy players
const player1 = Player('x').getMarker();
const player2 = Player('o').getMarker();

//
const Markers = ['x', 'o'];
const tracking = gameBoard.array

//Makes grid interactive and holds logic to placing marks on gameboard -- 'Play Module'
const playMod = (()=> {
   let game = gameBoard.grid.forEach(field => field.addEventListener('click', () => {
    if(field.textContent === '' && tracking[tracking.length-1] === undefined) {
        tracking.push(Markers[0]);
        field.textContent = Markers[0];
        gameBoard.arrayX.push(parseInt(field.dataset.field))
    }
        else if(field.textContent === '' && tracking[tracking.length-1] === Markers[0]){
            tracking.push(Markers[1]);
            field.textContent = Markers[1];
            gameBoard.arrayO.push(parseInt(field.dataset.field))
        }
            else if(field.textContent === '' && tracking[tracking.length-1] === Markers[1]){
                tracking.push(Markers[0]);
                field.textContent = Markers[0];
                gameBoard.arrayX.push(parseInt(field.dataset.field))
            } 
    else return
    evalWin()
    return game
}))
})()

//Evaluates game outcome
function evalWin(){
    let winner = [];
    for (let i = 0; i < winArr.length; i++){
        if(winArr[i].every(val => gameBoard.arrayX.includes(val))){
            winner.push('x')
            console.log('X Wins!')
        }
        if(winArr[i].every(val => gameBoard.arrayO.includes(val))){
            winner.push('o')
            console.log('O Wins!')
        }
        if(gameBoard.arrayX.length > 4 && winner.length === 0) {
            console.log(`TIE`)
        }
    }
    console.log(winner)
}

