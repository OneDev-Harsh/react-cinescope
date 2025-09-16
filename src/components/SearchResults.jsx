import React, { useEffect, useState } from "react";
import MovieModal from "./MovieModal";

const SearchResults = ({ searchTerm }) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!searchTerm.trim()) return;

    async function fetchSearchResults() {
      try {
        const res = await fetch(
          `https://api.imdbapi.dev/search/titles?query=${encodeURIComponent(searchTerm)}`
        );
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();

        setResults(data.titles || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load search results");
      }
    }

    fetchSearchResults();
  }, [searchTerm]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <section className="py-10 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">
          Search Results for <span className="text-yellow-400">{searchTerm}</span>
        </h2>

        {results.length === 0 ? (
          <p className="text-gray-400">No movies found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {results.map((movie) => (
              <div
                key={movie.id || movie.imdb_id}
                onClick={() => setSelectedMovie(movie)}
                className="bg-gray-800 rounded-lg shadow-md hover:scale-105 transition cursor-pointer"
              >
                {movie.primaryImage?.url ? (
                  <img
                    src={movie.primaryImage.url}
                    alt={movie.primaryTitle}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <div className="p-3">
                  <h3 className="text-lg font-semibold truncate">{movie.primaryTitle}</h3>
                  <p className="text-sm text-gray-400">{movie.startYear || "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      
    </section>
  );
};

export default SearchResults;
