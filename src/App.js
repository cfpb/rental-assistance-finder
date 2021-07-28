import './App.css';
import { useEffect, useState } from 'react';
import RentalAssistanceFinder from './RentalAssistanceFinder.js';
import Notification from "./Notification.js";

import {
  generateTribalOptions,
  processData
} from './utils.js';


function App() {
  const [ data, setData ] = useState( {
    geographic: [],
    tribal: [],
    tribeOptions: []
  } );
  const [ loading, setLoading ] = useState( true );
 
  useEffect( () => {
    // move some of this to utils
    const fetchData =  () => {
      const url = 'https://files.consumerfinance.gov/a/assets/raf/raf.json';
      fetch(url)
        // handle failure
        .then( res => res.json() )
        .then( json => {
          // handle data processing errors
          const [ geographic, tribal ] = processData( json );
          const tribeOptions = generateTribalOptions( tribal );
          setData( {
            geographic: geographic,
            tribal: tribal,
            tribeOptions: tribeOptions
          } );
          setLoading( false )
        })
    }
    fetchData();
  }, []) // second argument means this will only run once, when component mounts

  return (
    <div className="App">
      { loading ? (
          <Notification message='The Rental Assistance Finder is loading'
                        type='loading' />
        ) : (
          <RentalAssistanceFinder data={ data }/>
        )
      }
    </div>
  );
}

export default App;
