import { useState } from 'react';
import stateOptions from './data/states.json';
import { filterTribalPrograms, getGeographicData } from './utils.js';
import Filters from './Filters.js';
import Results from './Results.js';

function RentalAssistanceFinder( props ) {
  const [ state, setState ] = useState( '' );
  const [ tribe, setTribe ] = useState( '' );
  const [ county, setCounty ] = useState( '' );

  const tribalPrograms = filterTribalPrograms( props.tribal, state, tribe );

  const [ geographicPrograms, countyOptions ] = getGeographicData(
    props.geographic, state, county, tribe
  );

  return (
    <div className="App">
      <Filters county={ county }
               state={ state }
               tribe={ tribe }
               setCounty={ setCounty }
               setState={ setState }
               setTribe={ setTribe }
               countyOptions= { countyOptions }
               stateOptions={ stateOptions }
               tribeOptions={ props.tribeOptions }/>
      <Results geographic={ geographicPrograms }
               tribal={ tribalPrograms }
               filtered={ state || tribe }/>
    </div>
  );
}

export default RentalAssistanceFinder;
