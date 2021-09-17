import lodash from 'lodash';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {MockType, useStore} from '../lib/store';
import {InfoIcon} from '../svg';
import calculateAvalibility from '../utils/calculateAvalibility';
import DoctorItem from './DoctorItem';

interface DoctorsListProps {}

export type avalType = Record<'today' | 'nxt3d' | 'nxt2w' | 'tele' | 'accnew' | 'online', number[]>;

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

  useEffect(() => {
    setDoctors(lodash.sortBy(mock, el => el.experience).reverse());
  }, []);

  useEffect(() => {
    setList(doctors?.map(el => <DoctorItem data={el} key={el.id} />));
  }, [doctors]);

  useEffect(() => {
    if (
      !searchParams.avalibility.length &&
      !searchParams.insurance.length &&
      !searchParams.speciality.length
    ) {
      if (searchParams.sort === 'Next available' && doctors?.length)
        setDoctors(lodash.sortBy(doctors, el => moment(el.offline_available)).reverse());
      if (searchParams.sort === 'Most Experienced' && doctors?.length)
        setDoctors(lodash.sortBy(doctors, el => el.experience).reverse());
      if (searchParams.sort === 'Most Expensive' && doctors?.length)
        setDoctors(lodash.sortBy(doctors, el => el.price).reverse());
    }
  }, [searchParams.sort]);

  useEffect(() => {
    filterSearch();
  }, [searchParams]);

  const filterSearch = () => {
    let SPECIALITY_AND_INSURANCE: number[] = [];
    doctors?.forEach(doc => {
      if (searchParams.speciality.length && searchParams.insurance.length) {
        for (let i = 0; i < searchParams.speciality.length; i++) {
          for (let j = 0; j < searchParams.insurance.length; j++) {
            if (
              doc.speciality === searchParams.speciality[i] &&
              doc.insurances === searchParams.insurance[j]
            ) {
              SPECIALITY_AND_INSURANCE.push(doc.id);
            }
          }
        }
      }

      if (searchParams.speciality.length && !searchParams.insurance.length) {
        searchParams.speciality.forEach(el => {
          if (doc.speciality === el) {
            SPECIALITY_AND_INSURANCE.push(doc.id);
          }
        });
      }

      if (!searchParams.speciality.length && searchParams.insurance.length) {
        searchParams.insurance.forEach(el => {
          if (doc.insurances === el) {
            SPECIALITY_AND_INSURANCE.push(doc.id);
          }
        });
      }
    });

    SPECIALITY_AND_INSURANCE = lodash.sortedUniq(SPECIALITY_AND_INSURANCE);

    let SPECIALITY_AND_INSURANCE_DOCS = doctors?.filter(doc =>
      SPECIALITY_AND_INSURANCE.find(id => id === doc.id),
    );

    let avalibilityArrs: avalType = {
      today: [],
      nxt3d: [],
      nxt2w: [],
      tele: [],
      accnew: [],
      online: [],
    };

    if (searchParams.avalibility.length && !SPECIALITY_AND_INSURANCE.length) {
      doctors?.forEach(doc => {
        searchParams.avalibility.forEach(aval => {
          avalibilityArrs = calculateAvalibility(doc, aval, avalibilityArrs);
        });
      });
    } else {
      SPECIALITY_AND_INSURANCE_DOCS?.forEach(doc => {
        searchParams.avalibility.forEach(aval => {
          avalibilityArrs = calculateAvalibility(doc, aval, avalibilityArrs);
        });
      });
    }

    let FINAL_STEP_DOCTORS: MockType[] | undefined = [];

    if (
      !avalibilityArrs.today.length &&
      !avalibilityArrs.tele.length &&
      !avalibilityArrs.online.length &&
      !avalibilityArrs.accnew.length &&
      !avalibilityArrs.nxt2w.length &&
      !avalibilityArrs.nxt3d.length &&
      searchParams.avalibility.length
    ) {
      setList([
        <div key={1} className="nothing_found">
          Nothing found
        </div>,
      ]);
      return;
    } else if (!searchParams.avalibility.length) {
      FINAL_STEP_DOCTORS = SPECIALITY_AND_INSURANCE_DOCS;
    } else {
      let clearedArr: Array<number[]> = [];
      if (avalibilityArrs.today.length) clearedArr.push(lodash.sortedUniq(avalibilityArrs.today));
      if (avalibilityArrs.accnew.length) clearedArr.push(lodash.sortedUniq(avalibilityArrs.accnew));
      if (avalibilityArrs.nxt2w.length) clearedArr.push(lodash.sortedUniq(avalibilityArrs.nxt2w));
      if (avalibilityArrs.nxt3d.length) clearedArr.push(lodash.sortedUniq(avalibilityArrs.nxt3d));
      if (avalibilityArrs.online.length) clearedArr.push(lodash.sortedUniq(avalibilityArrs.online));
      if (avalibilityArrs.tele.length) clearedArr.push(lodash.sortedUniq(avalibilityArrs.tele));

      FINAL_STEP_DOCTORS = doctors?.filter(doc =>
        lodash.intersection(...clearedArr).find(id => id === doc.id),
      );
    }

    console.log('FINAL_STEP_DOCTORS', FINAL_STEP_DOCTORS);

    if (
      !FINAL_STEP_DOCTORS?.length &&
      (searchParams.avalibility.length ||
        searchParams.insurance.length ||
        searchParams.speciality.length)
    ) {
      setList([
        <div key={1} className="nothing_found">
          Nothing found
        </div>,
      ]);
      return;
    }

    if (
      searchParams.avalibility.length ||
      searchParams.insurance.length ||
      searchParams.speciality.length
    ) {
      if (searchParams.sort === 'Next available') {
        setList(
          lodash
            .sortBy(FINAL_STEP_DOCTORS, el => moment(el.offline_available))
            .reverse()
            .map(doc => <DoctorItem data={doc} key={doc.id} />),
        );
      }

      if (searchParams.sort === 'Most Experienced') {
        setList(
          lodash
            .sortBy(FINAL_STEP_DOCTORS, el => el.experience)
            .reverse()
            .map(doc => <DoctorItem data={doc} key={doc.id} />),
        );
      }

      if (searchParams.sort === 'Most Expensive') {
        setList(
          lodash
            .sortBy(FINAL_STEP_DOCTORS, el => el.price)
            .reverse()
            .map(doc => <DoctorItem data={doc} key={doc.id} />),
        );
      }
    } else setList(doctors?.map(doc => <DoctorItem data={doc} key={doc.id} />));
  };

  return (
    <>
      <div>
        <h2>Root Canal doctors in New York, NY</h2>
        <div style={{display: 'flex', alignItems: 'center', marginTop: 16}}>
          <InfoIcon />
          <p>The average price of a procedure in New York is $300</p>
        </div>

        <div style={{marginTop: '30px'}}>{list ? list : 'loading...'}</div>
      </div>
    </>
  );
};

export default DoctorsList;
