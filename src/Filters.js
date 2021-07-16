import Filter from "./Filter.js";

function Filters( props ) { 
  return (
    <div className="filters o-well">
      <h3>Find rental assistance programs for...</h3>
      <Filter handler={ props.setState }
              options={ props.stateOptions }
              label='Your state or territory'
              placeholder='Select your state or territory'/>
      <Filter options={ props.tribeOptions }
              handler={ props.setTribe }
              label='Your tribe or Tribally Designated Housing Entity (if applicable)'
              placeholder='Select your tribe or TDHE'
              helperText='Only tribes and TDHEs with rental assistance programs will be listed.' />
    </div>
  );
}

export default Filters;
