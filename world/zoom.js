const SCALE_LEVEL = 5;

document.addEventListener('DOMContentLoaded', () => {

    const svg = document.querySelector('svg');
    let scale = parseInt(window.getComputedStyle(svg).scale);

    svg.addEventListener('wheel', (e) => {
        svg.style.transformOrigin = `${e.offsetX}px ${e.offsetY}px`;
        if (e.deltaY < 0 && scale == 1) {
            scale = SCALE_LEVEL;
        }
        else if (e.deltaY > 0 && scale == SCALE_LEVEL)
            scale = 1;

        svg.style.transform = `scale(${scale})`;
        
    })

});