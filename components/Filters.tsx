import React from 'react';
import {ArrowDownIcon, TelehealthIcon} from '../svg';
import ClearFilters from './ClearFilters';
import Dropdown from './Dropdown';

interface FiltersProps {}

const Filters: React.FC<FiltersProps> = ({...rest}) => {
  return (
    <div className="filters" {...rest}>
      <Dropdown type="avalibility" />
      <Dropdown type="speciality" />
      <Dropdown type="insurance" />
      <Dropdown type="sort" style={{border: 'none'}} />
      <ClearFilters />
    </div>
  );
};

export default Filters;
