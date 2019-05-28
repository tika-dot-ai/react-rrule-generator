import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'semantic-ui-react';
import numericalFieldHandler from '../../../utils/numericalFieldHandler';
import translateLabel from '../../../utils/translateLabel';

const RepeatHourly = ({
  hourly: {
    interval,
  },
  handleChange,
  translations,
}) => (
  <Form.Field inline>
    <label>
      {translateLabel(translations, 'repeat.hourly.every')}
    </label>
    <Input
      style={{ maxWidth: 100, marginRight: '1em' }}
      name="repeat.hourly.interval"
      aria-label="Repeat hourly interval"
      value={interval}
      onChange={numericalFieldHandler(handleChange)}
    />
    {translateLabel(translations, 'repeat.hourly.hours')}
  </Form.Field>
);

RepeatHourly.propTypes = {
  hourly: PropTypes.shape({
    interval: PropTypes.number.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default RepeatHourly;
