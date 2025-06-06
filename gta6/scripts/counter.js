document.addEventListener('DOMContentLoaded', () => {

    const countdown = document.getElementById('countdown');

    const getDifferences = () => {
        const release = new Date('2026-5-26');
        const today = new Date();
        
        let diff = (release - today) / 1000;

        if (diff <= 0) {
            clearInterval(interval, 1000);
            countdown.style.fontSize = '2rem';
            countdown.textContent = "Now wait for YouTube streams"
        }
        
        else {
            const days = Math.floor(diff / (3600 * 24));
        
            diff = diff % (60 * 60 * 24);
            
            const hours = Math.floor(diff / (3600));

            diff = diff % 3600;

            const minutes = Math.floor(diff / 60);

            diff = diff % 60;

            countdown.textContent = days.toString().concat(" - ", hours, " - ", minutes, " - ", Math.floor(diff));
        }
    };

    const interval = setInterval(getDifferences, 1000);

});