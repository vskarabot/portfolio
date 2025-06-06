document.addEventListener('DOMContentLoaded', () => {

    const circles = document.querySelectorAll('.color-circle');
    
    circles.forEach(circle => {
        circle.addEventListener('click', () => {
            const selectedColor = circle.getAttribute('color-code');
            document.documentElement.style.setProperty('--theme-color', selectedColor);
        });
    });
});