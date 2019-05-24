import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Radio } from 'semantic-ui-react';
import numericalFieldHandler from '../../../utils/numericalFieldHandler';
import translateLabel from '../../../utils/translateLabel';

const RepeatMonthlyOn = ({
  id,
  mode,
  on,
  hasMoreModes,
  handleChange,
  translations
}) => {
  const isActive = mode === 'on';

  return (
    <div className={`form-group row d-flex align-items-sm-center ${!isActive && 'opacity-50'}`}>
      <div className="col-sm-1 offset-sm-2">
        {
          // hasMoreModes && (
          //   <input
          //     id={id}
          //     type="radio"
          //     name="repeat.monthly.mode"
          //     aria-label="Repeat monthly on"
          //     value="on"
          //     checked={isActive}
          //     onChange={handleChange}
          //   />
          // )
        }

        {
          hasMoreModes && (
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
          )
        }
      </div>

      {
        // <div className="col-sm-1">
        //   {translateLabel(translations, 'repeat.monthly.on_day')}
        // </div>
      }

      <div className="col-sm-2">
        {
          // <select
          //   id={`${id}-day`}
          //   name="repeat.monthly.on.day"
          //   aria-label="Repeat monthly on a day"
          //   className="form-control"
          //   value={on.day}
          //   disabled={!isActive}
          //   onChange={numericalFieldHandler(handleChange)}
          // >
          //   {[...new Array(31)].map((day, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
          // </select>
        }

        <Dropdown
          value={on.day}
          onChange={(e, { value, name }) => {
            const target = { value, name };
            numericalFieldHandler(handleChange)({ target });
          }}
          options={[...new Array(31)].map((day, i) => ({ text: i + 1, value: i + 1}))}
          selection
          compact
          disabled={!isActive}
          name="repeat.monthly.on.day"
          aria-label="Repeat monthly on a day"
        />
      </div>
    </div>
  );
};
RepeatMonthlyOn.propTypes = {
  id: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['on', 'on the']).isRequired,
  on: PropTypes.shape({
    day: PropTypes.number.isRequired,
  }).isRequired,
  hasMoreModes: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default RepeatMonthlyOn;
