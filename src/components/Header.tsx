import { Link } from "react-router-dom";

import { useApp } from "../states/AppState";

const Header: React.FC<{}> = () => {
  const { searchQuery, setSearchQuery } = useApp();

  return (
    <header className="w-full py-4 shadow bg-gray-900 sticky top-0 z-50 drop-shadow-lg">
      <div className="container mx-auto flex flex-col items-center space-y-2 px-6 md:flex-row md:space-x-4 md:space-y-0 lg:px-0">
        <Link to="/" className="font-medium text-yellow-400">
          Pokemon App
        </Link>
        <div className="justify-center">
          <input
            type="text"
            placeholder="Search pokemon by name..."
            className="w-full border font-light text-yellow-400 border-yellow-300  bg-transparent rounded py-1 px-4 md:w-72 focus:border-yellow-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link to="/myPokemons" className="font-medium text-yellow-400">
          My Pokemons
        </Link>
      </div>
    </header>
  );
};

export default Header;
