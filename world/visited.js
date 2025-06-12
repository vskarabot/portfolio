
const visited = ['Croatia', 'Slovenia', 'Italy', 'Austria', 'Hungary', 'Estonia', 'Greece'];


// TODO: right now when in game if user goues with mouse over country that he guessed it gets decolorized...
// GAME DOESNT END WHEN ALL COUNTRIES FOUND
document.addEventListener('DOMContentLoaded', () => {

    // first we need to find and join all of the countries teritories
    // all countries -> path
    // euro microstates -> circle
    const mergeAllTeritoriesInCountries = () => {
        const teritories = document.querySelectorAll('path, circle');
        
        const countries = {};
        teritories.forEach(teritory => {
            if (!countries[teritory.dataset.name])
                countries[teritory.dataset.name] = [];    
            
            countries[teritory.dataset.name].push(teritory);
        });

        return countries;
    }


    // countries as an object with teritories -> we can easily access each country, to display it
    const countries = mergeAllTeritoriesInCountries();

    const displayCountry = (name, color) => {
        countries[name].forEach(teritory => {
            teritory.style.fill = color;
        });
    }

    // color all visited countries at the start
    visited.forEach(country => displayCountry(country, 'magenta'));

    // display country name on hover
    const paths = document.querySelectorAll('path');
    const cName = document.querySelector('.country-name');
    
    paths.forEach(path => {
        path.addEventListener('mouseenter', () => {
            displayCountry(path.dataset.name, '#c0c0c0');
            cName.textContent = path.dataset.name;
        });
        path.addEventListener('mouseleave', () => {
            displayCountry(path.dataset.name, 'white');
            cName.textContent = '';
        });
    })

    /* GAME */

    // enough for basic game to work but we'll need to map "wrongly spelled countries"
    const startGameButton = document.getElementById('start');
    const input = document.getElementById('cInput');
    const time = document.querySelector('.time');
    const gameInfo = document.querySelector('.info');
    const gameProgress = document.querySelector('.progress');
    const recap = document.querySelector('.recap');
    const closeRecap = document.getElementById('exit');
    const resultNum = document.querySelector('.resultNum');
    const resultPer = document.querySelector('.resultPer');

    let guessed = [];
    
    let timeElapsed = 0;
    let interval = null;

    const countryGuessed = () => {
        if (countries[input.value] && !guessed.includes(input.value)) {
            guessed.push(input.value);
            gameProgress.textContent = `${guessed.length} / ${Object.keys(countries).length}`;

            displayCountry(input.value, 'lime');

            input.value = '';
        }
    }

    // check if valid country on each key press
    input.addEventListener('keyup', countryGuessed);

    
    const addTime = () => {
        timeElapsed++;
    }

    const gameInit = () => {
        input.style.display = 'flex';
        startGameButton.style.display = 'block';
        startGameButton.textContent = 'Give Up';
        gameInfo.style.display = 'none';
        gameProgress.style.display = 'block';
        recap.style.display = 'none';
        cName.style.display = 'none';

        visited.forEach(country => displayCountry(country, 'white'));

        gameProgress.textContent = `0 / ${Object.keys(countries).length}`;

        interval = setInterval(addTime, 1000);
    }

    const quitGame = () => {
        input.style.display = 'none';
        startGameButton.style.display = 'none';
        gameProgress.style.display = 'none';
        recap.style.display = 'flex';
        resultNum.textContent = guessed.length;

        time.textContent = `${timeElapsed}s`;
        timeElapsed = 0;
        resultPer.textContent = `${(guessed.length / Object.keys(countries).length * 100).toFixed(2)} %`;
        clearInterval(interval);
    }

    // with the click on close the game at the end -> reset everything
    closeRecap.addEventListener('click', () => {
        recap.style.display = 'none';
        gameInfo.style.display = 'block';
        startGameButton.style.display = 'block';
        startGameButton.dataset.status = '0';
        startGameButton.textContent = 'Play';
        cName.style.display = 'block';

        guessed.forEach(guess => displayCountry(guess, 'white'));
        visited.forEach(country => displayCountry(country, 'magenta'));

        guessed = [];
        input.value = '';
    });


    startGameButton.addEventListener('click', () => {
        
        if (startGameButton.dataset.status === "0") {
            startGameButton.dataset.status = "1";
            gameInit();
        }
        else if (startGameButton.dataset.status === "1") {
            startGameButton.dataset.status = "0";
            quitGame();
        }

    });
})