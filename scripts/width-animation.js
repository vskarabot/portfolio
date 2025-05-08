document.addEventListener('DOMContentLoaded', () => {

    const zoomContainer = document.getElementById('about');

    document.addEventListener('scroll', () => {

        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const threshold = -rem;
        
        const rect = zoomContainer.getBoundingClientRect();
        const height = rect.height;
        const fromTop = rect.top;

        let scale = 1;
        let radius = 0;

        if (fromTop < threshold) {
            const progress = Math.abs(fromTop / height);
            console.log(progress)

            scale = Math.max(0.8, 1 - progress);
            radius = Math.min(30, progress * 30);
        }


        zoomContainer.style.transform = `scale(${scale})`;
        zoomContainer.style.transition = 'transform 0.2s ease-out';

        zoomContainer.style.borderBottomLeftRadius = `${radius}px`;
        zoomContainer.style.borderBottomRightRadius = `${radius}px`;


    });

});