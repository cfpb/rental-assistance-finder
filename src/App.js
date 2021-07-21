import './App.css';
import { useState } from 'react';

import programs from './data/programs.json';
import stateOptions from './data/states.json';

import { 
  filterGeographicPrograms,
  filterTribalPrograms,
  filterProgramsByCounty,
  generateCountyOptions,
  generateTribalOptions, 
  processData 
} from './utils.js';

import Filters from './Filters.js';
import Results from './Results.js';

const [ geographicPrograms, tribalPrograms ] = processData( programs );
const tribeOptions = generateTribalOptions( tribalPrograms );

function App() {
  const [ state, setState ] = useState( '' );
  const [ tribe, setTribe ] = useState( '' );
  const [ county, setCounty ] = useState( '' );

  const updateState = ( state ) => {
    setState( state );
    setCounty( '' );
  }

  const currentTribalPrograms = filterTribalPrograms( 
    tribalPrograms, state, tribe 
  );

  let currentGeographicPrograms = filterGeographicPrograms( 
    geographicPrograms, state, tribe
  );

  let countyOptions = [];

  if ( state && currentGeographicPrograms.length > 10 ) {
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
               tribeOptions={ tribeOptions }
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

export default App;
