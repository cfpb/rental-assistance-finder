import './App.css';
import { useState } from 'react';

import programs from './data/programs.json';
import stateOptions from './data/state-options.json';

import { 
  filterGeographicPrograms,
  filterTribalPrograms,
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
  
  const currentGeographicPrograms = filterGeographicPrograms( 
    geographicPrograms, state, tribe
  );

  const currentTribalPrograms = filterTribalPrograms( 
    tribalPrograms, state, tribe 
  );

  return (
    <div className="App">
      <Filters setState={ setState }
               setTribe={ setTribe }
               stateOptions={ stateOptions }
               tribeOptions={ tribeOptions } />
      <Results geographic={ currentGeographicPrograms }
               tribal={ currentTribalPrograms }/>
    </div>
  );
}

export default App;
