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
  return data.map( item => ( 
    { 
      value: item['Tribal Government/Territory'],
      label: item['Tribal Government/Territory'] 
    }
  ))
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
      item => ( item['Tribal Government/Territory'] === tribe )
    )
  } else if ( state ) {
    return [];
  } else {
    return programs;
  }
}

export const generateResultsNotification = ( resultsCount, filtersApplied ) => {
  let notification = '';
  let notificationType = '';
  if ( resultsCount > 0 ) {
    notification = `Showing ${ resultsCount } total rental assistance 
                    program${ resultsCount > 1 ? 's' : '' }`
    if ( filtersApplied ) {
      notification =`Showing ${ resultsCount } rental assistance 
                     program${ resultsCount > 1 ? 's' : ''} 
                     that match${ resultsCount > 1 ? '' : 'es' } your search`;
      notificationType = 'success';
    }
  } else {
    notification = 'No results';
    notificationType = 'warning';
  }
  return [ notification, notificationType ];
}
