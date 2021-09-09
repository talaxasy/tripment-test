import React from 'react';
import Radiobutton from './Radiobutton';

interface RadioGroupProps {
  array: Array<string> | null;
  setChecked: (name: string) => void;
  current: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({array, setChecked, current}) => {
  return (
    <div className="checkbox_group">
      {array?.length &&
        array.map(el => (
          <Radiobutton
            key={el}
            checked={el === current}
            onChange={name => setChecked(name)}
            name={el}
          />
        ))}
    </div>
  );
};

export default RadioGroup;
