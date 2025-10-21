document.addEventListener('DOMContentLoaded', () => {
    const userAgent = navigator.userAgent;
    const isFirefox = /Firefox/.test(userAgent);

    if (isFirefox) {
        document.getElementById('browser-warning').style.display = 'block';
    }
});