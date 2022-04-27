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

gameBoard.grid.forEach(field=>field.addEventListener('click', (e) => {
        if(e.target.textContent !== '') return
        if(e.target.textContent === '') e.target.textContent = player1;
        gameBoard.array.push(player1)
}))
