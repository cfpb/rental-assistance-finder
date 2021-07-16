import Select from 'react-select';

const Filter = ( props ) => {
  function handleChange( selection ) {
    props.handler( selection ? selection.value : ''  );
  }
  
  return (
    <div className="m-form-field">
      <label className="a-label a-label__heading">
        { props.label }
        { props.helperText &&
          <small className="a-label_helper a-label_helper__block">
            { props.helperText }
          </small>
        }
      </label>
      <Select options={ props.options }
              onChange={ handleChange }
              isClearable={ true }
              placeholder={ props.placeholder } />
      </div>
    );
};

export default Filter;