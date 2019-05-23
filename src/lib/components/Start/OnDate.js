import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateTime from 'react-datetime';
import 'moment/min/locales';

import DayPicker from 'react-day-picker';
import { Popup, Button } from 'semantic-ui-react';

import { DATE_TIME_FORMAT } from '../../constants/index';
import translateLabel from '../../utils/translateLabel';

const StartOnDate = ({
  id,
  onDate: {
    date,
    options,
  },
  handleChange,
  translations
}) => {
  const [selectedDay, setSelectedDay] = React.useState(moment(date).toDate());

  // const CustomCalendar = options.calendarComponent;
  const locale = options.weekStartsOnSunday ? 'en-ca' : 'en-gb';
  // const calendarAttributes = {
  //   'aria-label': translateLabel(translations, 'start.tooltip'),
  //   value: date,
  //   dateFormat: DATE_TIME_FORMAT,
  //   locale,
  //   readOnly: true,
  // };
  const dayPickerAttributes = {
    'aria-label': translateLabel(translations, 'start.tooltip'),
    locale,
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
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
  
  // return (
  //   <div className="col-6 col-sm-3">
  //     {
  //       CustomCalendar
  //         ? <CustomCalendar
  //           key={`${id}-calendar`}
  //           {...calendarAttributes}
  //           onChange={(event) => {
  //             const editedEvent = {
  //               target: {
  //                 value: event.target.value,
  //                 name: 'start.onDate.date',
  //               },
  //             };

  //             handleChange(editedEvent);
  //           }}
  //         />
  //         : <DateTime
  //           {...calendarAttributes}
  //           inputProps={
  //             {
  //               id: `${id}-datetime`,
  //               name: 'start.onDate.date',
  //               readOnly: true,
  //             }
  //           }
  //           locale={translateLabel(translations, 'locale')}
  //           timeFormat={false}
  //           viewMode="days"
  //           closeOnSelect
  //           closeOnTab
  //           required
  //           onChange={(inputDate) => {
  //             const editedEvent = {
  //               target: {
  //                 value: moment(inputDate).format(DATE_TIME_FORMAT),
  //                 name: 'start.onDate.date',
  //               },
  //             };

  //             handleChange(editedEvent);
  //           }}
  //         />
  //     }
  //   </div>
  // );
};

StartOnDate.propTypes = {
  id: PropTypes.string.isRequired,
  onDate: PropTypes.shape({
    date: PropTypes.string.isRequired,
    options: PropTypes.shape({
      weekStartsOnSunday: PropTypes.bool,
      calendarComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    }).isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default StartOnDate;
