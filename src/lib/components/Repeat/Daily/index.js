import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'semantic-ui-react';
import numericalFieldHandler from '../../../utils/numericalFieldHandler';
import translateLabel from '../../../utils/translateLabel';

const RepeatDaily = ({
  daily: {
    interval,
  },
  handleChange,
  translations,
}) => (
  <Form.Field inline>
    <label>
      {translateLabel(translations, 'repeat.daily.every')}
    </label>
    <Input
      style={{ maxWidth: 100, marginRight: '1em' }}
      name="repeat.daily.interval"
      aria-label="Repeat daily interval"
      value={interval}
      onChange={numericalFieldHandler(handleChange)}
    />
    {translateLabel(translations, 'repeat.daily.days')}
  </Form.Field>
);

RepeatDaily.propTypes = {
  daily: PropTypes.shape({
    interval: PropTypes.number.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default RepeatDaily;
