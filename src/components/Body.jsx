import { Routes, Route } from "react-router-dom";
import PokemonList from "./PokemonList";
import PokemonDetail from "./PokemonDetail";

const Body = () => {
    return (
        <Routes>
            <Route path="/pokedex/" element={<PokemonList />} />
            <Route path="/pokedex/:nombre" element={<PokemonDetail />} />
        </Routes>
    );
}

export default Body;