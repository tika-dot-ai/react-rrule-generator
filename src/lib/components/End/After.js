import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'semantic-ui-react';
import numericalFieldHandler from '../../utils/numericalFieldHandler';
import translateLabel from '../../utils/translateLabel';

const EndAfter = ({
  id,
  after,
  handleChange,
  translations,
}) => (
  <Form.Field
    inline
    control={() => (
      <div>
        <Input
          id={id}
          name="end.after"
          aria-label="End after"
          value={after}
          onChange={numericalFieldHandler(handleChange)}
          style={{ marginRight: '1em' }}
        />
        {translateLabel(translations, 'end.executions')}
      </div>
    )}
  />
);

EndAfter.propTypes = {
  id: PropTypes.string.isRequired,
  after: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default EndAfter;
