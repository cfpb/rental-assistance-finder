import Select from 'react-select';
import { sendAnalyticsEvent } from './utils.js';

const Filter = ( props ) => {
  const changeHandler = ( val ) => {
    props.onChange( val );
    sendAnalyticsEvent( props.id, val );
  }

  return (
    <div className="m-form-field">
      <label className="a-label a-label__heading"
             htmlFor={ props.id }>
        { props.label }
        { props.helperText &&
          <small className="a-label_helper a-label_helper__block">
            { props.helperText }
          </small>
        }
      </label>
      <Select aria-label={ props.label }
              getOptionLabel={ label => label }
              getOptionValue={ value => value }
              inputId={ props.id }
              isClearable={ true }
              onChange={ changeHandler }
              options={ props.options }
              placeholder={ props.placeholder }
              value={ [ props.value ] }/>
      </div>
    );
};

export default Filter;