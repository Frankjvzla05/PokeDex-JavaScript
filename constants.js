const search_pokemon = "https://pokeapi.co/api/v2/pokemon/";

export const getPokemon = query => `${search_pokemon}${query}`

export const typeColors = {
    electric: '#ffea70',
    normal: '#b09398',
    fire: '#ff675c',
    water: '#0596c7',
    ice: '#afeafd',
    rock: '#999799',
    flying: '#7ae7c7',
    grass: '#4a9681',
    psychic: '#ffc6d9',
    ghost: '#ffc6d9',
    bug: '#a2faa3',
    poison: '#795663',
    ground: '#d2b074',
    dragon: '#da627d',
    steel: '1d8a99',
    fighting: '#2f2f2f',
    default: '#2a1a1f'
}