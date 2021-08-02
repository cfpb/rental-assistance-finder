const countyUnlisted = 'My county is not listed';
const programsURL = 'https://files.consumerfinance.gov/a/assets/raf/raf.json';

export const onlyUnique = ( value, index, self ) => {
  return self.indexOf( value ) === index;
}

export const generateTribalOptions = data => {
  return data.map( item => ( item.name ));
}

export const filterGeographicPrograms = ( programs, state, tribe ) => {
  if ( state ) {
    return programs.filter(
      item => ( item.state === state )
    );
  } else if ( tribe ) {
    return [];
  } else {
    return programs;
  }
}

export const filterTribalPrograms = ( programs, state, tribe ) => {
  if ( tribe ) {
    return programs.filter( 
      item => ( item.name === tribe )
    )
  } else if ( state ) {
    return [];
  } else {
    return programs;
  }
}

export const generateCountyOptions = ( programs ) => {
  let counties = [];
  programs.forEach( item => {
    if ( item.type === 'County' ) {
      counties.push( item.name )
    } else if ( item.type === 'City' && item.county ) {
      counties = counties.concat( item.county );
    } 
  });
  counties = counties.filter( onlyUnique ).sort();
  counties.unshift( countyUnlisted );
  return counties;
}

export const filterProgramsByCounty = ( programs, county ) => {
  return programs.filter( item => ( 
      ( item.type === 'State' ) || 
      ( item.type === 'County' && 
        item.name === county ) ||
      ( item.type === 'City' && 
        item.county && 
        item.county.indexOf( county ) !== -1 ) 
    )
  )
}

export const getGeographicData = ( programs, state, county, tribe ) => {
  let geographic = filterGeographicPrograms( programs, state, tribe );
  let countyOptions = [];

  if ( state && geographic.length > 5 ) {
    countyOptions = generateCountyOptions( geographic );
  }

  if ( county ) {
    geographic = filterProgramsByCounty( geographic, county );
  }

  return [ geographic, countyOptions ];
}

export const fetchPrograms =  () => {
  return fetch( 
    programsURL 
  ).then( 
    response => {
      if ( response.ok ) {
        return response.json();
      } else {
        throw new Error('Data load failure.')
      }
    }).then( data => {
      if ( data.geographic && data.tribal ) {
        return data;
      } else {
        throw new Error('Incorrect data format.')
      }
    });
}
