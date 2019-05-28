import React from 'react';
import PropTypes from 'prop-types';
import toPairs from 'lodash.topairs';
import { Input, Button, Form } from 'semantic-ui-react';
import numericalFieldHandler from '../../../utils/numericalFieldHandler';
import translateLabel from '../../../utils/translateLabel';

const RepeatWeekly = ({
  weekly: {
    interval,
    days,
    options,
  },
  handleChange,
  translations,
}) => {
  let daysArray = toPairs(days);
  if (options.weekStartsOnSunday) {
    daysArray = daysArray.slice(-1).concat(daysArray.slice(0, -1));
  }

  return (
    <div>
      <Form.Field inline>
        <label>
          {translateLabel(translations, 'repeat.weekly.every')}
        </label>
        <Input
          style={{ maxWidth: 100, marginRight: '1em' }}
          name="repeat.weekly.interval"
          aria-label="Repeat weekly interval"
          value={interval}
          onChange={numericalFieldHandler(handleChange)}
        />
        {translateLabel(translations, 'repeat.weekly.weeks')}
      </Form.Field>

      <Form.Field
        control={() => (
          <Button.Group>
            {
              daysArray.map(([dayName, isDayActive]) => (
                <Button
                  key={dayName}
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
        )}
      />
    </div>
  );
};

RepeatWeekly.propTypes = {
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
