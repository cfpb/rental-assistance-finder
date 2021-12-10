import Filter from './Filter.js';
import { useTranslation } from 'react-i18next';
import React from 'react';
import PropTypes from 'prop-types';

function Filters( props ) {
  const { t } = useTranslation();
  const updateState = state => {
    props.setState( state );
    props.setCounty( '' );
  };

  return (
    <div className='filters o-well block block__sub'>
      <h2>{ t( 'filters.legend' ) }</h2>
      <Filter className='state-select-container'
        id='state-select'
        label={ t( 'filters.state.label' ) }
        onChange={ updateState }
        options={ props.stateOptions }
        placeholder={ t( 'filters.state.placeholder' ) }
        value={ props.state }/>
      { props.countyOptions.length > 0 &&
        <Filter className='county-select-container'
          id='county-select'
          label={ t( 'filters.county.label' ) }
          onChange={ props.setCounty }
          options={ props.countyOptions }
          placeholder={ t( 'filters.county.placeholder' ) }
          value={ props.county }/>
      }
      <div className='block
                      block__sub
                      block__border-top
                      block__padded-top
                      block__flush-bottom'>
        <Filter className='tribe-select-container'
          id='tribe-select'
          helperText={ t( 'filters.tribe.helper_text' ) }
          label={ t( 'filters.tribe.label' ) }
          onChange={ props.setTribe }
          options={ props.tribeOptions }
          placeholder={ t( 'filters.tribe.placeholder' ) }
          value={ props.tribe }/>
      </div>
    </div>
  );
}

// Validate (type check) prop types.
Filters.propTypes = {
  state: PropTypes.string,
  stateOptions: PropTypes.object,
  setState: PropTypes.func,
  county: PropTypes.string,
  countyOptions: PropTypes.object,
  setCounty: PropTypes.func,
  tribe: PropTypes.string,
  tribeOptions: PropTypes.object,
  setTribe: PropTypes.func
};

export default Filters;
