// each country can have multiple teritories, so we need to mark all of it when hovering
// in this file we listen to hovered country, find all of it's teritories and mark it on map
// as is defined in styles.css, it transitions into new color in .2s

document.addEventListener('DOMContentLoaded', () => {

    const countryNameHolder = document.querySelector('.country-name');

    const paths = document.querySelectorAll('path');
    const euMicros = document.querySelectorAll('circle');

    // contains all countries/part of countries (islands etc...)
    const allPaths = [...paths, ...euMicros];

    allPaths.forEach(path => {
        const allCountryTeritories = document.querySelectorAll(`[data-name="${path.dataset.name}"]`);
        
        path.addEventListener('mouseenter', () => {            
            allCountryTeritories.forEach(teritory => {
                teritory.style.fill = 'magenta';
                countryNameHolder.textContent = path.dataset.name;
            })
        })

        path.addEventListener('mouseleave', () => {
            allCountryTeritories.forEach(teritory => {
                teritory.style.fill = 'white';
                countryNameHolder.textContent = '';
            })
        })
    })
    
});