import React, { useEffect, useState } from "react";
import MovieModal from "./MovieModal";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function fetchPopularHindiMovies() {
      try {
        const res = await fetch("https://api.imdbapi.dev/titles?types=MOVIE&startYear=2025&minVoteCount=50000&sortBy=SORT_BY_POPULARITY");
        if (!res.ok) throw new Error("Failed to fetch Top 10 movies");
        const data = await res.json();

        setMovies(data.titles || []);
      } catch (err) {
        console.error(err);
        setError("Could not load Top 10 movies.");
      }
    }

    fetchPopularHindiMovies();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <section className="py-12 bg-gray-950 text-white">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">
            Trending Movies
        </h2>

        {movies.length === 0 ? (
          <p className="text-gray-400 text-center">Loading top movies...</p>
        ) : (
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {movies.map((movie, index) => (
              <li
                key={movie.id || index}
                onClick={() => setSelectedMovie(movie)}
                className="bg-gray-900 rounded-lg shadow-lg hover:scale-105 transition transform p-4 flex flex-col items-center text-center"
              >

                {/* Poster */}
                {movie.primaryImage?.url ? (
                  <img
                    src={movie.primaryImage.url}
                    alt={movie.primaryTitle}
                    className="w-full h-60 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-60 bg-gray-700 flex items-center justify-center rounded-lg mb-4">
                    No Image
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-semibold truncate">
                  {movie.primaryTitle}
                </h3>

                {/* Rating */}
                {movie.rating?.aggregateRating && (
                  <p className="text-yellow-400 mt-2">
                    ⭐ {movie.rating.aggregateRating} / 10
                  </p>
                )}

                {/* Year */}
                {movie.startYear && (
                  <p className="text-sm text-gray-400">📅 {movie.startYear}</p>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </section>
  );
};

export default TrendingMovies;
