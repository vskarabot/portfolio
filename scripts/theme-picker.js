const THEME_STORAGE_KEY = 'theme-color';

const readStoredTheme = () => {
    try {
        return localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
        return null;
    }
};

const storeTheme = color => {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, color);
    } catch {}
};

const applyTheme = color => {
    document.documentElement.style.setProperty('--theme-color', color);
};

const storedTheme = readStoredTheme();
if (storedTheme) applyTheme(storedTheme);

document.addEventListener('DOMContentLoaded', () => {

    const circles = document.querySelectorAll('.color-circle');

    const markSelected = color => {
        circles.forEach(circle => {
            circle.classList.toggle('selected', circle.getAttribute('color-code') === color);
        });
    };

    if (storedTheme) markSelected(storedTheme);

    circles.forEach(circle => {
        circle.addEventListener('click', () => {
            const selectedColor = circle.getAttribute('color-code');

            applyTheme(selectedColor);
            storeTheme(selectedColor);
            markSelected(selectedColor);
        });
    });
});
