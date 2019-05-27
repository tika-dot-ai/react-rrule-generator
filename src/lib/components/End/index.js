import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form } from 'semantic-ui-react';
import EndAfter from './After';
import EndOnDate from './OnDate';

import translateLabel from '../../utils/translateLabel';

const End = ({
  id,
  end: {
    mode,
    after,
    onDate,
    options,
  },
  handleChange,
  translations,
}) => {
  const isOptionAvailable = option => !options.modes || options.modes.indexOf(option) !== -1;
  const isOptionSelected = option => mode === option;

  const dropdownOptions = [
    isOptionAvailable('Never') && { value: 'Never', text: translateLabel(translations, 'end.never') },
    isOptionAvailable('After') && { value: 'After', text: translateLabel(translations, 'end.after') },
    isOptionAvailable('On date') && { value: 'On date', text: translateLabel(translations, 'end.on_date') },
  ].filter(Boolean);

  return (
    <Form>
      <Form.Group>
        <Form.Field
          inline
          label={translateLabel(translations, 'end.label')}
          control={() => (
            <Dropdown
              compact
              name="end.mode"
              value={mode}
              onChange={(_, { value, name }) => handleChange({ target: { name, value } })}
              options={dropdownOptions}
              selection
              style={{ minWidth: 100 }}
            />
          )}
        />
        {
          isOptionSelected('After') &&
          <EndAfter
            id={`${id}-after`}
            after={after}
            handleChange={handleChange}
            translations={translations}
          />
        }
        {
          isOptionSelected('On date') &&
          <EndOnDate
            id={`${id}-onDate`}
            onDate={onDate}
            handleChange={handleChange}
            translations={translations}
          />
        }
      </Form.Group>
    </Form>
  );
};

End.propTypes = {
  id: PropTypes.string.isRequired,
  end: PropTypes.shape({
    mode: PropTypes.string.isRequired,
    after: PropTypes.number.isRequired,
    onDate: PropTypes.object.isRequired,
    options: PropTypes.shape({
      modes: PropTypes.arrayOf(PropTypes.oneOf(['Never', 'After', 'On date'])),
      weekStartsOnSunday: PropTypes.bool,
    }).isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default End;
