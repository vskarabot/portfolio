document.addEventListener('DOMContentLoaded', () => {

    const aboutMe = document.querySelector('.grid');

    const options = {
        root: null,
        threshold: 0,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            console.log("observing")
            if (!entry.isIntersecting)
                return;

            entry.target.classList.add("grid-intersecting");
            observer.unobserve(aboutMe);
        })
    }, options);

    observer.observe(aboutMe);

});