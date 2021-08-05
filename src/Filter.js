import Select from 'react-select';

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
  } )
};

const Filter = ( props ) => {
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
              onChange={ props.onChange }
              options={ props.options }
              placeholder={ props.placeholder }
              styles={customStyles}
              value={ [ props.value ] }/>
      </div>
    );
};

export default Filter;