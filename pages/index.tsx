import DoctorsList from '../components/DoctorsList';
import Filters from '../components/Filters';
import Page from '../components/page';

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
