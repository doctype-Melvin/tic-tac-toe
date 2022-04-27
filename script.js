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

function placeMarker(player){
    gameBoard.grid.forEach(field=>field.addEventListener('click', (e) => {
        e.target.textContent = player;
        if(player === 'x') placeMarker(player2);
        if(player === 'o') placeMarker(player1);
    }))
}

placeMarker(player1)