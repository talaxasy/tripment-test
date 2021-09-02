import React from 'react';

interface CheckboxProps {
  name: string;
  checked: boolean;
  onChange: (x: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({name, checked, onChange}) => {
  return (
    <div className="checkbox">
      <div className="border" onClick={() => onChange(!checked)}>
        <div className={`indicator ${checked && 'checked'}`} />
      </div>
      <div className="label">
        {name}
        <span style={{marginLeft: '8px', color: '#91A5A7'}}>(2)</span>
      </div>
    </div>
  );
};

export default Checkbox;
