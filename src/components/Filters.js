import React, { useState } from 'react';

const Filters = ({ onFilterChange }) => {
  const [filterDate, setFilterDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  const handleFilterChange = () => {
    if (onFilterChange) {
      onFilterChange({ date: filterDate, location: filterLocation });
    }
  };

  return (
    <div className="filters-content">
      <input
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
      />
      <input
        type="text"
        value={filterLocation}
        onChange={(e) => setFilterLocation(e.target.value)}
        placeholder="Filter by Location"
      />
      <button onClick={handleFilterChange} className="filter-button">
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
