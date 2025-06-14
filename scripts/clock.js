document.addEventListener('DOMContentLoaded', () => {

    const clock = document.querySelector('.clock');
    const numbers = document.querySelectorAll('.clock-number');

    let angle = 0;
    const angleStep = 30 * Math.PI / 180;

    const offset = clock.offsetHeight / 2;

    for (const cnumber of numbers) {

        const top = (offset - 16) * Math.cos(angle);
        const left = (offset - 16) * Math.sin(angle);
        cnumber.style.top = `${offset + top}px`;
        cnumber.style.left = `${offset + left}px`;

        angle = angle - angleStep;
    }

});