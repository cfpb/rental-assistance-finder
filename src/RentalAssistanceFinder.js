import React, { useState } from 'react';
import { filterTribalPrograms, getGeographicData } from './utils.js';
import Filters from './Filters.js';
import Results from './Results.js';
import PropTypes from 'prop-types';

function RentalAssistanceFinder( props ) {
  const [ state, setState ] = useState( '' );
  const [ tribe, setTribe ] = useState( '' );
  const [ county, setCounty ] = useState( '' );

  const tribalPrograms = filterTribalPrograms( props.tribal, state, tribe );

  const [ geographicPrograms, countyOptions ] = getGeographicData(
    props.geographic, props.countyData, state, county, tribe, props.countyThreshold
  );

  return (
    <div className='rental-assistance-finder'>
      <Filters county={ county }
        state={ state }
        tribe={ tribe }
        setCounty={ setCounty }
        setState={ setState }
        setTribe={ setTribe }
        countyOptions= { countyOptions }
        stateOptions={ props.stateOptions }
        tribeOptions={ props.tribeOptions }/>
      <Results county={ county }
        geographic={ geographicPrograms }
        tribal={ tribalPrograms }
        state={ state }
        tribe={ tribe }/>
    </div>
  );
}

// Validate (type check) prop types.
RentalAssistanceFinder.propTypes = {
  tribal: PropTypes.object,
  geographic: PropTypes.object,
  countyData: PropTypes.object,
  countyThreshold: PropTypes.number,
  stateOptions: PropTypes.object,
  tribeOptions: PropTypes.object
};

export default RentalAssistanceFinder;
