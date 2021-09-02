import React, {useEffect, useState} from 'react';
import {useStore, MockType} from '../lib/store';
import {ArrowDownIcon, SortIcon} from '../svg';
import Checkbox from './Checkbox';
import CheckboxGroup from './CheckboxGroup';

import lodash from 'lodash';

type DropdownProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  type: 'avalibility' | 'speciality' | 'insurance' | 'sort';
};

const Dropdown: React.FC<DropdownProps> = ({type, ...rest}) => {
  const {mock} = useStore();
  const [doctors, setDoctors] = useState<MockType[] | null>(null);
  const [specialites, setSpecialites] = useState<string[] | null>(null);

  useEffect(() => {
    setDoctors(mock);
  }, [mock]);

  useEffect(() => {
    if (doctors) {
      const setArr = new Set(doctors.map(doc => doc.speciality));
      const specialitesArr = [...setArr];
      console.log('specialitesArr', specialitesArr);

      const obj = {a: 1, b: 2};

      console.log('keys ', lodash.keys(obj));

      const object = JSON.parse(
        JSON.stringify(
          doctors
            .map(doc => doc.speciality)
            .reduce((acc: any, el) => {
              acc[el] = (acc[el] || 0) + 1;
              console.log('acc', acc);
              console.log('el', el);
              return acc;
            }, {}),
          null,
          2,
        ),
      );

      console.log('object ', object);

      setSpecialites(specialitesArr);
    }
  }, [doctors]);

  //   const [checked, setChecked] = useState(false);
  //   const array = ['wd', 'wd'];

  //   type typesf = 'a b c' | 'vvv1 w';
  //   const record: Record<typesf, string> = {
  //     'a b c': 'a b c',
  //     'vvv1 w': 'vvv1 w',
  //   };
  //   console.log(record);

  return (
    <div className="select_btn" {...rest}>
      {type === 'sort' && <SortIcon />}
      <span style={{margin: type !== 'sort' ? '0 10px 0 0' : '0 10px'}}>
        {type[0].toUpperCase() + type.slice(1)}
      </span>
      <ArrowDownIcon />
      <div className="dropdown_content">
        <div className="dropdown_content__header">
          <span className="dwn_ctx_hdr__title">Availability</span>
          <CheckboxGroup type={type} />
          <pre>
            {JSON.stringify(
              ['abc', 'abc', 'bbb b', 'aa a', 'bbb b', 'bbb b', 'ccc', 'd'].reduce((acc, el) => {
                acc[el] = (acc[el] || 0) + 1;
                return acc;
              }, {}),
              null,
              2,
            )}
          </pre>

          {/* <Checkbox key={1} checked={checked} onChange={x => setChecked(x)} name="Today" />
          <Checkbox key={2} checked={checked} onChange={x => setChecked(x)} name="Next 3 days" />
          <Checkbox key={3} checked={checked} onChange={x => setChecked(x)} name="Next 2 weeks" /> */}
        </div>
        <div className="dropdown_content__footer">
          <span className="reset_link" style={{fontSize: '14px', lineHeight: '18px'}}>
            Reset
          </span>
          <button>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
