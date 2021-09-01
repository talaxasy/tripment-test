import React from 'react';

interface CheckboxProps {}

const Checkbox: React.FC<CheckboxProps> = ({}) => {
  return (
    <div className="checkbox">
      <div className="border">
        <div className="indicator" />
      </div>
      <div className="label">
        Today<span style={{marginLeft: '8px', color: '#91A5A7'}}>(2)</span>
      </div>
    </div>
  );
};

export default Checkbox;
