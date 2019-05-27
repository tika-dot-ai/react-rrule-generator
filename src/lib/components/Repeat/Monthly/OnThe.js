import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Radio, Form } from 'semantic-ui-react';
import classnames from 'classnames';

import { DAYS } from '../../../constants/index';
import translateLabel from '../../../utils/translateLabel';

const RepeatMonthlyOnThe = ({
  mode,
  onThe,
  hasMoreModes,
  handleChange,
  translations,
}) => {
  const isActive = mode === 'on the';

  return (
    <Form.Group className={classnames({ 'opacity-50': !isActive })}>
      <Form.Field
        control={() => hasMoreModes && (
          <Radio
            label={translateLabel(translations, 'repeat.monthly.on_the')}
            name="repeat.monthly.mode"
            aria-label="Repeat monthly on the"
            value="on the"
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
            value={onThe.which}
            onChange={(e, { value, name }) => {
              const target = { value, name };
              handleChange({ target });
            }}
            options={[
              { value: 'First', text: translateLabel(translations, 'numerals.first') },
              { value: 'Second', text: translateLabel(translations, 'numerals.second') },
              { value: 'Third', text: translateLabel(translations, 'numerals.third') },
              { value: 'Fourth', text: translateLabel(translations, 'numerals.fourth') },
              { value: 'Last', text: translateLabel(translations, 'numerals.last') },
            ]}
            selection
            compact
            disabled={!isActive}
            name="repeat.monthly.onThe.which"
            aria-label="Repeat monthly on the which"
          />
        )}
      />

      <Form.Field
        control={() => (
          <Dropdown
            value={onThe.day}
            onChange={(e, { value, name }) => {
              const target = { value, name };
              handleChange({ target });
            }}
            options={DAYS.map(day => ({
              value: day,
              text: translateLabel(translations, `days.${day.toLowerCase()}`),
            }))}
            selection
            compact
            disabled={!isActive}
            name="repeat.monthly.onThe.which"
            aria-label="Repeat monthly on the which"
          />
        )}
      />
    </Form.Group>
  );
};

RepeatMonthlyOnThe.propTypes = {
  mode: PropTypes.oneOf(['on', 'on the']).isRequired,
  onThe: PropTypes.shape({
    which: PropTypes.oneOf(['First', 'Second', 'Third', 'Fourth', 'Last']).isRequired,
    day: PropTypes.oneOf(DAYS).isRequired,
  }).isRequired,
  hasMoreModes: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default RepeatMonthlyOnThe;
