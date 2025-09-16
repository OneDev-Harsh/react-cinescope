import React, { useState } from 'react'
import Header from './components/Header'
import RandomMovies from './components/RandomMovies'
import SearchResults from './components/SearchResults' // 👈 import search results
import Top10Movies from './components/Top10Movies'
import Navbar from './components/Navbar'
import TopHindiMovies from './components/TopHindiMovies'
import TrendingMovies from './components/TrendingMovies'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState("random");

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header with search bar */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {searchTerm.trim() ? (
        <SearchResults searchTerm={searchTerm} />
      ) : (
        <>
          {activeTab === "random" && <RandomMovies />}
          {activeTab === "top" && <Top10Movies />}
          {activeTab === "popular_hindi" && <TopHindiMovies />}
          {activeTab === "trending" && <TrendingMovies />}
          {activeTab === "search" && (
            <p className="text-gray-400 text-center py-10">
              Start typing in the search bar above to find movies 🎬
            </p>
          )}
        </>
      )}
    </main>
  )
}

export default App
