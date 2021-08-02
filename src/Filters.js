import Filter from './Filter.js';

function Filters( props ) { 
  const updateState = ( state ) => {
    props.setState( state );
    props.setCounty( '' );
  }

  return (
    <div className="filters o-well block block__sub">
      <h2>Find rental assistance programs</h2>
      <Filter id="state-select"
              label="For your state or territory"
              onChange={ updateState }
              options={ props.stateOptions }
              placeholder="Select your state or territory"
              value={ props.state }/>
      { props.countyOptions.length > 0 && 
        <Filter id="county-select"
                helperText="If your county is not listed below, you may still qualify for other programs."
                label="Narrow results by county (optional)"
                onChange={ props.setCounty }
                options={ props.countyOptions }
                placeholder="Select your county"
                value={ props.county }/>
      }
      <div className="block 
                      block__sub 
                      block__border-top 
                      block__padded-top 
                      block__flush-bottom">
        <Filter id="tribe-select" 
                helperText="Only tribes with rental assistance programs are listed."
                label="For your tribe or the tribal lands where you live (if applicable)"
                onChange={ props.setTribe }
                options={ props.tribeOptions }
                placeholder="Select the tribe or tribal lands"
                value={ props.tribe }/>
      </div>
    </div>
  );
}

export default Filters;
