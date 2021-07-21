import Select from 'react-select';

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
      <Select options={ props.options }
              value={ [ props.value ] }
              getOptionLabel={ label => label }
              getOptionValue={ value => value }
              onChange={ props.onChange }
              isClearable={ true }
              placeholder={ props.placeholder }
              aria-label={ props.label }
              inputId={ props.id } />
      </div>
    );
};

export default Filter;