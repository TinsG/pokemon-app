import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Layout from "../components/Layout";
import PokemonCard from "../components/PokemonCard";

import useFindPokemon from "../hooks/find-pokemon";
import { useMyPokemon } from "../states/localstorage";

const Pokemon: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { pokemon: pokemonName } = useParams();
  const pokemon = useFindPokemon(pokemonName);
  const { addPokemon } = useMyPokemon();


  const [isOpen, setisOpen] = useState(false);
  const [nickName, setnickName] = useState('');

  const goBack = () => navigate('/');

  function handleAddProduct() {
    addPokemon(pokemon, nickName);
    goBack();
  }

  const openCatchForm = () => {
    setisOpen(true);
  }

  const closeCatchForm = () => {
    setisOpen(false);
  }

  if (pokemon.isLoading) {
    return <div>loading</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 md:px-0 h-full">
        {pokemon.data && (
          <div className="mx-auto space-y-6">
            <div className="flex justify-between">
              <button
                className="text-lg rounded-full  hover:py-4 hover:px-4 transition-all py-3 px-3 hover:shadow-lg bg-gray-800 text-yellow-200"
                onClick={goBack}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>

              </button>
              <button
                className="text-lg rounded-full  hover:shadow-lg transform hover:-rotate-180 hover:scale-110 transition duration-500 ease-in-out  text-yellow-200"
                onClick={_ => openCatchForm()}
              >
                <img src="./pokemon.png" alt="pokemon" className="w-12 h-12" />
              </button>

            </div>
            {isOpen ?
              <form onSubmit={handleAddProduct}>
                <div className="w-full md:w-1/3 justify-items-end ">
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nick Name</label>
                    <input type="text" id="text" value={nickName} onChange={(e) => setnickName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Nick Name" required />
                  </div>

                  <button type="submit" disabled={nickName===''} className="text-yellow-200 my-2 md:mx-5 bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                  <button type="button" onClick={_ => closeCatchForm()} className="text-white my-2 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</button>
                </div>
              </form>
              : <></>}

            <PokemonCard name={pokemon.data.data.name} showStats />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Pokemon;
