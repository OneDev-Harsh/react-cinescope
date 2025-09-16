import React, { useEffect, useState } from "react";

const MovieModal = ({ movie, onClose }) => {
  const [images, setImages] = useState([]);
  const [enlargedImage, setEnlargedImage] = useState(null);

  useEffect(() => {
    if (!movie?.id) return;

    async function fetchImages() {
      try {
        const res = await fetch(
          `https://api.imdbapi.dev/titles/${movie.id}/images?pageSize=50`
        );
        if (!res.ok) throw new Error("Failed to fetch images");
        const data = await res.json();
        setImages(data.images || []);
      } catch (err) {
        console.error("Image fetch error:", err);
      }
    }

    fetchImages();
  }, [movie?.id]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
      {/* Modal Container */}
      <div className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black p-6 rounded-2xl max-w-3xl w-full shadow-2xl overflow-y-auto max-h-[90vh] border border-gray-800 animate-slideUp">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition transform hover:scale-110 cursor-pointer"
        >
          ✖
        </button>

        {/* Poster */} {movie.primaryImage?.url && ( <div className="w-full h-72 bg-black flex items-center justify-center rounded-lg mb-4"> <img src={movie.primaryImage.url} alt={movie.primaryTitle} className="w-full h-full object-contain" /> </div> )}

        {/* Title */}
        {movie.primaryTitle && (
          <h3 className="text-3xl font-extrabold mb-2 text-white">
            {movie.primaryTitle}
          </h3>
        )}

        {/* Original Title */}
        {movie.originalTitle && (
          <p className="text-gray-400 italic mb-4">({movie.originalTitle})</p>
        )}

        {/* Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-6">
          {movie.type && (
            <span className="px-3 py-1 bg-gray-800/60 rounded-full">
              🎬 {movie.type}
            </span>
          )}
          {movie.genres && (
            <span className="px-3 py-1 bg-gray-800/60 rounded-full">
              🎭 {movie.genres}
            </span>
          )}
          {movie.startYear && (
            <span className="px-3 py-1 bg-gray-800/60 rounded-full">
              📅 {movie.startYear}
            </span>
          )}
          {movie.rating?.aggregateRating && (
            <span className="px-3 py-1 bg-gray-800/60 rounded-full">
              ⭐ {movie.rating.aggregateRating} / 10
            </span>
          )}
        </div>

        {/* Plot */}
        {movie.plot && (
          <p className="text-gray-200 leading-relaxed mb-6">{movie.plot}</p>
        )}

        {/* Extra Images */}
        {images.length > 0 && (
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-white mb-3">📸 More Images</h4>
            <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={`Extra ${index}`}
                  onClick={() => setEnlargedImage(img.url)}
                  className="w-44 h-32 object-cover rounded-lg border border-gray-700 cursor-pointer 
                             hover:scale-110 hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-transform duration-300"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enlarged Image Overlay */}
      {enlargedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[60] animate-fadeIn">
          <button
            onClick={() => setEnlargedImage(null)}
            className="absolute top-6 right-8 text-gray-400 hover:text-white text-3xl transition transform hover:scale-125 cursor-pointer"
          > 
            ✖
          </button>
          <img
            src={enlargedImage}
            alt="Enlarged"
            className="max-w-5xl max-h-[85vh] object-contain rounded-xl shadow-[0_0_40px_rgba(99,102,241,0.8)] animate-zoomIn"
          />
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(40px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes zoomIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-fadeIn { animation: fadeIn 0.4s ease-in-out; }
          .animate-slideUp { animation: slideUp 0.5s ease-out; }
          .animate-zoomIn { animation: zoomIn 0.4s ease-in-out; }
        `}
      </style>
    </div>
  );
};

export default MovieModal;
