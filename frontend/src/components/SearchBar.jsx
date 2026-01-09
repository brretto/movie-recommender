// ==============================================================================
// File: src/components/SearchBar.jsx
// ==============================================================================
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto my-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="w-full p-4 pr-16 text-lg text-white bg-gray-700 border-2 border-gray-600 rounded-full focus:outline-none focus:border-cyan-500 transition-colors"
        />
        <button
          type="submit"
          className="absolute top-0 right-0 mt-2 mr-2 px-6 py-2 text-lg font-semibold text-white bg-cyan-500 rounded-full hover:bg-cyan-600 focus:outline-none transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;