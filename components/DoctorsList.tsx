import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {MockType, useStore} from '../lib/store';
import {InfoIcon} from '../svg';
import DoctorItem from './DoctorItem';

interface DoctorsListProps {}

const DoctorsList: React.FC<DoctorsListProps> = ({}) => {
  const {mock, searchParams} = useStore() as {
    mock: MockType[];
    searchParams: {
      avalibility: Array<{title: string; people: number[]}>;
      insurance: string[];
      speciality: string[];
      sort: string;
      providesOtherPaymentsOptions: boolean;
    };
  };
  const [doctors, setDoctors] = useState<MockType[] | null>(null);
  const [list, setList] = useState<null | undefined | any[]>(null);

  const filterSearch = () => {
    //Speciality
    let specialityArr: number[] = [];
    doctors?.forEach(doc => {
      let flag = false;
      searchParams.speciality.forEach(spec => {
        if (spec === doc.speciality) {
          flag = true;
        }
      });
      flag && specialityArr.push(doc.id);
    });

    //Insurance
    let insuranceArr: number[] = [];
    doctors?.forEach(doc => {
      let flag = false;
      searchParams.insurance.forEach(ins => {
        if (ins === doc.insurances) {
          flag = true;
        }
      });
      flag && insuranceArr.push(doc.id);
    });

    //Avalibility
    let avalibilityArr: number[] = [];
    searchParams.avalibility.forEach(aval => {
      if (aval.title === 'Today') {
        avalibilityArr.push(...aval.people);
      }

      if (aval.title === 'Next 3 days') {
        avalibilityArr.push(...aval.people);
      }

      if (aval.title === 'Next 2 weeks') {
        avalibilityArr.push(...aval.people);
      }

      if (aval.title === 'Telehealth') {
        avalibilityArr.push(...aval.people);
      }
      if (aval.title === 'Accepts new patients') {
        avalibilityArr.push(...aval.people);
      }
      if (aval.title === 'Schedules online') {
        avalibilityArr.push(...aval.people);
      }
    });

    let mergedArr = [...new Set([...specialityArr, ...insuranceArr, ...avalibilityArr])];

    setList(
      doctors?.map(doc => {
        return mergedArr.map(id => id === doc.id && <DoctorItem data={doc} key={doc.id} />);
      }),
    );
  };

  useEffect(() => {
    setDoctors(mock);
  }, []);

  useEffect(() => {
    setList(mock.map(el => <DoctorItem data={el} key={el.id} />));
  }, [doctors]);

  useEffect(() => {
    filterSearch();
  }, [searchParams]);

  return (
    <>
      <div>
        <h2>Root Canal doctors in New York, NY</h2>
        <div style={{display: 'flex', alignItems: 'center', marginTop: 16}}>
          <InfoIcon />
          <p>The average price of a procedure in New York is $300</p>
        </div>

        <div style={{marginTop: '30px'}}>
          {list ? list : 'loading...'}
          <pre></pre>
        </div>
      </div>
    </>
  );
};

export default DoctorsList;
