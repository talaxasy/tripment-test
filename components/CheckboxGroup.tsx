import React, {useState} from 'react';
import {useStore} from '../lib/store';
import Checkbox from './Checkbox';

interface CheckboxGroupProps {
  customArray?: string[];
  apiArray?: Array<{name: string; count: number}>;
  type: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({customArray, apiArray, type}) => {
  const arr1 = [];
  if (type === 'avalibility') {
  }
  const ApiArrayKeys: Record<string, any> = {};

  const [cusCheck, setCusCheck] = useState<typeof ApiArrayKeys>({});

  return (
    <>
      {/* {apiArray?.length &&
        apiArray.map(el => (
          <Checkbox
            key={el.name}
            checked={checked}
            onChange={x => setChecked(x)}
            name="Next 3 days"
          />
        ))}
      {customArray?.length &&
        customArray.map(el => (
          <Checkbox key={el} checked={checked} onChange={x => setChecked(x)} name="Next 3 days" />
        ))} */}
    </>
  );
};

export default CheckboxGroup;
