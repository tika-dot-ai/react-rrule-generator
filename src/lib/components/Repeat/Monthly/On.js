import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Radio, Form } from 'semantic-ui-react';
import classnames from 'classnames';
import numericalFieldHandler from '../../../utils/numericalFieldHandler';
import translateLabel from '../../../utils/translateLabel';

const RepeatMonthlyOn = ({
  mode,
  on,
  hasMoreModes,
  handleChange,
  translations,
}) => {
  const isActive = mode === 'on';

  return (
    <Form.Group className={classnames({ 'opacity-50': !isActive })}>
      <Form.Field
        control={() => hasMoreModes && (
          <Radio
            label={translateLabel(translations, 'repeat.monthly.on_day')}
            name="repeat.monthly.mode"
            aria-label="Repeat monthly on"
            value="on"
            checked={isActive}
            onChange={(_, { value, name }) => {
              const target = { value, name };
              handleChange({ target });
            }}
          />
        )}
      />

      <Form.Field
        control={() => (
          <Dropdown
            value={on.day}
            onChange={(e, { value, name }) => {
              const target = { value, name };
              numericalFieldHandler(handleChange)({ target });
            }}
            options={[...new Array(31)].map((day, i) => ({ text: i + 1, value: i + 1 }))}
            selection
            compact
            disabled={!isActive}
            name="repeat.monthly.on.day"
            aria-label="Repeat monthly on a day"
          />
        )}
      />
    </Form.Group>
  );
};

RepeatMonthlyOn.propTypes = {
  mode: PropTypes.oneOf(['on', 'on the']).isRequired,
  on: PropTypes.shape({
    day: PropTypes.number.isRequired,
  }).isRequired,
  hasMoreModes: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default RepeatMonthlyOn;
