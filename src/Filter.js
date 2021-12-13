import Select from 'react-select';
import Analytics from './Analytics.js';
import React from 'react';
import PropTypes from 'prop-types';

const customStyles = {
  control: base => ( {
    ...base,
    borderColor: '#919395',
    borderRadius: 0
  } ),
  dropdownIndicator: base => ( {
    ...base,
    backgroundColor: '#e7e8e9',
    color: '#101820 !important'
  } ),
  indicatorSeparator: base => ( {
    ...base,
    backgroundColor: '#919395',
    margin: 0
  } ),
  placeholder: base => ( {
    ...base,
    color: '#585d61'
  } )
};

const Filter = props => {
  const changeHandler = val => {
    props.onChange( val );
    Analytics.sendEvent( Analytics.getDataLayerOptions( props.id, val ) );
  };

  return (
    <div className='m-form-field'>
      <label className='a-label a-label__heading'
        htmlFor={ props.id }>
        { props.label }
        { props.helperText &&
          <small className='a-label_helper a-label_helper__block'>
            { props.helperText }
          </small>
        }
      </label>
      <Select aria-label={ props.label }
        className={ props.className }
        classNamePrefix='react-select'
        getOptionLabel={ label => label }
        getOptionValue={ value => value }
        inputId={ props.id }
        isClearable={ true }
        onChange={ changeHandler }
        options={ props.options }
        placeholder={ props.placeholder }
        styles={customStyles}
        value={ [ props.value ] }/>
    </div>
  );
};

// Validate (type check) prop types.
Filter.propTypes = {
  onChange: PropTypes.func,
  id: PropTypes.number,
  label: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

export default Filter;
