import { getPokemon, typeColors } from "./constants.js";

/* footer year */
const actualYear = new Date().getFullYear();
const copyright = document.querySelector('#copyright')
copyright.textContent = `Ⓒ ${actualYear} - Francisco Maduro`

const formSearchPoke = document.querySelector('#searchPoke');
const historyContainer = document.querySelector('#history');
let pokeHistory = [];

//contenedores
const pokemonName = document.querySelector('#namePoke');
const pokemonImg = document.querySelector('#imgPoke');
const pokemonId = document.querySelector('#idPoke');
const pokemonHeight = document.querySelector('#heightPoke');
const pokemonWeight = document.querySelector('#weightPoke');
const pokemonType = document.querySelector('#typePoke');
const pokemonStats = document.querySelector('#statsPoke');
const errorMessage = document.querySelector('#error');


const showHistory = () => {
    if (localStorage.length > 0) {
        historyContainer.innerHTML = '';
        let historyPoke = JSON.parse(localStorage.getItem('history')).slice(-4);
        if (!document.querySelector('#recents')) {
            let recents = document.createElement('p');
            recents.setAttribute('id', 'recents');
            let recentsText = document.createTextNode('Recientes');
            recents.append(recentsText);
            historyContainer.appendChild(recents);
        }
        historyPoke.forEach(pokemon => {
            let pokeSearch = document.createElement('span');
            let pokeSearchText = document.createTextNode(` ${pokemon} `);
            pokeSearch.appendChild(pokeSearchText);
            historyContainer.appendChild(pokeSearch);
        })
    }
}

showHistory();

//buscar pokemon
const searchPokemon = e => {
    e.preventDefault();
    const { value } = e.target.pokemon;
    fetch(getPokemon(value.toLowerCase()))
        .then(data => data.json())
        .then(response => renderPokeData(response))
        .catch(error => renderErrorMessage(error))

    showHistory();
}

const cleanPokemon = () => {
    pokemonName.textContent = "";
    pokemonImg.setAttribute('src', "./assets/img/pngwing.com.png");
    pokemonId.textContent = "";
    pokemonImg.style.background = 'transparent';
    pokemonHeight.textContent = '';
    pokemonWeight.textContent = '';
    pokemonType.innerHTML = '';
    pokemonStats.innerHTML = '';
}

const renderErrorMessage = () => {
    if (document.querySelector('#error-msg')) return;
    cleanPokemon();
    const message = document.createTextNode("No encontre lo que estabas buscando");
    const messageElement = document.createElement('div');
    messageElement.setAttribute('id', 'error-msg');
    messageElement.appendChild(message);
    errorMessage.appendChild(messageElement);
}

const renderPokeData = pokemon => {
    if (document.querySelector('#error-msg')) {
        document.querySelector('#error-msg').remove();
    }

    const sprite = pokemon.sprites.front_default;
    const { stats, types } = pokemon;

    pokemonName.textContent = pokemon.name.toUpperCase();
    pokemonImg.setAttribute('src', sprite);
    pokemonId.textContent = `PokeId: ${pokemon.id}`;
    pokemonHeight.textContent = `Height: ${pokemon.height}`;
    pokemonWeight.textContent = `Weight: ${pokemon.weight}`;
    setTypeColor(types);
    setPokemonTypes(types);
    setPokemonStats(stats);

    pokeHistory.push(pokemon.name)
    localStorage.setItem('history', JSON.stringify(pokeHistory))
}

const setTypeColor = types => {
    const typeColorOne = typeColors[types[0].type.name];
    const typeColorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;

    pokemonImg.style.background = `radial-gradient(${typeColorTwo} 33%, ${typeColorOne} 33%)`;
    pokemonImg.style.backgroundSize = '8px 5px';
}

const setPokemonTypes = types => {
    pokemonType.innerHTML = '';

    types.forEach(type => {
        const typeTextElement = document.createElement('div');
        typeTextElement.setAttribute('class', 'typePokemon')
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokemonType.appendChild(typeTextElement);
    })
}

const setPokemonStats = stats => {
    pokemonStats.innerHTML = "";

    stats.forEach(stat => {
        const statElement = document.createElement('div');
        const statName = document.createElement('p');
        const statAmmount = document.createElement('p');
        statName.textContent = `${stat.stat.name}  `;
        statAmmount.textContent = stat.base_stat;
        statElement.appendChild(statName);
        statElement.appendChild(statAmmount);
        pokemonStats.appendChild(statElement);
    })
}


formSearchPoke.addEventListener('submit', searchPokemon);
