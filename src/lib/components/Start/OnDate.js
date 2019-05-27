import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/min/locales';

import DayPicker from 'react-day-picker';
import { Popup, Button } from 'semantic-ui-react';

import { DATE_TIME_FORMAT } from '../../constants/index';
import translateLabel from '../../utils/translateLabel';

const StartOnDate = ({
  onDate: {
    date,
    options,
  },
  handleChange,
  translations,
}) => {
  const selectedDay = moment(date).toDate();

  const locale = options.weekStartsOnSunday ? 'en-ca' : 'en-gb';
  const dayPickerAttributes = {
    'aria-label': translateLabel(translations, 'start.tooltip'),
    locale,
  };

  const handleDayClick = (day) => {
    const editedEvent = {
      target: {
        value: moment(day).format(DATE_TIME_FORMAT),
        name: 'start.onDate.date',
      },
    };
    handleChange(editedEvent);
  };

  return (
    <Popup
      trigger={(
        <Button>
          {date}
        </Button>
      )}
      content={(
        <DayPicker
          selectedDays={selectedDay}
          onDayClick={handleDayClick}
          {...dayPickerAttributes}
          month={moment(date).toDate()}
        />
      )}
      on="click"
    />
  );
};

StartOnDate.propTypes = {
  onDate: PropTypes.shape({
    date: PropTypes.string.isRequired,
    options: PropTypes.shape({
      weekStartsOnSunday: PropTypes.bool,
    }).isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default StartOnDate;
