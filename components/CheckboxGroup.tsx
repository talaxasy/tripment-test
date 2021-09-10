import React, {useEffect, useState} from 'react';
import Checkbox from './Checkbox';

interface CheckboxGroupProps {
  array?: Array<{name: string; count?: number; checked: boolean}> | null;
  type?: string;
  searchTerm?: string;
  setChecked: (revertChecked: boolean, idx: string) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  array,
  searchTerm = '',
  setChecked,
  type,
}) => {
  return (
    <div className={`checkbox_group ${type === 'avalibility' ? 'overflow_fix' : ''}`}>
      {array?.length
        ? array
            .filter(el => {
              if (searchTerm === '') {
                return el;
              } else if (searchTerm && el.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return el;
              }
            })
            .map(el => (
              <Checkbox
                key={el.name}
                checked={el.checked}
                onChange={revertChecked => setChecked(revertChecked, el.name)}
                name={el.name}
                count={el.count}
              />
            ))
        : null}

      {array?.length &&
        array.filter(el => {
          if (searchTerm === '') {
            return el;
          } else if (searchTerm && el.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return el;
          }
        }).length === 0 && <span style={{opacity: 0.4}}>Nothing found</span>}
    </div>
  );
};

export default CheckboxGroup;
