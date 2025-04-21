import { useEffect, useState } from 'react';

const PokemonCard = ({ pokemonUrl }) => {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        fetch(pokemonUrl)
            .then(res => res.json())
            .then(data => setDetails(data))
            .catch(err => console.error(err));
    }, [pokemonUrl]);

    if (!details) return null;

    return (
        <div>
            <p>#{details.id}</p>
            <img src={details.sprites.front_default} alt={`Sprite de ${details.name}`} />
            <p>{details.name}</p>
        </div>
    );
};

export default PokemonCard;
