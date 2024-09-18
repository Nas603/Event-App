import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const onChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={onChange}
      placeholder="Search events"
    />
  );
};

export default SearchBar;