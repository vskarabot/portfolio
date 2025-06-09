document.addEventListener('DOMContentLoaded', () => {

    const input = document.querySelector('input');
    const percentage = document.querySelector('.percentage');

    const game = document.querySelector('.game');
    game.style.display = 'none';
    const gameStart = document.querySelector('.game-start');
    const button = document.querySelector('button');

    button.addEventListener('click', () => {
        gameStart.style.display = 'none';
        game.style.display = 'flex';
        input.focus();
    });
})