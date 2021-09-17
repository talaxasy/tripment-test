import React, {useEffect, useRef, useState} from 'react';
import {useStore, MockType, FilterTypes} from '../lib/store';
import {ArrowDownIcon, CrossIcon, HeartIcon, SearchIcon, SortIcon} from '../svg';
import Checkbox from './Checkbox';
import CheckboxGroup from './CheckboxGroup';

import lodash from 'lodash';
import RadioGroup from './RadioGroup';
import SwitchButton from './SwitchButton';
import moment from 'moment';

type CheckBoxState = {
  name: string;
  count: number;
  checked: boolean;
  arr?: number[];
};

type DropdownProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  type: 'avalibility' | 'speciality' | 'insurance' | 'sort';
  regen: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({type, regen, ...rest}) => {
  const {
    mock,
    setSpeciality,
    setInsurance,
    setAvalibility,
    setSort,
    searchParams,
    resetAvalibility,
    resetInsurance,
    resetSpeciality,
    setProvidesOtherPayOptions,
    setModalType,
    modalType,
    resetAllFilters,
  } = useStore();
  const [doctors, setDoctors] = useState<MockType[] | null>(null);
  const [multiplyList, setMultiplyList] = useState<Array<CheckBoxState> | null>(null);
  const [sortRadio, setSortRadio] = useState(searchParams.sort);
  const [searchTerm, setSearchTerm] = useState('');
  const [provideOthPayOpt, setProvideOthPayOpt] = useState(
    searchParams.providesOtherPaymentsOptions,
  );

  const [avalibility1Part, setAvalibility1Part] = useState<Array<CheckBoxState> | null>([
    {name: 'Today', count: 0, checked: false},
    {name: 'Next 3 days', count: 0, checked: false},
    {name: 'Next 2 weeks', count: 0, checked: false},
  ]);
  const [avalibility2Part, setAvalibility2Part] = useState<Array<CheckBoxState> | null>([
    {name: 'Telehealth', count: 0, checked: false},
    {name: 'Accepts new patients', count: 0, checked: false},
    {name: 'Schedules online', count: 0, checked: false},
    {name: 'Treats сhildren', count: 0, checked: false},
  ]);

  useEffect(() => {
    if (type === 'avalibility' && avalibility2Part && avalibility1Part) {
      setMultiplyList([...avalibility1Part, ...avalibility2Part]);
    }
  }, []);

  useEffect(() => {
    setDoctors(mock);
  }, [mock]);

  useEffect(() => {
    getMockNameCount(type);
  }, [doctors]);

  useEffect(() => {
    resetAllFilters();
    resetFilter();
  }, [regen]);

  const setAllInsurance = () => {
    if (!provideOthPayOpt) {
      if (multiplyList) {
        setInsurance(multiplyList.map(el => el.name));
        setMultiplyList(
          multiplyList.map(el => {
            el.checked = true;
            return el;
          }),
        );
      }
    } else {
      if (multiplyList) {
        setInsurance([]);
        setMultiplyList(
          multiplyList.map(el => {
            el.checked = false;
            return el;
          }),
        );
      }
    }
  };

  // useEffect(() => {
  //   console.log('searchParams', searchParams);
  // });

  const getMockNameCount = lodash.memoize((type: FilterTypes) => {
    if (doctors) {
      let object: any = {};
      let arr: Array<{name: string; count: number; checked: boolean}> = [];

      if (type === 'insurance') {
        object = JSON.parse(
          JSON.stringify(
            doctors
              .map(doc => doc.insurances)
              .reduce((acc: any, el) => {
                acc[el] = (acc[el] || 0) + 1;
                return acc;
              }, {}),
            null,
            2,
          ),
        );
      }

      if (type === 'speciality') {
        object = JSON.parse(
          JSON.stringify(
            doctors
              .map(doc => doc.speciality)
              .reduce((acc: any, el) => {
                acc[el] = (acc[el] || 0) + 1;
                return acc;
              }, {}),
            null,
            2,
          ),
        );
      }

      if (type === 'speciality' || type === 'insurance') {
        for (let i = 0; i < lodash.keys(object).length; i++) {
          arr.push({
            name: lodash.keys(object)[i],
            count: lodash.values(object)[i] > 0 ? lodash.values(object)[i] : 0,
            checked: false,
          });
        }
      }

      if (type === 'avalibility') {
        multiplyList?.map(el => {
          if (el.name === 'Today') {
            let arr: number[] = [];
            doctors.filter(doc => {
              if (
                moment(doc.telehealth_available).isSameOrAfter(moment()) ||
                moment(doc.offline_available).isSameOrAfter(moment())
              ) {
                arr.push(doc.id);
              }
            });
            el.count = arr.length;
            el.arr = arr;
          }
          if (el.name === 'Next 3 days') {
            let arr: number[] = [];
            doctors.filter(doc => {
              if (
                moment(doc.telehealth_available).isBetween(
                  moment(),
                  moment().add(3, 'days'),
                  undefined,
                  '[]',
                ) ||
                moment(doc.offline_available).isBetween(
                  moment(),
                  moment().add(3, 'days'),
                  undefined,
                  '[]',
                )
              ) {
                arr.push(doc.id);
              }
            });
            el.count = arr.length;
            el.arr = arr;
          }
          if (el.name === 'Next 2 weeks') {
            let arr: number[] = [];
            doctors.filter(doc => {
              if (
                moment(doc.telehealth_available).isBetween(
                  moment(),
                  moment().add(2, 'weeks'),
                  undefined,
                  '[]',
                ) ||
                moment(doc.offline_available).isBetween(
                  moment(),
                  moment().add(2, 'weeks'),
                  undefined,
                  '[]',
                )
              ) {
                arr.push(doc.id);
              }
            });
            el.count = arr.length;
            el.arr = arr;
          }

          if (el.name === 'Telehealth') {
            let arr: number[] = [];
            doctors.filter(doc => {
              if (doc.telehealth) {
                arr.push(doc.id);
              }
            });
            el.count = arr.length;
            el.arr = arr;
          }

          if (el.name === 'Accepts new patients') {
            let arr: number[] = [];
            doctors.filter(doc => {
              if (
                moment(doc.telehealth_available).isBetween(
                  moment(),
                  moment().add(2, 'weeks'),
                  undefined,
                  '[]',
                )
              ) {
                arr.push(doc.id);
              }
            });
            el.count = arr.length;
            el.arr = arr;
          }

          if (el.name === 'Schedules online') {
            let arr: number[] = [];
            doctors.filter(doc => {
              if (moment(doc.telehealth_available).isSameOrAfter(moment())) {
                arr.push(doc.id);
              }
            });
            el.count = arr.length;
            el.arr = arr;
          }

          return el;
        });
      }

      arr.length && setMultiplyList(arr);
    }
  });

  const updateChecbox = lodash.memoize((revertChecked: boolean, idx2: string) => {
    if (multiplyList) {
      setMultiplyList(
        multiplyList.map(el => (el.name === idx2 ? {...el, checked: revertChecked} : el)),
      );
    }

    if (type === 'avalibility') {
      setAvalibility1Part(
        avalibility1Part!.map(el => (el.name === idx2 ? {...el, checked: revertChecked} : el)),
      );
      setAvalibility2Part(
        avalibility2Part!.map(el => (el.name === idx2 ? {...el, checked: revertChecked} : el)),
      );
    }
  });

  const submitHandler = lodash.memoize((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (type === 'sort') {
      setSort(sortRadio);
    }
    //Zustand setup
    let newArr: string[] = [];
    let avalArr: Array<{title: string; people: number[]}> = [];
    if (!!multiplyList) {
      if (type === 'insurance') {
        multiplyList.forEach(el => el.checked && newArr.push(el.name));
        setInsurance(newArr);
        setProvidesOtherPayOptions(provideOthPayOpt);
      }
      if (type === 'speciality') {
        multiplyList.forEach(el => el.checked && newArr.push(el.name));
        setSpeciality(newArr);
      }

      if (type === 'avalibility') {
        // console.log('multiplyList', multiplyList);
        multiplyList.forEach(
          el => el.checked && avalArr.push({title: el.name, people: el.arr ?? []}),
        );
        setAvalibility(avalArr);
      }
    }
    setModalType('none');
  });

  const resetFilter = lodash.memoize(() => {
    if (!!multiplyList) {
      setMultiplyList(
        multiplyList.map(el => {
          el.checked = false;
          return el;
        }),
      );
    }

    setAvalibility1Part(
      avalibility1Part!.map(el => {
        el.checked = false;
        return el;
      }),
    );
    setAvalibility2Part(
      avalibility2Part!.map(el => {
        el.checked = false;
        return el;
      }),
    );

    if (type === 'avalibility') {
      resetAvalibility();
    }

    if (type === 'speciality') {
      resetSpeciality();
    }

    if (type === 'insurance') {
      setProvideOthPayOpt(false);
      resetInsurance();
    }

    if (type === 'sort') {
      setSortRadio('Next available');
      setSort('Next available');
    }
  });

  return (
    <div style={{position: 'relative'}}>
      <div
        onClick={() => {
          setModalType(modalType !== type ? type : 'none');
        }}
        className={`select_btn ${modalType === type && 'checked'}`}
        {...rest}
      >
        <div className="outer">
          {type === 'sort' && <SortIcon />}
          <span style={{margin: type !== 'sort' ? '0 10px 0 0' : '0 10px'}}>
            {type[0].toUpperCase() + type.slice(1)}
            {searchParams.insurance.length !== 0 && type === 'insurance' && (
              <>
                {' '}
                <span style={{fontWeight: 900}}>·</span>{' '}
                <span style={{fontWeight: 500}}>{searchParams.insurance.length}</span>
              </>
            )}
            {searchParams.avalibility.length !== 0 && type === 'avalibility' && (
              <>
                {' '}
                <span style={{fontWeight: 900}}>·</span>{' '}
                <span style={{fontWeight: 500}}>{searchParams.avalibility.length}</span>
              </>
            )}
            {searchParams.speciality.length !== 0 && type === 'speciality' && (
              <>
                {' '}
                <span style={{fontWeight: 900}}>·</span>{' '}
                <span style={{fontWeight: 500}}>{searchParams.speciality.length}</span>
              </>
            )}
          </span>

          {searchParams.speciality.length !== 0 && type === 'speciality' ? (
            <div
              style={{display: 'inline-flex'}}
              onClick={e => {
                e.stopPropagation();
                if (multiplyList)
                  setMultiplyList(
                    multiplyList.map(el => {
                      el.checked = false;
                      return el;
                    }),
                  );
                resetSpeciality();
              }}
            >
              <CrossIcon />
            </div>
          ) : searchParams.avalibility.length !== 0 && type === 'avalibility' ? (
            <div
              style={{display: 'inline-flex'}}
              onClick={e => {
                e.stopPropagation();
                setAvalibility1Part(
                  avalibility1Part!.map(el => {
                    el.checked = false;
                    return el;
                  }),
                );
                setAvalibility2Part(
                  avalibility2Part!.map(el => {
                    el.checked = false;
                    return el;
                  }),
                );
                if (multiplyList)
                  setMultiplyList(
                    multiplyList.map(el => {
                      el.checked = false;
                      return el;
                    }),
                  );
                resetAvalibility();
              }}
            >
              <CrossIcon />
            </div>
          ) : searchParams.insurance.length !== 0 && type === 'insurance' ? (
            <div
              style={{display: 'inline-flex'}}
              onClick={e => {
                e.stopPropagation();
                if (!!multiplyList) {
                  setMultiplyList(
                    multiplyList.map(el => {
                      el.checked = false;
                      return el;
                    }),
                  );
                }
                resetInsurance();
              }}
            >
              <CrossIcon />
            </div>
          ) : (
            <ArrowDownIcon />
          )}
        </div>
      </div>
      <div
        className="dropdown_content"
        style={{
          minHeight: type === 'speciality' || type === 'insurance' ? '500px' : undefined,
          minWidth:
            type === 'avalibility'
              ? '320px'
              : type === 'speciality' || type === 'insurance'
              ? '375px'
              : '266px',
          display: modalType === type ? 'flex' : 'none',
        }}
      >
        <div
          className="dropdown_content__header"
          style={{
            paddingBottom: type === 'sort' ? '34px' : undefined,
          }}
        >
          <span
            className="dwn_ctx_hdr__title"
            style={{
              display: 'block',
              paddingTop: type !== 'sort' && type !== 'avalibility' ? '8px' : undefined,
              paddingBottom: type === 'sort' || type === 'avalibility' ? '16px' : undefined,
            }}
          >
            {type === 'sort' && 'Sort by'}
            {type === 'avalibility' && 'Avalibility'}
          </span>

          {type === 'insurance' && (
            <>
              <SwitchButton
                name="Provides other than insurance payment options"
                checked={provideOthPayOpt}
                onChange={revertChecked => {
                  setProvideOthPayOpt(revertChecked);
                  // setAllInsurance(); // Disabled for a moment
                }}
              />
              <hr style={{opacity: 0.2, margin: '16px 0'}} />
            </>
          )}

          {type === 'insurance' || type === 'speciality' ? (
            <>
              <div className="search_filter">
                <input
                  type="text"
                  placeholder={
                    type === 'speciality' ? 'Filter by speciality' : 'Filter by insurance carrier'
                  }
                  onChange={e => {
                    setSearchTerm(e.target.value);
                  }}
                />
                <SearchIcon className="search_icon" />
              </div>
              <CheckboxGroup
                array={multiplyList}
                type={type}
                setChecked={(revertChecked, idx) => updateChecbox(revertChecked, idx)}
                searchTerm={searchTerm}
              />
            </>
          ) : null}

          {type === 'sort' && (
            <RadioGroup
              array={['Next available', 'Most Experienced', 'Most Expensive']}
              setChecked={name => {
                setSortRadio(name);
                setSort(name);
              }}
              current={sortRadio}
            />
          )}

          {type === 'avalibility' && (
            <>
              <CheckboxGroup
                array={avalibility1Part}
                type={type}
                setChecked={(revertChecked, idx) => updateChecbox(revertChecked, idx)}
              />

              <hr style={{opacity: 0.2, margin: '16px 0'}} />

              <CheckboxGroup
                array={avalibility2Part}
                type={type}
                setChecked={(revertChecked, idx) => updateChecbox(revertChecked, idx)}
              />
            </>
          )}
        </div>
        {type !== 'sort' && (
          <div className="dropdown_content__footer">
            <span
              className="reset_link"
              style={{fontSize: '14px', lineHeight: '18px'}}
              onClick={() => resetFilter()}
            >
              Reset
            </span>
            <button
              tabIndex={1}
              type="button"
              className="apply_btn"
              onClick={e => submitHandler(e)}
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
