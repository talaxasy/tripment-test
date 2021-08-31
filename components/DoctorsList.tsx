import React, {useEffect, useState} from 'react';
import mock from '../mock.json';

interface DoctorsListProps {}

const DoctorsList: React.FC<DoctorsListProps> = ({}) => {
  const [doctors, setDoctors] = useState({});
  console.log(mock);

  useEffect(() => {}, []);
  return (
    <>
      <div>
        <h1>Root Canal doctors in New York, NY</h1>
        <p>The average price of a procedure in New York is $300</p>
        <pre style={{userSelect: 'none', position: 'fixed', top: 0, right: 0, fontSize: '12px'}}>
          {JSON.stringify(mock, null, 2)}
          {/* {} */}
        </pre>
      </div>
    </>
  );
};

export default DoctorsList;
