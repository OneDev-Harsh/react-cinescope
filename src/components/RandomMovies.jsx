import React, { useEffect, useState } from "react";
import MovieModal from "./MovieModal";

const RandomMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchRandomMovies();
  }, []);

  async function fetchRandomMovies() {
    try {
      const res = await fetch("https://api.imdbapi.dev/titles?types=MOVIE");
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      setMovies(data.titles || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load random movies");
    }
  }

  if (error) {
    return <div className="text-red-500 mt-6">{error}</div>;
  }

  return (
    <section className="py-10 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Random Picks for You
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.length === 0 ? (
            <p>Loading...</p>
          ) : (
            movies.map((movie) => (
              <div
                key={movie.id || movie.imdb_id}
                onClick={() => setSelectedMovie(movie)}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition cursor-pointer"
              >
                {movie.primaryImage?.url ? (
                  <img
                    src={movie.primaryImage.url}
                    alt={movie.primaryTitle}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">
                    {movie.primaryTitle}
                  </h3>
                  {movie.startYear && (
                    <p className="text-sm text-gray-400 mt-1">{movie.startYear}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
        <h1 className="text-center text-gray-400 text-lg mt-10 mb-6">
        The picture isn't over yet. 
        <span className="text-yellow-400 font-semibold"> Type in the search bar </span> 
        to explore more.
        </h1>

      {/* Modal */}
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </section>
  );
};

export default RandomMovies;
