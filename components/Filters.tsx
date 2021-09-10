import React, {useRef, useState} from 'react';
import {ArrowDownIcon, TelehealthIcon} from '../svg';
import ClearFilters from './ClearFilters';
import Dropdown from './Dropdown';

interface FiltersProps {}

const Filters: React.FC<FiltersProps> = ({...rest}) => {
  const [regenerate, setRegenerate] = useState(false);

  return (
    <div className="filters" {...rest}>
      <Dropdown type="avalibility" regen={regenerate} />
      <Dropdown type="speciality" regen={regenerate} />
      <Dropdown type="insurance" regen={regenerate} />
      <Dropdown type="sort" style={{border: 'none'}} regen={regenerate} />
      <ClearFilters onClick={() => setRegenerate(!regenerate)} />
    </div>
  );
};

export default Filters;
