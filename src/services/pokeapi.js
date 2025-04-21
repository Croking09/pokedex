const fetchPokemon = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Network error or resource not in cache');
    }

    return await response.json();
};

export default fetchPokemon;
