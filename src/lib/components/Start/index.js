import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import StartOnDate from './OnDate';

import translateLabel from '../../utils/translateLabel';

const Start = ({
  id,
  start: {
    onDate,
  },
  handleChange,
  translations,
}) => (
  <Form>
    <Form.Field
      inline
      label={translateLabel(translations, 'start.label')}
      control={() => (
        <StartOnDate id={id} onDate={onDate} handleChange={handleChange} translations={translations} />
      )}
    />
  </Form>
);

Start.propTypes = {
  id: PropTypes.string.isRequired,
  start: PropTypes.shape({
    onDate: PropTypes.object.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Start;
