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
      <Select aria-label={ props.label }
              getOptionLabel={ label => label }
              getOptionValue={ value => value }
              inputId={ props.id }
              isClearable={ true }
              onChange={ props.onChange }
              options={ props.options }
              placeholder={ props.placeholder }
              value={ [ props.value ] }/>
      </div>
    );
};

export default Filter;