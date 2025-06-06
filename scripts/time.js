document.addEventListener('DOMContentLoaded', () => {

    const time = document.getElementById('time');

    setInterval(() => {
        const currentTime = new Date();

        const offsetInHours = currentTime.getTimezoneOffset() / 60;
        
        const hours = currentTime.toISOString().substring(11, 13);
        const minutes = currentTime.toISOString().substring(14, 16);
        const seconds = currentTime.toISOString().substring(17, 19);

        time.textContent = (hours - offsetInHours).toString().concat(":", minutes, ":", seconds);
    }, 1000);

});