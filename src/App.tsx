import { BrowserRouter, Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";

// states
import { AppStateProvider } from "./states/AppState";

// pages
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";
import { PokemonProvider } from "./states/localstorage";
import CatchedPokemons from "./pages/CatchedPokemons";

//
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppStateProvider>
      <PokemonProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:pokemon" element={<Pokemon />} />
            <Route path="/myPokemons" element={<CatchedPokemons />} />
          </Routes>
        </BrowserRouter>
        </PokemonProvider>
      </AppStateProvider>
    </QueryClientProvider>
  );
}

export default App;
