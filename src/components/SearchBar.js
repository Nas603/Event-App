import React, { useState } from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const [localQuery, setLocalQuery] = useState(searchTerm);

  const handleSearch = () => {
    setSearchTerm(localQuery);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Search events..."
        className="search-input"
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
