export const selectOption = ( select, val ) => {
  cy.get( `.${select}-container` )
    .find( '.react-select__control' )      
    .click() 
    .get( '.react-select__menu' ) 
    .find( '.react-select__option' )
    .contains( new RegExp("^" + val + "$", "g") )
    .click();
}

export const processData = ( programData ) => {
  const countyThreshold = 1;
  const stateData = {};
  const countyData = {};
  const statewidePrograms = {};
  const programs = programData.geographic;
  // generate a map of states and their programs
  programs.forEach( program => {
    const state = program.state;
    const stateArray = stateData[state] || [];
    stateArray.push( program );
    stateData[state] = stateArray;
    if ( program.type === 'State' ) statewidePrograms[state] = 1;
  } );
  const states = Object.keys( stateData );
  // generate a map of states, their counties, and 
  // each county's programs
  states.forEach( state => {
    const statePrograms = stateData[state];
    if ( statePrograms.length > 1 ) {
      const counties = {};
      statePrograms.forEach( program => {
        const stateEntry = countyData[state] || {};
        if ( Array.isArray( program.county ) ) {
          const countyArray = program.county || [];
          countyArray.forEach( item => {
            const countyName = item.split(' County')[0];
            const county = stateEntry[countyName] || [];
            county.push(program.name);
            stateEntry[countyName] = county;
          })
        } else if ( program.type === 'County') {
          const countyName = program.name.split(' County')[0];
          const county = stateEntry[countyName] || [];
          county.push(program.name);
          stateEntry[countyName] = county;
        } 
        countyData[state] = stateEntry;
      })
    }
  } );
  return [ stateData, countyData, statewidePrograms ];
}
