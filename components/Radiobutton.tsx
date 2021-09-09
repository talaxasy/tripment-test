import React from 'react';
import {OkIcon} from '../svg';

interface RadiobuttonProps {
  name: string;
  checked: boolean;
  onChange: (x: string) => void;
}

const Radiobutton: React.FC<RadiobuttonProps> = ({name, checked, onChange}) => {
  return (
    <div className="checkbox">
      <OkIcon className={`radio_indicator ${checked && 'checked'}`} />
      <div className="label" onClick={() => onChange(name)} style={{marginLeft: '14px'}}>
        {name}
      </div>
    </div>
  );
};

export default Radiobutton;
