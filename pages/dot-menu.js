document.addEventListener('DOMContentLoaded', () => {
    const projectList = document.querySelectorAll('article:not(#about)');
    const dotMenu = document.getElementById('dot-menu');

    console.log(dotMenu)

    for (let i = 1; i <= projectList.length; i++) {
        const circle = document.createElement('a');

        circle.href = `#project-${i}`;
        circle.title = `#project-${i}`;

        circle.className = 'circle';
        dotMenu.appendChild(circle);

        if (i !== projectList.length) {
            const line = document.createElement('div');
            line.className = 'line';
            dotMenu.appendChild(line);
        }
    }

    // get only dots
    const dots = Array.from(dotMenu.getElementsByTagName('A'));

    // add listeners to dots to change color
    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            dots.forEach(d => d.classList.remove('circle-active'));
            
            if (!dot.classList.contains('home-menu')) {
                dot.classList.add('circle-active');
            }
        });
    });

    // when scrolling we also want to change dots
    document.addEventListener('scroll', () => {
        // all article heights are the same as i use 100vh for each so we can extract the height only once
        const {height} = projectList[0].getBoundingClientRect();

        Array.from(projectList).forEach((project, i) => {
            const {top} = project.getBoundingClientRect();

            // abs -> if its 1/3 above or below -> then active
            if (Math.abs(top) <= height/3 && !dots[i].classList.contains('home-menu')) {
                dots[i].classList.add('circle-active');
                dots.forEach((dot, curr) => {
                    if (i !== curr) {
                        dot.classList.remove('circle-active');
                    }
                });
            }
        });
    });
});