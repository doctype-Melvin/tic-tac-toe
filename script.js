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

//Gameboard array
let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

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
    //AI marker logic (simple)
    const aiMarker = () => {
        let field = Math.floor(Math.random()*9);
        if(gameBoard.grid[field].textContent === '' && winner.length === 0){
        gameBoard.grid[field].textContent = Markers[1];
        tracking.push(Markers[1]);
        gameBoard.arrayO.push(parseInt(gameBoard.grid[field].dataset.field))
        }
        else if(gameBoard.grid[field].textContent !== '' && gameBoard.array.length >= 9) return
            else if(gameBoard.grid[field].textContent !== ''){
                aiMarker()
            }
        evalWin()
    }
    
    return {
        placeMark,
        placeX,
        aiMarker
    } //Return fn to public
})();

//Play Module -- Makes grid interactive -- Clears grid -- Adds restart button
const playMod = (()=> {
    let player1 = document.querySelector('.player');
    let player2 = document.querySelector('.roboto')

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
const gameMode = document.createElement('div');
display.append(gameMode)
gameMode.classList.add('gameMode');
    let vsHuman = document.createElement('button');
    vsHuman.textContent = 'Human vs Human';
    vsHuman.classList.add('btn');
    gameMode.append(vsHuman);
    let vsPlayer = () => {
        gameBoard.grid.forEach(field => field.removeEventListener('click', markerMod.placeX));
        gameBoard.grid.forEach(field => field.addEventListener('click', markerMod.placeMark));
        player1.textContent = `X = Player 1`;
        player2.textContent = `O = Player 2`;
        changeNames.setName()
        clear()
    }
    vsHuman.addEventListener('click', vsPlayer);
        
        let vsRoboto = document.createElement('button');
        vsRoboto.textContent = `Human vs Roboto`;
        vsRoboto.classList.add('btn');
        gameMode.append(vsRoboto);
        let vsCpu = () => {
            gameBoard.grid.forEach(field => field.removeEventListener('click', markerMod.placeMark));
            gameBoard.grid.forEach(field => field.addEventListener('click', markerMod.placeX));
            player1.textContent = `X = Human`;
            player2.textContent = `O = Roboto`;
            changeNames.removeSetName();
            
            clear()
        };
        vsRoboto.addEventListener('click', vsCpu);
        
        game()
        return{
            player1,
            player2
        }
 })();

//Evaluates game outcome
function evalWin(){
    for (let i = 0; i < winArr.length; i++){
        if(winArr[i].every(val => gameBoard.arrayX.includes(val))){
            winner.push('x');
            if(playMod.player1.textContent === 'X = Player 1') gameWinner.winner('Player 1');
            else if(playMod.player1.textContent === 'X = Human') gameWinner.winner('Human');
            else if(playMod.player1.textContent !== 'X = Player 1' &&
            playMod.player1.textContent !== 'X = Human') gameWinner.winner(playMod.player1.textContent)
        }
        if(winArr[i].every(val => gameBoard.arrayO.includes(val))){
            winner.push('o');
            if(playMod.player2.textContent === 'O = Player 2') gameWinner.winner('Player 2');
            else if(playMod.player2.textContent === 'O = Roboto') gameWinner.winner('Roboto');
            else if(playMod.player2.textContent !== 'O = Player 2' &&
            playMod.player2.textContent !== 'O = Roboto') gameWinner.winner(playMod.player2.textContent)
        }
       else if(winner[0] === undefined && gameBoard.array.length >= 9) {
            console.log(`TIE`);
            gameWinner.tie();
        }
    }
    if(gameBoard.array.length >= 9 || winner.length !== 0) {
    gameBoard.grid.forEach(field=>field.removeEventListener('click', markerMod.placeMark));
    gameBoard.grid.forEach(field=>field.removeEventListener('click', markerMod.placeX));
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
            text.textContent = `Game is tied! Play again?`;
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

const changeNames = (() => {
    const nameParent = document.querySelector('.messages')
    const player1 = playMod.player1;
    const player2 = playMod.player2;
    const replaceElem = (e) => {
        let name = document.createElement('input');
        name.classList.add('name')
        nameParent.replaceChild(name, e.target);

        name.addEventListener('focusout', () => {
            nameParent.replaceChild(e.target, name)
        })
        name.addEventListener('change', () => {
        e.target.textContent = name.value;
        nameParent.replaceChild(e.target, name);
        })
    }
    const setName = () => {
    player1.addEventListener('click', replaceElem);
    player2.addEventListener('click', replaceElem);
};

    const removeSetName = () => {
        player1.removeEventListener('click', replaceElem);
        player2.removeEventListener('click', replaceElem);
    }
    return {
        setName,
        removeSetName
    }

})();
changeNames.setName()