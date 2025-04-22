import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PokemonCard = ({ pokemonUrl }) => {
  const location = useLocation();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(pokemonUrl)
      .then(res => res.json())
      .then(data => setDetails(data))
      .catch(err => console.error(err));
  }, [pokemonUrl]);

  if (!details) return null;

  return (
    <Link
      to={`/pokedex/${details.name}`}
      state={{ pokemon: details, from: location }}
      className="text-decoration-none"
    >
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">#{details.id}</h5>
          <img src={details.sprites.front_default} alt={details.name} className="img-fluid" />
          <p className="card-text text-capitalize text-truncate">{details.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
