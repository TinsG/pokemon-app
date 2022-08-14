import { Link } from "react-router-dom";

import useFindPokemon from "../hooks/find-pokemon";
import { useMyPokemon } from "../states/localstorage";
import Loader from "./Loader";

type PokemonCardProps = {
  name: string;
};

const CapturedPokemonCard: React.FC<PokemonCardProps> = ({ name }) => {
  const pokemon = useFindPokemon(name);
  const { removePokemon } = useMyPokemon();

  if (pokemon.isLoading) {
    return (
      <div className="w-full h-96 bg-gray-50 border border-gray-100 rounded-lg p-4 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const otherSprites = pokemon.data?.data.sprites.other;

  return (
    <>
      <div className="group block w-full bg-gray-900 border border-gray-100  p-4 transition transform space-y-8 shadow-lg ">

        <div className="w-full h-48 flex justify-center">
          <img className="w-full h-full object-contain"
            src={
              otherSprites?.dream_world.front_default ||
              otherSprites?.["official-artwork"].front_default
            }
            alt={pokemon.data?.data.name}
          />
        </div>
        <div className="font-medium capitalize text-xl text-yellow-400 transition group-hover:text-yellow-200">
          {pokemon.data?.data.name}
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={_ => removePokemon(pokemon.data?.data.name)} className="py-2 px-4 w-1/2 bg-red-500 text-center">Remove</button>
        <Link to={`/${name}`} className="py-2 px-4 w-1/2 bg-gray-800 text-yellow-300">View</Link>
      </div>
    </>

  );
};

export default CapturedPokemonCard;
