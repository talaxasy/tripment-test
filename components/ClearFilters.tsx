import React from 'react';

interface ClearFiltersProps {}

const ClearFilters: React.FC<
  ClearFiltersProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({...rest}) => {
  return (
    <div className="reset_link" {...rest}>
      <span>Clear filters</span>
    </div>
  );
};

export default ClearFilters;
