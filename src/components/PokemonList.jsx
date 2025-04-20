import { useEffect, useState } from 'react';
import fetchPokemon from '../services/pokeapi';

const PokemonList = () => {
    const [previous, setPrevious] = useState(null);
    const [next, setNext] = useState(null);
    const [pokemon, setPokemon] = useState([]);

    const getData = (url) => {
        fetchPokemon(url).then(data => {
            setPokemon(data.results);
            setPrevious(data.previous);
            setNext(data.next);
        });
    }

    useEffect(() => {
        getData('https://pokeapi.co/api/v2/pokemon');
    }, []);

    return (
        <div>
            <ul>
                {pokemon.map(p => (
                <li key={p.name}>{p.name}</li>
                ))}
            </ul>
            <div>
                <button onClick={() => previous && getData(previous)} disabled={!previous}>Back</button>
                <button onClick={() => next && getData(next)} disabled={!next}>Next</button>
            </div>
        </div>
    );
};

export default PokemonList;
