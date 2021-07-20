import Filter from "./Filter.js";

function Filters( props ) { 
  return (
    <div className="filters o-well block block__sub">
      <h3>Find rental assistance programs for...</h3>
      <Filter handler={ props.setState }
              options={ props.stateOptions }
              label='Your state or territory'
              placeholder='Select your state or territory'/>
      <div className="block 
                      block__sub 
                      block__border-top 
                      block__padded-top 
                      block__flush-bottom">
        <Filter options={ props.tribeOptions }
                handler={ props.setTribe }
                label='Your tribe or the tribal lands where you live'
                placeholder='Select your tribe'
                helperText='Only tribes and TDHEs with rental assistance programs will be listed.' />
      </div>
    </div>
  );
}

export default Filters;
