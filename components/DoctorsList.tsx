import React, {useEffect, useState} from 'react';
import mock from '../mock.json';
import {InfoIcon} from '../svg';
import DoctorItem from './DoctorItem';

interface DoctorsListProps {}

export type MockType = {
  id: number;
  name: string;
  speciality: string;
  experience: number;
  gender: 'Male' | 'Female';
  reviewsCount: number;
  acceptNew: boolean;
  address: string;
  insurances: string;
  telehealth: boolean;
  telehealth_available: string;
  offline_available: string;
  price: number;
};

const DoctorsList: React.FC<DoctorsListProps> = ({}) => {
  const [doctors, setDoctors] = useState<MockType[] | null>(null);

  useEffect(() => {
    setDoctors(JSON.parse('' + JSON.stringify(mock.data.items)));
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
