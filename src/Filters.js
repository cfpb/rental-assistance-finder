import Filter from './Filter.js';

function Filters( props ) { 
  return (
    <div className="filters o-well block block__sub">
      <h3>Find rental assistance programs</h3>
      <Filter id="state-select"
              label="For your state or territory"
              onChange={ props.onStateChange }
              options={ props.stateOptions }
              placeholder="Select your state or territory"
              value={ props.state }/>
      { props.countyOptions.length > 0 && 
        <Filter id="county-select"
                helperText="If your county is not listed below, you may still qualify for other programs."
                label="Narrow results by county (optional)"
                onChange={ props.onCountyChange }
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
                onChange={ props.onTribeChange }
                options={ props.tribeOptions }
                placeholder="Select your tribe"
                value={ props.tribe }/>
      </div>
    </div>
  );
}

export default Filters;
