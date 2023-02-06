/**
 * Sort callback that sorts a program alphabetically
 * first by its type and then by its name.
 * @param  {object} a - The first program being compared.
 * @param  {object} b - The second program being compared.
 * @param  {array} self - The array of programs being sorted.
 * @returns {number} A number indicating whether 'a' comes before,
 * after, or is the same as 'b' in sort order.
 */
export const sortGeographic = ( a, b ) => a.type.localeCompare( b.type ) ||
         a.name.localeCompare( b.name );

/**
 * Sorts a state's programs.
 * Programs are sorted so that alphabetized city-level programs
 * appear first, then alphabetized county-level programs,
 * then the state-level program.
 * @param  {array} programs - An array of program objects to be sorted.
 * @returns {array} An array of sorted program objects.
 */
export const sortStatePrograms = programs => programs.sort( sortGeographic );

/**
 * Returns an array of county names for a given state.
 * @param  {object} countyData - Object containing counties by state.
 * @param  {string} state - State name.
 * @returns {array} Array of county names.
 */
export const generateCountyOptions = ( countyData, state ) => countyData[state] || [];

/**
 * Generates an array of program names from an array of program objects.
 * @param  {array} data - Array of program objects.
 * @returns {array} An array of program names.
 */
export const generateTribalOptions = data => data.map( item => item.name ).sort();

/**
 * Filters an array of geographic (state-based) program objects.
 * If a state param is passed (meaning the user has filtered by state),
 * returns all programs in that state, sorted by locality.
 * If tribe but not state param is passed (meaning the user has
 * only filtered by tribe), returns empty array.
 * If neither tribe nor state param is passed (meaning the user
 * has not filtered), returns all geographic programs.
 * @param  {array} programs - Array of program objects.
 * @param  {string} [state] - State name.
 * @param  {string} [tribe] - Tribal program name.
 * @returns {array} An array of program objects.
 */
export const filterGeographicPrograms = ( programs, state, tribe ) => {
  if ( state ) {
    const filtered = programs.filter(
      item => item.state === state
    );
    return sortStatePrograms( filtered );
  } else if ( tribe ) {
    return [];
  }
  return programs;

};

/**
 * Filters an array of tribal program objects.
 * If a tribe param is passed (meaning the user has filtered by tribe),
 * returns program matching tribe param.
 * If state but not tribe param is passed (meaning the user has
 * only filtered by state), returns empty array.
 * If neither tribe nor state param is passed (meaning the user
 * has not filtered), returns all tribal programs.
 * @param  {array} programs - Array of program objects.
 * @param  {string} [state] - State name.
 * @param  {string} [tribe] - Tribal program name.
 * @returns {array} An array of program objects.
 */
export const filterTribalPrograms = ( programs, state, tribe ) => {
  if ( tribe ) {
    return programs.filter(
      item => item.name === tribe
    );
  } else if ( state ) {
    return [];
  }
  return programs;

};

/**
 * Filters a state's programs by county.
 * Returns any state-level programs,
 * any county-level programs whose name matches county param,
 * and any city-level programs whose county array contains county param.
 * @param  {array} statePrograms - Array of programs for a state.
 * @param  {string} county - County name.
 * @returns {array} Array of programs in county.
 */
export const filterProgramsByCounty = ( statePrograms, county ) => statePrograms.filter( item => {
  // state is always returned
  const returnVal = ( item.type === 'State' ) ||

    /* check for county in county array after removing the word
      "County" since that's not present in the dropdown values */
    ( Array.isArray( item.county ) &&
      item.county.some( val => val.split( ' County' )[0] === county
      )
    ) ||

    /* Check if county name matches program name,
      again removing "County" */
    ( item.type === 'County' &&
      item.name.split( ' County' )[0] === county );

  return returnVal;
} );

/**
 * Processes geographic programs.
 * Returns two arrays:
 * 1) an array of geographic programs filtered based
 * on optional state, county, and tribe parameters
 * 2) an array of county names IF state param
 * passed in and length of filtered geographic programs array
 * meets the threshold that triggers county-level filtering.
 * @param  {array} programs - Array of geographic programs.
 * @param  {object} countyData - Object containing counties by state.
 * @param  {string} [state] - State name.
 * @param  {string} [county] - County name.
 * @param  {string} [tribe] - Tribal program name.
 * @param  {number} [countyThreshold=10] - Number of results that
 * triggers display of county filter (defaults to 1)
 * @returns {array} An array containing two arrays:
 * 1) an array of filtered geographic programs
 * 2) an array of county names
 */
export const getGeographicData = (
  programs, countyData, state, county, tribe, countyThreshold = 1
) => {
  let geographic = filterGeographicPrograms( programs, state, tribe );
  let countyOptions = [];

  if ( state && ( geographic.length > countyThreshold ) ) {
    countyOptions = generateCountyOptions( countyData, state );
  }

  if ( county ) {
    geographic = filterProgramsByCounty( geographic, county );
  }

  return [ geographic, countyOptions ];
};

/**
 * Fetches program data from specified endpoint.
 * Throws errors if fetch fails or data is not
 * in correct format.
 * @returns {promise} Promise object
 */
export const fetchPrograms = () => fetch(
  'https://files.consumerfinance.gov/a/assets/raf/raf.json'
).then(
  response => {
    if ( response.ok ) {
      return response.json();
    }
    throw new Error( 'Data load failure.' );

  } ).then( data => {
  if ( data.geographic && data.tribal ) {
    return data;
  }
  throw new Error( 'Incorrect data format.' );

} );

/**
 * Sets app's language based on container data attribute.
 * @param {HTMLNode} elem - Container element for app.
 * @param  {object} i18n - Instance of i18next.
 */
export const setAppLanguage = ( elem, i18n ) => {
  if ( elem instanceof Element ) {
    const language = elem.getAttribute( 'data-language' );
    if ( language === 'es' ) {
      i18n.changeLanguage( language );
    }
  }
};

/**
 * Gets a county threshold based on container data attribute.
 * @param {HTMLNode} elem - Container element for app.
 * @returns {number | undefined} An integer version of the
 * county threshold parameter or undefined
 */
export const getCountyThreshold = elem => {
  let returnVal;
  let UNDEFINED;
  if ( elem instanceof Element ) {
    const threshold = elem.getAttribute( 'data-county-threshold' );
    const val = parseInt( threshold, 10 );
    returnVal = isNaN( val ) ? UNDEFINED : val;
  }
  return returnVal;
};

/**
 * Returns a class based on the status text
 * @param {string} status The text of the status property
 * @returns {string} class name and text for associated status
 */
export const getStatusClass = status => {
  let statusClass = '';

  if ( status.includes( 'Accepting applications - rolling basis' ) ) {
    statusClass = 'status-rolling';
  } else if ( status.includes( 'Accepting applications' ) ) {
    statusClass = 'status-accepting';
  } else if ( status.includes( 'Applications on hold/Waitlist' ) ) {
    statusClass = 'status-waitlist';
  }
  return statusClass;
};
