document.addEventListener('DOMContentLoaded', () => {

    const time = document.getElementById('time');

    const pad = number => String(number).padStart(2, '0');

    const render = () => {
        const currentTime = new Date();

        const hours = pad(currentTime.getHours());
        const minutes = pad(currentTime.getMinutes());
        const seconds = pad(currentTime.getSeconds());

        time.textContent = `${hours}:${minutes}:${seconds}`;
    };

    render();
    setInterval(render, 1000);

});