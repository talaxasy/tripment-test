import moment from 'moment';
import {avalType} from '../components/DoctorsList';
import {MockType} from '../lib/store';

const calculateAvalibility = (
  doc: MockType,
  aval: {
    title: string;
    people: number[];
  },
  avalArr: avalType,
) => {
  if (aval.title === 'Today') {
    if (
      moment(doc.telehealth_available).isSameOrAfter() ||
      moment(doc.offline_available).isSameOrAfter(moment())
    ) {
      return {...avalArr, today: [...avalArr.today, doc.id]};
    }
  }

  if (aval.title === 'Next 3 days') {
    if (
      moment(doc.telehealth_available).isBetween(
        moment(),
        moment().add(3, 'days'),
        undefined,
        '[]',
      ) ||
      moment(doc.offline_available).isBetween(moment(), moment().add(3, 'days'), undefined, '[]')
    ) {
      return {...avalArr, nxt3d: [...avalArr.nxt3d, doc.id]};
    }
  }

  if (aval.title === 'Next 2 weeks') {
    if (
      moment(doc.telehealth_available).isBetween(
        moment(),
        moment().add(2, 'weeks'),
        undefined,
        '[]',
      ) ||
      moment(doc.offline_available).isBetween(moment(), moment().add(2, 'weeks'), undefined, '[]')
    ) {
      return {...avalArr, nxt2w: [...avalArr.nxt2w, doc.id]};
    }
  }

  if (aval.title === 'Telehealth') {
    if (doc.telehealth) {
      return {...avalArr, tele: [...avalArr.tele, doc.id]};
    }
  }
  if (aval.title === 'Accepts new patients') {
    if (doc.acceptNew) {
      return {...avalArr, accnew: [...avalArr.accnew, doc.id]};
    }
  }
  if (aval.title === 'Schedules online') {
    if (moment(doc.telehealth_available).isSameOrAfter(moment())) {
      return {...avalArr, nxt2w: [...avalArr.nxt2w, doc.id]};
    }
  }
  return {...avalArr};
};

export default calculateAvalibility;
