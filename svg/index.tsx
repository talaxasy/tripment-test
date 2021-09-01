import React from 'react';

export const ArrowDownIcon: React.FC = ({}) => {
  return (
    <div style={{margin: '0 5px', display: 'inline'}}>
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L5 3.58579L8.29289 0.292893C8.68342 -0.0976311 9.31658 -0.0976311 9.70711 0.292893C10.0976 0.683417 10.0976 1.31658 9.70711 1.70711L5.70711 5.70711C5.31658 6.09763 4.68342 6.09763 4.29289 5.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
          fill="#668386"
        />
      </svg>
    </div>
  );
};

export const HeartIcon: React.FC = ({}) => {
  return (
    <div className="doctor_heart" style={{cursor: 'pointer'}}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.21968 6C6.35568 6 5.54568 6.334 4.93968 6.941C3.68168 8.201 3.68168 10.252 4.94068 11.514L11.9997 18.585L19.0597 11.514C20.3187 10.252 20.3187 8.201 19.0597 6.941C17.8477 5.726 15.7117 5.728 14.4997 6.941L12.7077 8.736C12.3317 9.113 11.6677 9.113 11.2917 8.736L9.49968 6.94C8.89368 6.334 8.08468 6 7.21968 6ZM11.9997 21C11.7347 21 11.4797 20.895 11.2927 20.706L3.52468 12.926C1.48868 10.886 1.48868 7.567 3.52468 5.527C4.50868 4.543 5.82068 4 7.21968 4C8.61868 4 9.93168 4.543 10.9147 5.527L11.9997 6.614L13.0847 5.528C14.0687 4.543 15.3807 4 16.7807 4C18.1787 4 19.4917 4.543 20.4747 5.527C22.5117 7.567 22.5117 10.886 20.4757 12.926L12.7077 20.707C12.5197 20.895 12.2657 21 11.9997 21Z"
          fill="#668386"
        />
      </svg>
    </div>
  );
};

export const TelehealthIcon: React.FC = ({}) => {
  return (
    <div>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="16" fill="#F5E585" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.0077 12.7636C21.5903 12.5823 21.1063 12.6609 20.7737 12.9676L19.333 14.3009V13.3329C19.333 12.2303 18.4363 11.3329 17.333 11.3329H11.333C10.2303 11.3329 9.33301 12.2303 9.33301 13.3329V18.6663C9.33301 19.7696 10.2303 20.6663 11.333 20.6663H17.333C18.4363 20.6663 19.333 19.7696 19.333 18.6663V17.6989L20.7737 19.0316C20.9877 19.2296 21.2643 19.3329 21.5463 19.3329C21.7017 19.3329 21.8583 19.3016 22.0077 19.2363C22.4137 19.0589 22.6663 18.6796 22.6663 18.2469V13.7529C22.6663 13.3203 22.4137 12.9409 22.0077 12.7636Z"
          fill="#244D51"
        />
      </svg>
    </div>
  );
};

export const InfoIcon: React.FC = ({}) => {
  return (
    <div style={{display: 'inline-flex'}}>
      <svg
        style={{marginRight: 6}}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 8C11 7.448 11.448 7 12 7C12.552 7 13 7.448 13 8C13 8.552 12.552 9 12 9C11.448 9 11 8.552 11 8ZM11 11C11 10.448 11.448 10 12 10C12.552 10 13 10.448 13 11V16C13 16.552 12.552 17 12 17C11.448 17 11 16.552 11 16V11ZM12 20C7.58899 20 3.99999 16.411 3.99999 12C3.99999 7.589 7.58899 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20ZM12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.522 22 22 17.523 22 12C22 6.477 17.522 2 12 2Z"
          fill="#244D51"
        />
      </svg>
    </div>
  );
};

export const SortIcon: React.FC = ({}) => {
  return (
    <div style={{display: 'inline-flex'}}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.66712 17.0005V8.33379L10.4671 9.40046C10.5196 9.47049 10.5855 9.5295 10.6608 9.57411C10.7361 9.61871 10.8195 9.64804 10.9062 9.66042C10.9928 9.6728 11.0811 9.66799 11.1659 9.64626C11.2507 9.62454 11.3304 9.58632 11.4005 9.53379C11.4832 9.47169 11.5505 9.39117 11.5967 9.2986C11.643 9.20603 11.6671 9.10395 11.6671 9.00046C11.6671 8.85621 11.6203 8.71585 11.5338 8.60046L9.53378 5.93379C9.47157 5.85225 9.39138 5.78617 9.29945 5.74068C9.20753 5.69519 9.10635 5.67153 9.00378 5.67153C8.90122 5.67153 8.80004 5.69519 8.70812 5.74068C8.61619 5.78617 8.536 5.85225 8.47378 5.93379L6.47378 8.50712C6.36505 8.6468 6.31625 8.82396 6.33813 8.99962C6.36001 9.17528 6.45077 9.33505 6.59045 9.44379C6.73013 9.55253 6.90729 9.60132 7.08295 9.57945C7.25861 9.55757 7.41838 9.4668 7.52712 9.32712L8.33379 8.28046V17.0005C8.33379 17.1773 8.40402 17.3468 8.52905 17.4719C8.65407 17.5969 8.82364 17.6671 9.00045 17.6671C9.17726 17.6671 9.34683 17.5969 9.47186 17.4719C9.59688 17.3468 9.66712 17.1773 9.66712 17.0005Z"
          fill="#1C383A"
        />
        <path
          d="M14.3338 6.33378V15.0004L13.5338 13.9338C13.4278 13.7923 13.2698 13.6988 13.0948 13.6738C12.9198 13.6488 12.742 13.6944 12.6005 13.8004C12.4591 13.9065 12.3656 14.0645 12.3405 14.2395C12.3155 14.4145 12.3611 14.5923 12.4672 14.7338L14.4672 17.4004C14.5294 17.482 14.6096 17.5481 14.7015 17.5936C14.7934 17.639 14.8946 17.6627 14.9972 17.6627C15.0997 17.6627 15.2009 17.639 15.2929 17.5936C15.3848 17.5481 15.465 17.482 15.5272 17.4004L17.5272 14.8271C17.6175 14.7107 17.6667 14.5677 17.6672 14.4204C17.6669 14.3186 17.6434 14.2182 17.5983 14.1269C17.5532 14.0356 17.4879 13.9559 17.4072 13.8938C17.2682 13.7855 17.092 13.7367 16.9171 13.7579C16.7423 13.7791 16.5829 13.8687 16.4738 14.0071L15.6672 15.0538V6.33378C15.6672 6.15697 15.5969 5.9874 15.4719 5.86238C15.3469 5.73735 15.1773 5.66711 15.0005 5.66711C14.8237 5.66711 14.6541 5.73735 14.5291 5.86238C14.4041 5.9874 14.3338 6.15697 14.3338 6.33378Z"
          fill="#1C383A"
        />
      </svg>
    </div>
  );
};
