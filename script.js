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

const Marker = (string) => {
    const marker = string;
    return {
        marker
    }
}