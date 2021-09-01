import React from 'react';

interface ClearFiltersProps {}

const ClearFilters: React.FC<ClearFiltersProps> = ({}) => {
  return (
    <div className="reset_link">
      <span>Clear filters</span>
    </div>
  );
};

export default ClearFilters;
