import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import fetchPokemon from '../services/pokeapi';
import PokemonCard from './PokemonCard.jsx';

const PokemonList = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
        const query = new URL(url).search;
        navigate({ pathname: '/pokedex', search: query }, { replace: true }); // Actualiza la URL sin recargar
      })
      .catch(err => {
        setPokemon([]);
        setError(err);
      });
  };

  useEffect(() => {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
    const url = `${baseUrl}${location.search || '?limit=21'}`;
    getData(url);
  }, []);

  return (
    <div className="container my-1">
      <div className="d-flex justify-content-center gap-3 mb-1">
        <button className="btn btn-primary" onClick={() => previous && getData(previous)} disabled={!previous}>Back</button>
        <button className="btn btn-primary" onClick={() => next && getData(next)} disabled={!next}>Next</button>
      </div>
      {error && <p className="text-danger">No se han podido cargar los datos</p>}
      <div className="row g-1">
        {pokemon.map(p => (
          <div key={p.name} className="col-4 my-1">
            <PokemonCard pokemonUrl={p.url} from={location} />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-primary" onClick={() => previous && getData(previous)} disabled={!previous}>Back</button>
        <button className="btn btn-primary" onClick={() => next && getData(next)} disabled={!next}>Next</button>
      </div>
    </div>
  );
};

export default PokemonList;
