import { Link } from "react-router-dom";

import useFindPokemon from "../hooks/find-pokemon";
import Loader from "./Loader";

type PokemonCardProps = {
  name: string;
  showStats?: boolean;
  showMyPokemon?: boolean;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ name, showStats }) => {
  const pokemon = useFindPokemon(name);

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
      {!showStats ? (
        <Link
          to={`/${name}`}
          className="group block w-full bg-gray-900 border border-gray-100 rounded-lg p-4 transition transform space-y-8 hover:shadow hover:scale-105"
        >

          <div className="w-full h-48 flex justify-center">
            <img
              className="w-full h-full object-contain"
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
        </Link>
      ) :
        <>
          <div className="grid grid-cols-4 gap-4 h-full py-5 ">
            <div className="col-span-4 md:col-span-1 place-content-center ">
              <div className="w-full h-48 ">
                <img
                  className="w-full h-full object-contain"
                  src={
                    otherSprites?.dream_world.front_default ||
                    otherSprites?.["official-artwork"].front_default
                  }
                  alt={pokemon.data?.data.name}
                />
              </div>
              <div className="font-medium text-center mt-5 capitalize text-xl text-yellow-400 transition group-hover:text-yellow-200">
                {pokemon.data?.data.name}
              </div>
              <div className="flex justify-center">
                {pokemon.data?.data.types.map((type) => {
                  return (
                    <button key={type.slot} className="font-thin  mt-5 bg-gray-50 ml-1 px-2 py-2 inline-flex self-center capitalize text-sm text-gray-700">
                      {type.type.name}

                    </button>
                  );
                })}
              </div>
            </div>
            <div className="col-span-4 md:col-span-3">
              <header className="font-medium text-xl text-gray-800">Stats</header>
              <hr />
              {pokemon.data?.data.stats.map((stat) => {
                return (
                  <div className="flex  items-center space-y-1 my-2">
                    <h1 className="text-gray-500 flex-none w-40 pr-4 basis-1/3">{stat.stat.name}</h1>
                    <div className="w-full bg-gray-300 rounded-full dark:bg-gray-700 grow">
                      <div className="bg-gray-900 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${Math.min(100, stat.base_stat)}%` }}> {`${Math.min(100, stat.base_stat)}%`}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-2 overflow-x-auto">
            <header>Moves</header>
            {pokemon.data?.data.moves.map((move) => {
              return (
                <button className="bg-yellow-100 text-gray-800 font-thin text-sm mr-2 px-2.5 py-0.5 rounded">
                  {move.move.name}
                </button>
              );
            })}

          </div>
        </>
      }
    </>

  );
};

PokemonCard.defaultProps = {
  showStats: false,
};

export default PokemonCard;
