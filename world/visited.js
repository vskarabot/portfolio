
const VISITED = ['Croatia', 'Slovenia', 'Italy', 'Austria', 'Hungary', 'Estonia', 'Greece'];
const VISITED_COLOR = 'magenta';
const HOVER_COLOR = '#c0c0c0';
const GUESSED_COLOR = 'lime';

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

    const normalize = (name) => name
        .normalize('NFD')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');

    const ALIASES = {
        'United States': ['USA', 'US', 'United States of America', 'America'],
        'United Kingdom': ['UK', 'Great Britain', 'Britain', 'England', 'GB'],
        'Russian Federation': ['Russia'],
        'Republic of Korea': ['South Korea', 'Korea South', 'Korea'],
        'DR Korea': ['North Korea', 'Korea North', 'DPRK'],
        'Lao PDR': ['Laos', 'Lao'],
        'Myanmar': ['Burma'],
        'Czech Republic': ['Czechia', 'Czech'],
        'Swaziland': ['Eswatini'],
        'Macedonia': ['North Macedonia'],
        'Ivory Coast': ['Cote d Ivoire', 'Côte d Ivoire'],
        'Democratic Republic of the Congo': ['DRC', 'DR Congo', 'Congo Kinshasa', 'Zaire', 'Congo Democratic Republic'],
        'Republic of Congo': ['Congo', 'Congo Brazzaville', 'Congo Republic'],
        'Timor-Leste': ['East Timor', 'Timor'],
        'The Gambia': ['Gambia'],
        'Cape Verde': ['Cabo Verde'],
        'United Arab Emirates': ['UAE', 'Emirates'],
        'Federated States of Micronesia': ['Micronesia'],
        'São Tomé and Principe': ['Sao Tome', 'Sao Tome and Principe'],
        'Vatican City': ['Vatican', 'Holy See'],
        'Brunei Darussalam': ['Brunei'],
        'Central African Republic': ['CAR'],
        'Bosnia and Herzegovina': ['Bosnia', 'Bosnia Herzegovina', 'BiH'],
        'Netherlands': ['Holland', 'The Netherlands'],
        'Ireland': ['Republic of Ireland', 'Eire'],
        'Saint Lucia': ['St Lucia'],
        'Saint Kitts and Nevis': ['St Kitts and Nevis', 'St Kitts'],
        'Saint Vincent and the Grenadines': ['St Vincent and the Grenadines', 'St Vincent', 'Saint Vincent'],
        'Trinidad and Tobago': ['Trinidad', 'Tobago'],
        'Antigua and Barbuda': ['Antigua', 'Barbuda'],
        'Papua New Guinea': ['PNG'],
        'Palestine': ['Palestinian Territories', 'State of Palestine'],
        'Turkey': ['Türkiye', 'Turkiye'],
        'Dominican Republic': ['Dominican Rep'],
        'South Africa': ['RSA'],
        'New Zealand': ['NZ'],
        'Vietnam': ['Viet Nam'],
        'Syria': ['Syrian Arab Republic'],
        'Iran': ['Islamic Republic of Iran', 'Persia'],
        'Bolivia': ['Plurinational State of Bolivia'],
        'Venezuela': ['Bolivarian Republic of Venezuela'],
        'Tanzania': ['United Republic of Tanzania'],
        'Moldova': ['Republic of Moldova'],
        'Bahamas': ['The Bahamas'],
        'Marshall Islands': ['The Marshall Islands'],
        'Solomon Islands': ['The Solomon Islands'],
        'Philippines': ['The Philippines'],
        'Western Sahara': ['Sahrawi Republic'],
        'Kosovo': ['Republic of Kosovo'],
    };

    const buildLookup = () => {
        const lookup = {};

        const register = (key, canonical) => {
            const normalized = normalize(key);
            if (normalized && !lookup[normalized])
                lookup[normalized] = canonical;
        };

        const variants = (name) => [
            name,
            name.replace(/\b(and|the|of)\b/gi, ''),
        ];

        Object.keys(countries).forEach(name => {
            variants(name).forEach(variant => register(variant, name));
        });

        Object.entries(ALIASES).forEach(([canonical, aliases]) => {
            if (!countries[canonical]) return;
            aliases.forEach(alias => variants(alias).forEach(variant => register(variant, canonical)));
        });

        return lookup;
    };

    const lookup = buildLookup();

    const displayCountry = (name, color) => {
        countries[name].forEach(teritory => {
            teritory.style.fill = color;
        });
    }

    // color all visited countries at the start
    VISITED.forEach(country => displayCountry(country, VISITED_COLOR));

    // display country name on hover
    const paths = document.querySelectorAll('path, circle');
    const cName = document.querySelector('.country-name');
    
    paths.forEach(path => {
        path.addEventListener('mouseenter', () => {
            if (path.style.fill !== VISITED_COLOR && path.style.fill !== GUESSED_COLOR)
                displayCountry(path.dataset.name, HOVER_COLOR);
            cName.textContent = path.dataset.name;
        });
        path.addEventListener('mouseleave', () => {
            if (path.style.fill !== VISITED_COLOR && path.style.fill !== GUESSED_COLOR)
                displayCountry(path.dataset.name, 'white');
            cName.textContent = '';
        });
    })

    /* GAME */

    // enough for basic game to work but we'll need to map "wrongly spelled countries"
    const startGameButton = document.getElementById('start');
    const input = document.getElementById('cInput');
    const time = document.querySelector('.time');
    const gameProgress = document.querySelector('.progress');
    const recap = document.querySelector('.recap');
    const closeRecap = document.getElementById('exit');
    const resultNum = document.querySelector('.resultNum');
    const resultPer = document.querySelector('.resultPer');

    let guessed = [];
    
    let timeElapsed = 0;
    let interval = null;

    const countryGuessed = () => {
        const match = lookup[normalize(input.value)];

        if (match && !guessed.includes(match)) {
            guessed.push(match);
            gameProgress.textContent = `${guessed.length} / ${Object.keys(countries).length}`;

            displayCountry(match, GUESSED_COLOR);

            input.value = '';

            if (guessed.length === Object.keys(countries).length)
                quitGame();
        }
    }

    // check if valid country on each key press
    input.addEventListener('keyup', countryGuessed);

    
    const addTime = () => {
        timeElapsed++;
    }

    const gameInit = () => {
        startGameButton.dataset.status = "1";

        input.style.display = 'flex';
        input.focus();

        startGameButton.style.display = 'block';
        startGameButton.textContent = 'Give Up';
        gameProgress.style.display = 'block';
        recap.style.display = 'none';
        cName.style.display = 'none';

        VISITED.forEach(country => displayCountry(country, 'white'));

        gameProgress.textContent = `0 / ${Object.keys(countries).length}`;

        interval = setInterval(addTime, 1000);
    }

    const quitGame = () => {
        startGameButton.dataset.status = "0";

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
        startGameButton.style.display = 'block';
        startGameButton.dataset.status = '0';
        startGameButton.textContent = 'Play';
        cName.style.display = 'block';

        guessed.forEach(guess => displayCountry(guess, 'white'));
        VISITED.forEach(country => displayCountry(country, VISITED_COLOR));

        guessed = [];
        input.value = '';
    });


    startGameButton.addEventListener('click', () => {
        
        if (startGameButton.dataset.status === "0") {
            gameInit();
        }
        else if (startGameButton.dataset.status === "1") {
            quitGame();
        }

    });
})