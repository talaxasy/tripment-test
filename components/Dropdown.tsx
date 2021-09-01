import React from 'react';
import {ArrowDownIcon, SortIcon} from '../svg';
import Checkbox from './Checkbox';

type DropdownProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  type: 'avalibility' | 'speciality' | 'insurance' | 'sort';
};

const Dropdown: React.FC<DropdownProps> = ({type, ...rest}) => {
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
          <Checkbox />
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
