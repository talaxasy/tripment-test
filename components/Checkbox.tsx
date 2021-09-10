import React from 'react';
import {OkIcon, TelehealthIcon} from '../svg';

interface CheckboxProps {
  name: string;
  checked: boolean;
  onChange: (x: boolean) => void;
  count?: number;
}

const Checkbox: React.FC<CheckboxProps> = ({name, checked, onChange, count}) => {
  return (
    <div className="checkbox">
      <div className={`border ${checked && 'checked'}`} onClick={() => onChange(!checked)}>
        <OkIcon className={`indicator ${checked && 'checked'}`} />
        <div className="somediv"></div>
      </div>
      <div className="label" onClick={() => onChange(!checked)}>
        {name === 'Telehealth' && (
          <TelehealthIcon width={24} height={24} style={{marginRight: '8px'}} />
        )}
        {name}
        <span style={{marginLeft: '8px', color: '#91A5A7'}}>{`(${count && count})`}</span>
      </div>
    </div>
  );
};

export default Checkbox;
