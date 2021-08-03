const countyUnlisted = 'My county is not listed';

export const onlyUnique = ( value, index, self ) => {
  return self.indexOf( value ) === index;
}

export const sortGeographic = ( a, b ) => {
  return a['Type'].localeCompare( b['Type'] ) || 
         a['Name'].localeCompare( b['Name'] );
}

export const sortStatePrograms = ( programs ) => {
  return programs.sort( sortGeographic );
}

export const processData = data => {
  let geographic = [];
  let tribal = [];

  data.forEach( item => {
    item['Type'] === 'Tribal Government' ? 
      tribal.push( item ) : 
      geographic.push( item );
  })
  
  return [ geographic, tribal ];
}

export const generateTribalOptions = data => {
  return data.map( item => ( item['Name'] ) ).sort();
}

export const filterGeographicPrograms = ( programs, state, tribe ) => {
  if ( state ) {
    let filtered = programs.filter(
      item => ( item['State'] === state )
    );
    return sortStatePrograms( filtered );
  } else if ( tribe ) {
    return [];
  } else {
    return programs;
  }
}

export const filterTribalPrograms = ( programs, state, tribe ) => {
  if ( tribe ) {
    return programs.filter( 
      item => ( item['Name'] === tribe )
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
    if ( item['Type'] === 'County' ) {
      counties.push( item['Name'] )
    } else if ( item['Type'] === 'City' && item['County'] ) {
      counties = counties.concat( item['County'] );
    } 
  });
  counties = counties.filter( onlyUnique ).sort();
  counties.unshift( countyUnlisted );
  return counties;
}

export const filterProgramsByCounty = ( programs, county ) => {
  return programs.filter( item => ( 
      ( item['Type'] === 'State' ) || 
      ( item['Type'] === 'County' && 
        item['Name'] === county ) ||
      ( item['Type'] === 'City' && 
        item['County'] && 
        item['County'].indexOf( county ) !== -1 ) 
    )
  )
}
