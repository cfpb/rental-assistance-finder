import { useState } from 'react';
import stateOptions from './data/states.json';

import { 
  filterGeographicPrograms,
  filterTribalPrograms,
  filterProgramsByCounty,
  generateCountyOptions
} from './utils.js';

import Filters from './Filters.js';
import Results from './Results.js';


function RentalAssistanceFinder( props ) {
  const data = props.data || {};
  const [ state, setState ] = useState( '' );
  const [ tribe, setTribe ] = useState( '' );
  const [ county, setCounty ] = useState( '' );

  const updateState = ( state ) => {
    setState( state );
    setCounty( '' );
  }

  const currentTribalPrograms = filterTribalPrograms( 
    data.tribal, state, tribe 
  );

  let currentGeographicPrograms = filterGeographicPrograms( 
    data.geographic, state, tribe
  );

  let countyOptions = [];

  if ( state && currentGeographicPrograms.length > 5 ) {
    countyOptions = generateCountyOptions( currentGeographicPrograms );
  }

  if ( county ) {
    currentGeographicPrograms = filterProgramsByCounty( 
      currentGeographicPrograms, county 
    );
  }

  return (
    <div className="App">
      <Filters onStateChange={ updateState }
               onTribeChange={ setTribe }
               onCountyChange={ setCounty }
               stateOptions={ stateOptions }
               tribeOptions={ data.tribeOptions }
               countyOptions= { countyOptions }
               state={ state }
               county={ county }
               tribe={ tribe } />
      <Results geographic={ currentGeographicPrograms }
               tribal={ currentTribalPrograms }
               filtered={ state || tribe }/>
    </div>
  );
}

export default RentalAssistanceFinder;
