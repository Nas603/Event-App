import React from 'react';

const Filters = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ['All', 'Music', 'Art', 'Technology'];

  return (
    <div className="filters">
      <label htmlFor="category">Filter by category: </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;