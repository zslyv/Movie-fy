import LoadingSpinner from "./components/LoadingSpinner.tsx";
import MovieCard from "./components/MovieCard.tsx";
import Search from "./components/Search.tsx"
import { useState, useEffect } from "react";

const API_BASE_URL = "https://api.themoviedb.org/3"

// Access API key
const API_KEY = import.meta.env.VITE_TMDB_API_KEY //This part has to have the same name as the one in ENV file

const API_OPTIONS = {
  method: 'GET',
  headers: { //This is an object
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async (query = '') => {
    // Loading
    setIsLoading(true);
    setErrorMessage('');

    // Fecthing API data
    try {
      const endpoint = query
      // See if threre's a query if yes search it if not just put popular movies
      // encondeURIComponent it's to process characters as and space or a weird character in UTF-8 so the search doesn't mess up
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      // Fetch is to get data from API's
      const response = await fetch(endpoint, API_OPTIONS);
      
      if(!response.ok) {
        // The following line its usefull to test when an error happens
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      
      if(data.response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || [])
    } 
    catch {
      setErrorMessage('Error fetching movies. Please try again');
    } 
    finally {
      setIsLoading(false);
    }
  }
  // Will only be triggered by the start of the app, the empty dependency (array at the end only loads when useEffect finished)
  useEffect(()=> {
    fetchMovies(searchTerm);
    // Add the dependency down here to fetch new movies on search (reacall)
  }, [searchTerm]);

  return (
    <main className="p-9">
      <header className="mt-15">
        <h1><span className="text-gradient">Gradient </span>title woah</h1>
        {/* This is a component, this is very similar to angular in the aspect of getting the component from another component folder, and calling it here (needs to be imported) */}
        {/* This here is a prop and are used to comunicate between files */}
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>

      <section className="all-movies">
        <h2 className="mt-9">All movies</h2>
        {isLoading ? (
          <LoadingSpinner/>
        ): errorMessage ? (
          <p className="text-violet-400">{errorMessage}</p>
        ): (
          <ul>
            {movieList.map((movie) => (
              // Key it's like an id so we can pass id belonging with each movie.
              <MovieCard key={movie.id} movie={movie}/>
            ))}
          </ul>
        )}
      </section>

    </main>
  )
}

export default App