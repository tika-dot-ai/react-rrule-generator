import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Radio, Form } from 'semantic-ui-react';

import { MONTHS, DAYS } from '../../../constants/index';
import translateLabel from '../../../utils/translateLabel';

const RepeatYearlyOnThe = ({
  mode,
  onThe,
  hasMoreModes,
  handleChange,
  translations,
}) => {
  const isActive = mode === 'on the';

  return (
    <Form.Group classnames={{ 'opacity-50': !isActive }}>
      <Form.Field
        control={() => hasMoreModes && (
          <Radio
            label={translateLabel(translations, 'repeat.yearly.on_the')}
            aria-label="Repeat yearly on the"
            name="repeat.yearly.mode"
            checked={isActive}
            value="on the"
            onChange={(_, { value, name }) => {
              const target = { value, name };
              handleChange({ target });
            }}
          />
        )}
      />

      <Form.Field
        control={() => hasMoreModes && (
          <Dropdown
            selection
            compact
            disabled={!isActive}
            name="repeat.yearly.onThe.which"
            aria-label="Repeat yearly on the which"
            value={onThe.which}
            onChange={(e, { value, name }) => {
              const target = { value, name };
              handleChange({ target });
            }}
            options={[
              { value: "First", text: translateLabel(translations, 'numerals.first') },
              { value: "Second", text: translateLabel(translations, 'numerals.second') },
              { value: "Third", text: translateLabel(translations, 'numerals.third') },
              { value: "Fourth", text: translateLabel(translations, 'numerals.fourth') },
              { value: "Last", text: translateLabel(translations, 'numerals.last') },
            ].filter(Boolean)}
          />
        )}
      />

      <Form.Field
        control={() => hasMoreModes && (
          <Dropdown
            selection
            compact
            disabled={!isActive}
            name="repeat.yearly.onThe.day"
            aria-label="Repeat yearly on the day"
            value={onThe.day}
            onChange={(e, { value, name }) => {
              const target = { value, name };
              handleChange({ target });
            }}
            options={DAYS.map(day => ({
              value: day,
              text: translateLabel(translations, `days.${day.toLowerCase()}`),
            }))}
          />
        )}
      />

      <Form.Field
        inline
        label={translateLabel(translations, 'repeat.yearly.of')}
        control={() => hasMoreModes && (
          <Dropdown
            selection
            compact
            disabled={!isActive}
            name="repeat.yearly.onThe.month"
            aria-label="Repeat yearly on the month"
            value={onThe.month}
            onChange={(e, { value, name }) => {
              const target = { value, name };
              handleChange({ target });
            }}
            options={MONTHS.map(month => ({
              value: month,
              text: translateLabel(translations, `months.${month.toLowerCase()}`),
            }))}
          />
        )}
      />
    </Form.Group>
  );
};

RepeatYearlyOnThe.propTypes = {
  mode: PropTypes.oneOf(['on', 'on the']).isRequired,
  onThe: PropTypes.shape({
    which: PropTypes.oneOf(['First', 'Second', 'Third', 'Fourth', 'Last']).isRequired,
    month: PropTypes.oneOf(MONTHS).isRequired,
    day: PropTypes.oneOf(DAYS).isRequired,
  }).isRequired,
  hasMoreModes: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default RepeatYearlyOnThe;
