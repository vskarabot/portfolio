document.addEventListener('DOMContentLoaded', () => {

    const pageEnd = document.querySelector('.page-end');
    const white = document.querySelector('.white');
    const purple = document.querySelector('.purple');

    const observe = (entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                white.classList.add('show-logo', 'animate');
                purple.classList.add('show-logo', 'animate');
            }
            else {
                white.classList.remove('show-logo', 'animate');
                purple.classList.remove('show-logo', 'animate');
            }

        })
    };
    
    const observer = new IntersectionObserver(observe, {});
    observer.observe(pageEnd);

});