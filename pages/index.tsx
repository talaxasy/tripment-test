import DoctorsList from '../components/DoctorsList';
import Filters from '../components/Filters';

export default function Index() {
  return (
    <>
      <div className="main">
        <Filters />
        <DoctorsList />
      </div>
    </>
  );
}
