import { createContext, ReactNode, useContext, useState } from 'react';
import { PokemonWithNickName } from '../@types/api';


interface PokemonProviderProps {
  children: ReactNode;
}

interface MyPokemonContextData {
  myPokemons: PokemonWithNickName[];
  addPokemon(pokemon: any, nickName: string): void;
  getCatchedPokemons(): any;
  removePokemon(name: string | undefined): void;

}

const PokemonContext = createContext<MyPokemonContextData>({} as MyPokemonContextData);
export const useMyPokemon = () => useContext(PokemonContext);

export function PokemonProvider({ children }: PokemonProviderProps): JSX.Element {
  const [myPokemons, setPokemon] = useState<PokemonWithNickName[]>(() => {
    const storagedCart = localStorage.getItem('pokemons')
    if (storagedCart != null) {
      return JSON.parse(storagedCart);
    }
    return [];
  });

  function addPokemon(poke: PokemonWithNickName, nickName: string) {
    try {
      const myPokemon = [...myPokemons]
      poke.nickName = nickName;
      myPokemon.push(poke);
      // console.log(myPokemon);
      // removePokemon("ivysaur")
      setPokemon(myPokemon);
      localStorage.setItem('pokemons', JSON.stringify(myPokemon));
    } catch (e) {
      console.error(e);
    }
  };

  const removePokemon = (name: string) => {
    try {
      const p = myPokemons.find(p => p.data.data.name === name);
      localStorage.setItem('pokemons', JSON.stringify({}));

      if (!p) {
        console.log('no pokemone')
      }
      const newPoke = myPokemons.filter((item) => item.data.data.name !== name);
      setPokemon(newPoke);
      localStorage.setItem('pokemons', JSON.stringify(newPoke));
    } catch (e) {
      console.log(e);
    }
  };

  const getCatchedPokemons = () => {
    try {
      const myPoke = localStorage.getItem('pokemons')
      return myPoke;
    } catch (e) {
      console.log(e);
    }
  };



  return (
    <PokemonContext.Provider
      value={{ myPokemons, addPokemon, getCatchedPokemons, removePokemon }}
    >
      {children}
    </PokemonContext.Provider>
  );
}