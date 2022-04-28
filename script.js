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

const win = (() => {
    const firstRow = [1, 2, 3];
    const secondRow = [4, 5, 6];
    const thirdRow = [7, 8, 9];
    const firstCol = [1, 4, 7];
    const secondCol = [2, 5, 8];
    const thirdCol = [3, 6, 9];
    const crossLeft = [1, 5, 9];
    const crossRight = [3, 5, 7];
        return {
            firstRow,
            secondRow,
            thirdRow,
            firstCol,
            secondCol,
            thirdCol,
            crossLeft,
            crossRight
        }
})()

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

const Player = (string) => {
    const getMarker = () => string;
    return {
        getMarker
    }
}

const player1 = Player('x').getMarker();
const player2 = Player('o').getMarker();
const Markers = ['x', 'o'];
const tracking = gameBoard.array

gameBoard.grid.forEach(field => field.addEventListener('click', () => {
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
    console.log(tracking);
    //console.log(gameBoard.arrayX, gameBoard.arrayO)
    evalWin()
}))

//Create winning arrays and check if game arrays include winning arrays
function evalWin(){
    for (let i = 0; i < winArr.length; i++){
        if(winArr[i].every(val => gameBoard.arrayX.includes(val))){
            console.log('XXX Winner')
        }
        if(winArr[i].every(val => gameBoard.arrayO.includes(val))){
            console.log(`OOO Winner`)
        }if(gameBoard.arrayX.length > 4 || gameBoard.arrayO.length > 4){
            console.log(`Tie`)
        }
    }
}

