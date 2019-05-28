import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import range from 'lodash.range';
import { Dropdown, Radio, Form } from 'semantic-ui-react';
import classnames from 'classnames';

import numericalFieldHandler from '../../../utils/numericalFieldHandler';
import { MONTHS } from '../../../constants/index';
import translateLabel from '../../../utils/translateLabel';

const RepeatYearlyOn = ({
  mode,
  on,
  hasMoreModes,
  handleChange,
  translations,
}) => {
  const daysInMonth = moment(on.month, 'MMM').daysInMonth();
  const isActive = mode === 'on';

  return (
    <Form.Group className={classnames({ 'opacity-50': !isActive })}>
      <Form.Field
        control={() => hasMoreModes && (
          <Radio
            label={translateLabel(translations, 'repeat.yearly.on')}
            name="repeat.yearly.mode"
            aria-label="Repeat yearly on"
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
            value={on.month}
            onChange={(e, { value, name }) => {
              const target = { value, name };
              handleChange({ target });
            }}
            options={MONTHS.map(month => ({
              text: translateLabel(translations, `months.${month.toLowerCase()}`),
              value: month,
            }))}
            selection
            compact
            disabled={!isActive}
            name="repeat.yearly.on.month"
            aria-label="Repeat yearly on month"
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
            options={range(0, daysInMonth).map((i) => ({ text: i + 1, value: i + 1}))}
            selection
            compact
            disabled={!isActive}
            name="repeat.yearly.on.day"
            aria-label="Repeat yearly on a day"
          />
        )}
      />
    </Form.Group>
  );
};

RepeatYearlyOn.propTypes = {
  mode: PropTypes.oneOf(['on', 'on the']).isRequired,
  on: PropTypes.shape({
    month: PropTypes.oneOf(MONTHS).isRequired,
    day: PropTypes.number.isRequired,
  }).isRequired,
  hasMoreModes: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default RepeatYearlyOn;
