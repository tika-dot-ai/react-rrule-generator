import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form } from 'semantic-ui-react';

import RepeatYearly from './Yearly/index';
import RepeatMonthly from './Monthly/index';
import RepeatWeekly from './Weekly/index';
import RepeatDaily from './Daily/index';
import RepeatHourly from './Hourly/index';
import translateLabel from '../../utils/translateLabel';

const Repeat = ({
  id,
  repeat: {
    frequency,
    yearly,
    monthly,
    weekly,
    daily,
    hourly,
    options,
  },
  handleChange,
  translations,
}) => {
  const isOptionAvailable = option => !options.frequency || options.frequency.indexOf(option) !== -1;
  const isOptionSelected = option => frequency === option;

  const repeatOptions = [
    isOptionAvailable('Yearly') && { text: translateLabel(translations, 'repeat.yearly.label'), value: 'Yearly' },
    isOptionAvailable('Monthly') && { text: translateLabel(translations, 'repeat.monthly.label'), value: 'Monthly' },
    isOptionAvailable('Weekly') && { text: translateLabel(translations, 'repeat.weekly.label'), value: 'Weekly' },
    isOptionAvailable('Daily') && { text: translateLabel(translations, 'repeat.daily.label'), value: 'Daily' },
    isOptionAvailable('Hourly') && { text: translateLabel(translations, 'repeat.hourly.label'), value: 'Hourly' },
  ].filter(Boolean);

  return (
    <Form>
      <Form.Field
        inline
        label={translateLabel(translations, 'repeat.label')}
        control={() => (
          <Dropdown
            name="repeat.frequency"
            value={frequency}
            onChange={(e, { value, name }) => handleChange({ target: { value, name } })}
            selection
            options={repeatOptions}
          />
        )}
      />

      {
        isOptionSelected('Yearly') &&
        <RepeatYearly
          id={`${id}-yearly`}
          yearly={yearly}
          handleChange={handleChange}
          translations={translations}
        />
      }
      {
        isOptionSelected('Monthly') &&
        <RepeatMonthly
          id={`${id}-monthly`}
          monthly={monthly}
          handleChange={handleChange}
          translations={translations}
        />
      }
      {
        isOptionSelected('Weekly') &&
        <RepeatWeekly
          id={`${id}-weekly`}
          weekly={weekly}
          handleChange={handleChange}
          translations={translations}
        />
      }
      {
        isOptionSelected('Daily') &&
        <RepeatDaily
          id={`${id}-daily`}
          daily={daily}
          handleChange={handleChange}
          translations={translations}
        />
      }
      {
        isOptionSelected('Hourly') &&
        <RepeatHourly
          id={`${id}-hourly`}
          hourly={hourly}
          handleChange={handleChange}
          translations={translations}
        />
      }

    </Form>
  );
};

Repeat.propTypes = {
  id: PropTypes.string.isRequired,
  repeat: PropTypes.shape({
    frequency: PropTypes.oneOf(['Yearly', 'Monthly', 'Weekly', 'Daily', 'Hourly']).isRequired,
    yearly: PropTypes.object.isRequired,
    monthly: PropTypes.object.isRequired,
    weekly: PropTypes.object.isRequired,
    daily: PropTypes.object.isRequired,
    hourly: PropTypes.object.isRequired,
    options: PropTypes.shape({
      frequency: PropTypes.arrayOf(PropTypes.oneOf(['Yearly', 'Monthly', 'Weekly', 'Daily', 'Hourly'])),
      yearly: PropTypes.oneOf(['on', 'on the']),
      monthly: PropTypes.oneOf(['on', 'on the']),
    }).isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Repeat;
