import moment from 'moment';
import isEmpty from 'lodash.isempty';
import uniqueId from 'lodash.uniqueid';

import computeRRuleToString from './computeRRule/toString/computeRRule';
import { DATE_TIME_FORMAT } from '../constants/index';

const configureState = (config = {}, calendarComponent, id) => {
  const { relativeDate } = config;
  const configureFrequency = () => (config.repeat ? config.repeat[0] : 'Yearly');
  const configureYearly = () => (config.yearly || 'on');
  const configureMonthly = () => (config.monthly || (relativeDate ? 'on the' : 'on'));
  const configureEnd = () => (config.end ? config.end[0] : 'Never');
  const configureHideStart = () => (typeof config.hideStart === 'undefined' ? true : config.hideStart);
  const uniqueRruleId = isEmpty(id) ? uniqueId('rrule-') : id;

  const month = relativeDate ? moment(relativeDate).format('MMM') : undefined;
  const dayNumber = relativeDate ? Number(moment(relativeDate).format('D')) : undefined;
  const day = relativeDate ? moment(relativeDate).format('dddd') : undefined;
  const weekday = relativeDate ? moment(relativeDate).isoWeekday() : undefined;
  const date = relativeDate ? moment(relativeDate).date() : undefined;
  const weekNumber = date ? Math.ceil(date / 7) : undefined;
  const weekNumberStringMap = {
    1: 'First',
    2: 'Second',
    3: 'Third',
    4: 'Fourth',
    5: 'Fifth',
  };
  const which = weekNumber ? weekNumberStringMap[weekNumber] : undefined;

  const data = {
    start: {
      onDate: {
        date: moment().format(DATE_TIME_FORMAT),
        options: {
          weekStartsOnSunday: config.weekStartsOnSunday,
          calendarComponent,
        },
      },
    },
    repeat: {
      frequency: configureFrequency(),
      yearly: {
        mode: configureYearly(),
        on: {
          month: month || 'Jan',
          day: dayNumber || 1,
        },
        onThe: {
          month: month || 'Jan',
          day: day || 'Monday',
          which: which || 'First',
        },
        options: {
          modes: config.yearly,
        },
      },
      monthly: {
        mode: configureMonthly(),
        interval: 1,
        on: {
          day: dayNumber || 1,
        },
        onThe: {
          day: day || 'Monday',
          which: which || 'First',
        },
        options: {
          modes: config.monthly,
        },
      },
      weekly: {
        interval: 1,
        days: {
          mon: false,
          tue: false,
          wed: false,
          thu: false,
          fri: false,
          sat: false,
          sun: false,
        },
        options: {
          weekStartsOnSunday: config.weekStartsOnSunday,
        },
      },
      daily: {
        interval: 1,
      },
      hourly: {
        interval: 1,
      },
      options: {
        frequency: config.repeat,
      },
    },
    end: {
      mode: configureEnd(),
      after: 1,
      onDate: {
        date: moment().format(DATE_TIME_FORMAT),
        options: {
          weekStartsOnSunday: config.weekStartsOnSunday,
          calendarComponent,
        },
      },
      options: {
        modes: config.end,
      },
    },
    options: {
      hideStart: configureHideStart(),
      hideEnd: config.hideEnd,
      hideError: config.hideError,
      weekStartsOnSunday: config.weekStartsOnSunday,
    },
    error: null,
  };

  return {
    id: uniqueRruleId,
    data,
    rrule: computeRRuleToString(data),
  };
};

export default configureState;
