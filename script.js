const gameboard = (() => {
    'use strict'
    let array = [];
    const fields = [...document.querySelectorAll('.field')];
    fields.forEach(field => field.addEventListener('click',
    (e) => array.push(parseInt(e.target.dataset.field))));
    return {
        array: array,
        fields: fields
    }
})();

const drawShape = (() => {
    'use strict'
    const marker = ['x', 'o'];
    const array = [];
    const random = () => Math.floor(Math.random()*marker.length)
    gameboard.fields.forEach(field => field.addEventListener('click', () => {
        let choice = () => marker[random()];
        if(field.textContent === '') field.textContent = choice()
        if(field.textContent === marker[0] || field.textContent === marker[1]) return
    }));
    return {
        array: array
    }
})();

const gameProcess = (() => {
    'use strict';
    return {
            field: gameboard.array,
            marker: drawShape.array
        }
})();