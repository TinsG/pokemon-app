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
    <div className="flex flex-col">
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
        <button onClick={_ => removePokemon(pokemon.data?.data.name)} className="py-2 px-4 w-1/2 bg-yellow-200 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 text-center w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
        <Link to={`/${name}`} className="align-middle py-2 bg-gray-900 flex justify-center w-1/2 text-yellow-200 content-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 text-center w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg></Link>
      </div>
    </div>

  );
};

export default CapturedPokemonCard;
