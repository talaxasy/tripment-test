import React from 'react';
import Image from 'next/image';
import dicaprio from '../public/dicaprio.png';
import whoisit from '../public/whoisit.png';
import matiew from '../public/matiew.png';
import clunie from '../public/clunie.png';
import {HeartIcon, TelehealthIcon} from '../svg';
import {MockType} from '../lib/store';

interface DoctorItemProps {
  data: MockType;
}

const DoctorItem: React.FC<DoctorItemProps> = ({data}) => {
  const rand = Math.floor(Math.random() * 4);
  return (
    <div className="doctor_item">
      <div style={{position: 'relative', zIndex: 1}}>
        <div className="doctor__img">
          <Image
            src={rand === 0 ? dicaprio : rand === 1 ? whoisit : rand === 2 ? matiew : clunie}
            placeholder="blur"
            alt="Picture of the author"
            width={250}
            height={250}
          />
        </div>

        {data.telehealth && (
          <div className="doctor_telehealth">
            <TelehealthIcon width={32} height={32} />
          </div>
        )}
      </div>

      <div className="doctor__content">
        <div className="doc_A" style={{alignItems: 'flex-start'}}>
          <h3>{data.name}</h3>
        </div>
        <div className="doc_B" style={{alignItems: 'flex-end'}}>
          <p>
            {data.speciality}
            <span className="dot">·</span>
            {data.experience} Years Experience<span className="dot">·</span>
            <span style={{color: '#D97767'}}>{data.reviewsCount} Reviews</span>
          </p>
        </div>
        <div className="doc_C" style={{alignItems: 'flex-end', color: '#668386'}}>
          <p>
            {data.telehealth && (
              <>
                Video visit<span className="dot">·</span>
              </>
            )}
            {data.address}
          </p>
        </div>
      </div>

      <div className="doctor_additional">
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
          <span style={{display: 'block'}}>
            <p>avg. price</p>
          </span>
          <span className="doctor_price">${data.price}</span>
        </div>
        <HeartIcon />
      </div>
    </div>
  );
};

export default DoctorItem;
