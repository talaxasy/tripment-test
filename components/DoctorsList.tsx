import React, {useEffect, useState} from 'react';
import {MockType, useStore} from '../lib/store';
import mock from '../mock.json';
import {InfoIcon} from '../svg';
import DoctorItem from './DoctorItem';

interface DoctorsListProps {}

const DoctorsList: React.FC<DoctorsListProps> = ({}) => {
  const {mock} = useStore();
  const [doctors, setDoctors] = useState<MockType[] | null>(null);

  useEffect(() => {
    setDoctors(mock);
  }, []);

  return (
    <>
      <div>
        <h2>Root Canal doctors in New York, NY</h2>
        <div style={{display: 'flex', alignItems: 'center', marginTop: 16}}>
          <InfoIcon />
          <p>The average price of a procedure in New York is $300</p>
        </div>

        <div style={{marginTop: '30px'}}>
          {doctors?.map(el => (
            <DoctorItem key={el.id} data={el} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DoctorsList;
