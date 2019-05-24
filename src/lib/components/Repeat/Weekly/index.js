import React from 'react';
import PropTypes from 'prop-types';
import { toPairs } from 'lodash';
import { Input, Button } from 'semantic-ui-react';
import numericalFieldHandler from '../../../utils/numericalFieldHandler';
import translateLabel from '../../../utils/translateLabel';

const RepeatWeekly = ({
  id,
  weekly: {
    interval,
    days,
    options,
  },
  handleChange,
  translations
}) => {
  let daysArray = toPairs(days);
  if (options.weekStartsOnSunday) {
    daysArray = daysArray.slice(-1).concat(daysArray.slice(0, -1));
  }

  return (
    <div className="px-3">
      <div className="form-group row d-flex align-items-sm-center">
        <div className="col-sm-1 offset-sm-2">
          {translateLabel(translations, 'repeat.weekly.every')}
        </div>
        <div className="col-sm-3">
          {
            // <input
            //   id={`${id}-interval`}
            //   name="repeat.weekly.interval"
            //   aria-label="Repeat weekly interval"
            //   className="form-control"
            //   value={interval}
            //   onChange={numericalFieldHandler(handleChange)}
            // />
          }
            <Input
              style={{ maxWidth: 100 }}
              name="repeat.weekly.interval"
              aria-label="Repeat weekly interval"
              value={interval}
              onChange={numericalFieldHandler(handleChange)}
            />
        </div>
        <div className="col-sm-1">
          {translateLabel(translations, 'repeat.weekly.weeks')}
        </div>
      </div>

      <div className="form-group row">
        {
          // <div className="btn-group btn-group-toggle offset-sm-2">
          //   {daysArray.map(([dayName, isDayActive]) => (
          //     <label
          //       htmlFor={`${id}-${dayName}`}
          //       key={dayName}
          //       className={`btn btn-primary ${isDayActive ? 'active' : ''}`}
          //     >
          //       <input
          //         type="checkbox"
          //         id={`${id}-${dayName}`}
          //         name={`repeat.weekly.days[${dayName}]`}
          //         className="form-control"
          //         checked={isDayActive}
          //         onChange={(event) => {
          //           const editedEvent = {
          //             ...event,
          //             target: {
          //               ...event.target,
          //               value: !isDayActive,
          //               name: event.target.name,
          //             },
          //           };

          //           handleChange(editedEvent);
          //         }}
          //       />
          //       {translateLabel(translations, `days_short.${dayName.toLowerCase()}`)}
          //     </label>))
          //   }
          // </div>
        }

        <Button.Group>
          {
            daysArray.map(([dayName, isDayActive]) => (
              <Button
                active={isDayActive}
                name={`repeat.weekly.days[${dayName}]`}
                onClick={() => {
                  const editedEvent = {
                    target: {
                      value: !isDayActive,
                      name: `repeat.weekly.days[${dayName}]`,
                    },
                  };

                  handleChange(editedEvent);
                }}
              >
                {translateLabel(translations, `days_short.${dayName.toLowerCase()}`)}
              </Button>
            ))
          }
        </Button.Group>
      </div>
    </div>
  );
};

RepeatWeekly.propTypes = {
  id: PropTypes.string.isRequired,
  weekly: PropTypes.shape({
    interval: PropTypes.number.isRequired,
    days: PropTypes.shape({
      mon: PropTypes.bool.isRequired,
      tue: PropTypes.bool.isRequired,
      wed: PropTypes.bool.isRequired,
      thu: PropTypes.bool.isRequired,
      fri: PropTypes.bool.isRequired,
      sat: PropTypes.bool.isRequired,
      sun: PropTypes.bool.isRequired,
    }).isRequired,
    options: PropTypes.shape({
      weekStartsOnSunday: PropTypes.bool,
    }).isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default RepeatWeekly;
