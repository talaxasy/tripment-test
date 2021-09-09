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
      <div className="border" onClick={() => onChange(!checked)}>
        <OkIcon className={`indicator ${checked && 'checked'}`} />
      </div>
      <div className="label" onClick={() => onChange(!checked)}>
        {name === 'Telehealth' && (
          <TelehealthIcon width={24} height={24} style={{marginRight: '8px'}} />
        )}
        {name}
        {count && <span style={{marginLeft: '8px', color: '#91A5A7'}}>{`(${count})`}</span>}
      </div>
    </div>
  );
};

export default Checkbox;
