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
    const shapes = ['x', 'o'];
    const random = () => Math.floor(Math.random()*shapes.length)
    gameboard.fields.forEach(field => field.addEventListener('click', () => {
        if(field.textContent === '') field.textContent = shapes[random()];
        if(field.textContent === shapes[0] || field.textContent === shapes[1]) return
    }))
})();