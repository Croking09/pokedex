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
        <div className="card text-center">
            <div className="card-body">
                <h5 className="card-title">#{details.id} {details.name}</h5>
                <img src={details.sprites.front_default} alt={details.name} className="img-fluid" />
            </div>
        </div>
    );
};

export default PokemonCard;
