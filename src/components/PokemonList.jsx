import { useEffect, useState } from 'react';
import fetchPokemon from '../services/pokeapi';

import PokemonCard from './PokemonCard.jsx';

const PokemonList = () => {
    const [previous, setPrevious] = useState(null);
    const [next, setNext] = useState(null);
    const [pokemon, setPokemon] = useState([]);
    const [error, setError] = useState(null);

    const getData = (url) => {
        setError(null);
        fetchPokemon(url)
        .then(data => {
            setPokemon(data.results);
            setPrevious(data.previous);
            setNext(data.next);
        })
        .catch(err => {
            setPokemon([]);
            setError(err);
        });
    }

    useEffect(() => {
        getData('https://pokeapi.co/api/v2/pokemon?limit=21');
    }, []);

    return (
        <div className="container my-4">
            {error && <p className="text-danger">No se han podido cargar los datos</p>}
            <div className="row">
                {pokemon.map(p => (
                    <div key={p.name} className="col-md-4 mb-4">
                        <PokemonCard pokemonUrl={p.url} />
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={() => previous && getData(previous)} disabled={!previous}>Back</button>
                <button className="btn btn-primary" onClick={() => next && getData(next)} disabled={!next}>Next</button>
            </div>
        </div>
    );
};

export default PokemonList;
