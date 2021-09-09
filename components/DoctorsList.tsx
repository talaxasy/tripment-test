import React, {useEffect, useState} from 'react';
import {MockType, useStore} from '../lib/store';
import mock from '../mock.json';
import {InfoIcon} from '../svg';
import DoctorItem from './DoctorItem';

interface DoctorsListProps {}

const DoctorsList: React.FC<DoctorsListProps> = ({}) => {
  const {mock, searchParams} = useStore();
  const [doctors, setDoctors] = useState<MockType[] | null>(null);
  const [list, setList] = useState<null>(null);

  useEffect(() => {
    setDoctors(mock);
  }, []);

  useEffect(() => {}, [searchParams]);

  return (
    <>
      <div>
        <h2>Root Canal doctors in New York, NY</h2>
        <div style={{display: 'flex', alignItems: 'center', marginTop: 16}}>
          <InfoIcon />
          <p>The average price of a procedure in New York is $300</p>
        </div>

        <div style={{marginTop: '30px'}}>
          {list}
          {doctors?.map(doc => {
            if (
              searchParams.avalibility.length ||
              searchParams.insurance.length ||
              searchParams.speciality.length
            ) {
              let doctor: any = null;
              (searchParams.speciality as string[]).forEach(spec => {
                if (spec === doc.speciality) {
                  doctor = <DoctorItem key={doc.id} data={doc} />;
                }
              });
              return doctor;
            }

            return <DoctorItem key={doc.id} data={doc} />;
          })}
          <pre></pre>
        </div>
      </div>
    </>
  );
};

export default DoctorsList;
