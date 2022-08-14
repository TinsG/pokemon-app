import InView from "react-intersection-observer";
import { PokemonsResponseResult, PokemonWithNickName } from "../@types/api";

import { useApp } from "../states/AppState";
import PokemonCard from "../components/PokemonCard";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import { useMyPokemon } from "../states/localstorage";
import { Link } from "react-router-dom";

const Home: React.FC<{}> = () => {
  const { pokemons, filteredPokemons } = useApp();
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
      <main className="container mx-auto px-6 lg:px-0">
        <div className="grid grid-cols-12 gap-4 ">
          <div className="col-span-12 sm:col-span-8 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredPokemons?.map((pokemon: PokemonsResponseResult) => (
                <InView
                  key={pokemon.name}
                  rootMargin="200px 0px"
                  threshold={0.3}
                  triggerOnce={true}
                >
                  {({ inView, ref }) => {
                    return inView ? (
                      <PokemonCard name={pokemon.name} />
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
          <div className="col-span-12 sm:col-span-4">
            <div className="h-auto w-full shadow-lg bg-gray-50 rounded-md p-6 border-2">
              <h1 className="font-bold text-gray-800 pb-4 text-lg">Catched Pokemons</h1>
              <hr />
              {myPokemons.length===0?<h1 className="my-8 text-gray-700 font-thin"> you didn't catch Pokmenon</h1>:''}
              {myPokemons?.map((p: PokemonWithNickName) => (
                <InView
                  key={p.data.data.name}
                  rootMargin="200px 0px"
                  threshold={0.3}
                  triggerOnce={true}
                >
                  {({ inView, ref }) => {
                    return inView ? (
                      <Link
                        to={`/${p.data.data.name}`}
                      >
                        <div className="max-w-md my-2 mx-auto hover:scale-100 overflow-hidden md:max-w-2xl">
                          <div className="md:flex">
                            <div className="md:shrink-0">
                              <img className="h-36 md:h-full md:w-24" src={`${p.data.data.sprites.other?.dream_world.front_default ||
                                p.data.data.sprites.other?.["official-artwork"].front_default}`} alt="Man looking at item at a store" />
                            </div>
                            <div className="p-8">
                              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{p.nickName}</div>
                              <div className="uppercase tracking-wide text-sm text-gray-800 font-semibold">{p.data.data.name}</div>
                              </div>
                          </div>
                        </div>
                      </Link>
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

export default Home;
