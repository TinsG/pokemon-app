import InView from "react-intersection-observer";
import { PokemonWithNickName } from "../@types/api";

import { useApp } from "../states/AppState";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import { useMyPokemon } from "../states/localstorage";
import CapturedPokemonCard from "../components/CapturedPokemonCard";

const CatchedPokemons: React.FC<{}> = () => {
  const { pokemons } = useApp();
  const { myPokemons } = useMyPokemon();

  if (pokemons.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <Layout>
      {myPokemons.length === 0 ?
        <>
          <h1 className="text-center text-gray-900 text-4xl font-thin align-middle w-full"> You didn't catch any Pokemon!!</h1>
        </>
        : ''
      }
      <main className="container mx-auto px-6 lg:px-0">
        <div className="grid grid-cols-12 gap-4 ">
          <div className="col-span-12  ">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {myPokemons?.map((pokemon: PokemonWithNickName) => (
                <InView
                  key={pokemon.data.data.name}
                  rootMargin="200px 0px"
                  threshold={0.3}
                  triggerOnce={true}
                >
                  {({ inView, ref }) => {
                    return inView ? (
                      <CapturedPokemonCard name={pokemon.data.data.name} />
                    ) : (
                      <div
                        ref={ref}
                        className="w-full h-72 bg-gray-100 rounded-lg"
                      ></div>
                    );
                  }}
                </InView>
              ))}
            </div>
          </div>
        </div>


      </main>
    </Layout>
  );
};

export default CatchedPokemons;
