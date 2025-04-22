import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PokemonDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(state?.pokemon || null);

  useEffect(() => {
    if (!pokemon && state?.pokemon?.name) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${state.pokemon.name}`)
        .then(res => res.json())
        .then(data => setPokemon(data));
    }
  }, [state, pokemon]);

  const goBack = () => {
    if (state?.from) {
      navigate(state.from.pathname + state.from.search);
    } else {
      navigate('/');
    }
  };

  if (!pokemon) return <p className="text-center">Cargando...</p>;

  return (
    <div className="container text-center">
      <button onClick={goBack} className="btn btn-secondary my-3">← Ver pokédex</button>
      <h2 className="text-capitalize">{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Altura: {pokemon.height}</p>
      <p>Peso: {pokemon.weight}</p>
      <p>Tipo(s): {pokemon.types.map(t => t.type.name).join(', ')}</p>
    </div>
  );
};

export default PokemonDetail;
