import React from 'react';
import {MockType} from './DoctorsList';
import Image from 'next/image';
import dicaprio from '../public/dicaprio.png';
import whoisit from '../public/whoisit.png';
import matiew from '../public/matiew.png';
import clunie from '../public/clunie.png';

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
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="16" fill="#F5E585" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M22.0077 12.7636C21.5903 12.5823 21.1063 12.6609 20.7737 12.9676L19.333 14.3009V13.3329C19.333 12.2303 18.4363 11.3329 17.333 11.3329H11.333C10.2303 11.3329 9.33301 12.2303 9.33301 13.3329V18.6663C9.33301 19.7696 10.2303 20.6663 11.333 20.6663H17.333C18.4363 20.6663 19.333 19.7696 19.333 18.6663V17.6989L20.7737 19.0316C20.9877 19.2296 21.2643 19.3329 21.5463 19.3329C21.7017 19.3329 21.8583 19.3016 22.0077 19.2363C22.4137 19.0589 22.6663 18.6796 22.6663 18.2469V13.7529C22.6663 13.3203 22.4137 12.9409 22.0077 12.7636Z"
                fill="#244D51"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="doctor__content">
        <div className="doc_A" style={{alignItems: 'flex-start'}}>
          <h3>{data.name}</h3>
        </div>
        <div className="doc_B" style={{alignItems: 'flex-end'}}>
          <p>
            Dentist<span className="dot">·</span>
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
        <div className="doctor_heart" style={{cursor: 'pointer'}}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.21968 6C6.35568 6 5.54568 6.334 4.93968 6.941C3.68168 8.201 3.68168 10.252 4.94068 11.514L11.9997 18.585L19.0597 11.514C20.3187 10.252 20.3187 8.201 19.0597 6.941C17.8477 5.726 15.7117 5.728 14.4997 6.941L12.7077 8.736C12.3317 9.113 11.6677 9.113 11.2917 8.736L9.49968 6.94C8.89368 6.334 8.08468 6 7.21968 6ZM11.9997 21C11.7347 21 11.4797 20.895 11.2927 20.706L3.52468 12.926C1.48868 10.886 1.48868 7.567 3.52468 5.527C4.50868 4.543 5.82068 4 7.21968 4C8.61868 4 9.93168 4.543 10.9147 5.527L11.9997 6.614L13.0847 5.528C14.0687 4.543 15.3807 4 16.7807 4C18.1787 4 19.4917 4.543 20.4747 5.527C22.5117 7.567 22.5117 10.886 20.4757 12.926L12.7077 20.707C12.5197 20.895 12.2657 21 11.9997 21Z"
              fill="#668386"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DoctorItem;
