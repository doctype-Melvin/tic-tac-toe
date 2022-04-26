const gameboard = (() => {
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
    let fieldText = gameboard.fields.textContent;
    const shapes = ['x', 'o'];
    gameboard.fields.forEach(field => field.addEventListener('click', () => {
        if(field.textContent === '') field.textContent = shapes[0];
        if(field.textContent === shapes[0] || field.textContent === shapes[1]) return
    }))
})();