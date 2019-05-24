import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Radio } from 'semantic-ui-react';

import { DAYS } from '../../../constants/index';
import translateLabel from '../../../utils/translateLabel';

const RepeatMonthlyOnThe = ({
  id,
  mode,
  onThe,
  hasMoreModes,
  handleChange,
  translations
}) => {
  const isActive = mode === 'on the';

  return (
    <div className={`form-group row d-flex align-items-sm-center ${!isActive && 'opacity-50'}`}>
      <div className="col-sm-1 offset-sm-2">
        {
          // hasMoreModes && (
          //   <input
          //     id={id}
          //     type="radio"
          //     name="repeat.monthly.mode"
          //     aria-label="Repeat monthly on the"
          //     value="on the"
          //     checked={isActive}
          //     onChange={handleChange}
          //   />
          // )
        }

        {
          hasMoreModes && (
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
          )
        }
      </div>

      {
        // <div className="col-sm-1">
        //   {translateLabel(translations, 'repeat.monthly.on_the')}
        // </div>
      }

      <div className="col-sm-2">
        {
          // <select
          //   id={`${id}-which`}
          //   name="repeat.monthly.onThe.which"
          //   aria-label="Repeat monthly on the which"
          //   className="form-control"
          //   value={onThe.which}
          //   disabled={!isActive}
          //   onChange={handleChange}
          // >
          //   <option value="First">{translateLabel(translations, 'numerals.first')}</option>
          //   <option value="Second">{translateLabel(translations, 'numerals.second')}</option>
          //   <option value="Third">{translateLabel(translations, 'numerals.third')}</option>
          //   <option value="Fourth">{translateLabel(translations, 'numerals.fourth')}</option>
          //   <option value="Last">{translateLabel(translations, 'numerals.last')}</option>
          // </select>
        }

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
      </div>

      <div className="col-sm-3">
        {
          // <select
          //   id={`${id}-day`}
          //   name="repeat.monthly.onThe.day"
          //   aria-label="Repeat monthly on the day"
          //   className="form-control"
          //   value={onThe.day}
          //   disabled={!isActive}
          //   onChange={handleChange}
          // >
          //   {DAYS.map(day => <option key={day} value={day}>{translateLabel(translations, `days.${day.toLowerCase()}`)}</option>)}
          // </select>
        }

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
      </div>

    </div>
  );
};
RepeatMonthlyOnThe.propTypes = {
  id: PropTypes.string.isRequired,
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
