import React from 'react';
import {CrossIcon, OkIcon} from '../svg';

type SwitchButtonProps = {
  name: string;
  checked: boolean;
  onChange: (x: boolean) => void;
};

const SwitchButton: React.FC<SwitchButtonProps> = ({name, checked, onChange}) => {
  return (
    <div className="switch">
      <div className="label">{name}</div>
      <div
        className={`border ${checked && 'checked'}`}
        onClick={() => {
          onChange(!checked);
        }}
      >
        <div className={`indicator ${checked && 'checked'}`}>
          {checked ? (
            <OkIcon className="ok" style={{fill: '#1C383A'}} />
          ) : (
            <CrossIcon className="ok" style={{width: '10px', height: '10px', fill: '#668386'}} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SwitchButton;
