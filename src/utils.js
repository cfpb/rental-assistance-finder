const countyUnlisted = 'My county is not listed';

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
  return data.map( item => ( item['Name'] ));
}

export const filterGeographicPrograms = ( programs, state, tribe ) => {
  if ( state ) {
    return programs.filter(
      item => ( item['State'] === state )
    ) 
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
  let counties = new Set( [ countyUnlisted ]  );
  programs.forEach( item => {
    if ( item['Type'] === 'County' ) {
      counties.add( item['Name'] )
    } else if ( item['Type'] === 'City' && item['County'] ) {
      item['County'].forEach( county => counties.add( county ) );
    } 
  });
  return [ ...counties ];
}

export const filterProgramsByCounty = ( programs, county ) => {
  return programs.filter( item => ( 
      ( item['Type'] === 'State' ) || 
      ( item['Type'] === 'County' && 
        item['Name'] === county ) ||
      ( item['Type'] === 'City' && 
        item['County'] && 
        item['County'].includes( county ) ) 
    )
  )
}
