const countyUnlisted = 'My county is not listed';
const tribeUnlisted = 'My tribe is not listed';

export const processData = data => {
  let geographic = [];
  let tribal = [];

  data.forEach( item => {
    item["Geographic Level"] === 'Tribal Government' ? 
      tribal.push( item ) : 
      geographic.push( item );
  })
  
  return [ geographic, tribal ];
}

export const generateTribalOptions = data => {
  let options = data.map( item => ( item['Tribal Government/Territory'] ));
  options.unshift( tribeUnlisted );
  return options;
}

export const filterGeographicPrograms = ( programs, state, tribe ) => {
  if ( state ) {
    return programs.filter(
      item => ( item['State'] === state )
    ) 
  } else if ( tribe && tribe !== tribeUnlisted ) {
    return [];
  } else {
    return programs;
  }
}

export const filterTribalPrograms = ( programs, state, tribe ) => {
  if ( tribe === tribeUnlisted ) {
    return [];
  } else if ( tribe ) {
    return programs.filter( 
      item => ( item['Tribal Government/Territory'] === tribe )
    )
  } else if ( state ) {
    return [];
  } else {
    return programs;
  }
}

export const generateCountyOptions = ( geographicPrograms ) => {
  let counties = new Set();

  geographicPrograms.forEach( item => {
    if ( item['Geographic Level'] === 'City' && item['County'] ) {
      item['County'].forEach( county => counties.add( county ) );
    } else if ( item['Geographic Level'] === 'County' ) {
      counties.add( item['City/County/Locality'] )
    }
  });

  counties = [ ...counties ];
  counties.unshift( countyUnlisted );

  return counties;
}

export const filterProgramsByCounty = ( geographicPrograms, county ) => {
  return geographicPrograms.filter( item => ( 
      ( item['Geographic Level'] === 'State' ) || 
      ( item['Geographic Level'] === 'County' && 
        item['City/County/Locality'] === county ) ||
      ( item['Geographic Level'] === 'City' && 
        item['County'] && 
        item['County'].includes( county ) ) 
    )
  )
}
