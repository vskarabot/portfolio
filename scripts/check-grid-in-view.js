document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    
    const handleScroll = () => {
        const bounds = grid.getBoundingClientRect();

        if (window.innerHeight - bounds.height >= bounds.top) {
            grid.classList.add('grid-in-view');
            window.removeEventListener("scroll", handleScroll);
        }
    };

    window.addEventListener("scroll", handleScroll);

});