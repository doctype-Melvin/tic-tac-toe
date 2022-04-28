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
        field.textContent = Markers[0]
    }
    else if(field.textContent === '' && tracking[tracking.length-1] === Markers[0]){
        tracking.push(Markers[1]);
        field.textContent = Markers[1]
    }
    else if(field.textContent === '' && tracking[tracking.length-1] === Markers[1]){
        tracking.push(Markers[0]);
        field.textContent = Markers[0]
    } else return
    console.log(tracking)
}))