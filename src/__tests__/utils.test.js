import {
  fetchPrograms,
  filterGeographicPrograms,
  filterTribalPrograms,
  filterProgramsByCounty,
  generateCountyOptions,
  generateTribalOptions,
  getCountyThreshold,
  getGeographicData,
  setAppLanguage,
  sortGeographic,
  sortStatePrograms
} from '../utils.js';

const tribalPrograms = [
  {
    type: 'Tribal Government',
    state: 'Oklahoma',
    name: 'Apache Tribe of Oklahoma',
    program: 'Apache Tribe of Oklahoma Emergency Rental Assistance Program (ERAP)',
    url: 'https://apachetribe.org/emergency-rental-assistance-program-erap/'
  },
  {
    type: 'Tribal Government',
    state: 'Oklahoma',
    name: 'Caddo Nation',
    program: 'Caddo Nation Emergency Rental Assistance',
    url: 'https://mycaddonation.com/housing'
  },
  {
    type: 'Tribal Government',
    state: 'Oklahoma',
    name: 'Cherokee Nation',
    program: 'Cherokee Nation Emergency Rental Assistance Program (ERAP)',
    url: 'https://www.hacn.org/hacn'
  }
];

const geographicPrograms = [
  {
    type: 'State',
    state: 'Alabama',
    name: 'Alabama',
    program: 'Alabama Emergency Rental Assistance Program',
    url: 'https://eraalabama.com/'
  },
  {
    type: 'County',
    state: 'Alabama',
    name: 'Baldwin County',
    program: 'Baldwin County Emergency Rental Assistance Program',
    url: 'https://www.baldwinaltogether.org/'
  },
  {
    type: 'City',
    state: 'Alabama',
    name: 'Birmingham',
    program: 'Birmingham Emergency Rental Assistance Program',
    url: 'https://www.birminghamal.gov/renthelp'
  },
  {
    type: 'State',
    state: 'California',
    name: 'California',
    program: "California's COVID-19 Rent Relief",
    url: 'https://landlordtenant.dre.ca.gov/covid_rr/index.html'
  },
  {
    type: 'County',
    state: 'California',
    name: 'Alameda County',
    program: 'Alameda County Housing Secure Emergency Rental Assistance Program (ACHS-ERAP)',
    url: 'https://www.ac-housingsecure.org/'
  },
  {
    type: 'City',
    state: 'California',
    name: 'Anaheim',
    program: 'Anaheim Emergency Rental Assistance Program',
    url: 'https://www.anaheim.net/5532/Emergency-Rental-Assistance-Program'
  }
];

const IndianaPrograms = [
  {
    type: 'State',
    state: 'Indiana',
    program: 'Indiana Emergency Rental Assistance',
    name: 'Indiana',
    url: 'https://apply.ihcda.in.gov/submit'
  },
  {
    type: 'County',
    state: 'Indiana',
    program: 'Elkhart County Emergency Rental Assistance Program',
    name: 'Elkhart County',
    url: 'https://elkhartcounty.com/en/residents/elkhart-county-rental-assistance-program/'
  },
  {
    type: 'City',
    state: 'Indiana',
    program: 'Fort Wayne Emergency Rental Assistance Program',
    name: 'Fort Wayne',
    county: [
      'Hamilton County'
    ],
    url: 'https://www.fwcommunitydevelopment.org/housing/renter-assistance'
  },
  {
    type: 'County',
    state: 'Indiana',
    program: 'Hamilton County Emergency Rental Assistance Program (ERAP)',
    name: 'Hamilton County',
    url: 'https://www.hctaindiana.com/era'
  },
  {
    type: 'City',
    state: 'Indiana',
    program: 'Indianapolis Rental Assistance Program',
    name: 'Indianapolis',
    county: [
      'Marion County'
    ],
    url: 'https://indyrent.org/'
  },
  {
    type: 'County',
    state: 'Indiana',
    program: 'Lake County Emergency Assistance (LCERA) program',
    name: 'Lake County',
    url: 'https://www.lakecountyin.care/'
  },
  {
    type: 'County',
    state: 'Indiana',
    program: 'St. Joseph County’s Emergency Rental Assistance (ERA)',
    name: 'St. Joseph County',
    url: 'https://www.sjcindiana.com/2019/Emergency-Rental-Assistance-Program'
  }
];

const allPrograms = [ ...geographicPrograms, ...tribalPrograms ];

describe( 'module::utils', () => {

  describe( 'fetchPrograms', () => {
    it( 'returns data when successful', async () => {
      const data = { geographic: [], tribal: []};
      fetch.mockResponseOnce( JSON.stringify( data ) );
      await expect( fetchPrograms() ).resolves.toEqual( data );
    } );

    it( 'throws an error when data is not in correct format', async () => {
      fetch.mockResponseOnce( '{}' );
      await expect( fetchPrograms() ).rejects.toThrow( 'Incorrect data format.' );
    } );

    it( 'throws an error when response is not ok', async () => {
      fetch.mockResponseOnce(
        '{}',
        { status: 500, headers: { 'content-type': 'application/json' }}
      );
      await expect( fetchPrograms() ).rejects.toThrow( 'Data load failure.' );
    } );
  } );

  describe( 'filterGeographicPrograms', () => {
    it( 'returns results for state selection', () => {
      const results = filterGeographicPrograms(
        geographicPrograms, 'California', 'Caddo Nation'
      );
      expect( results.length ).toEqual( 3 );
      expect( results[2].name ).toEqual( 'California' );
    } );

    it( 'returns no results when tribe but not state is selected', () => {
      const results = filterGeographicPrograms(
        geographicPrograms, '', 'Caddo Nation'
      );
      expect( results.length ).toEqual( 0 );
    } );

    it( 'returns all results when neither tribe nor state is selected', () => {
      const results = filterGeographicPrograms(
        geographicPrograms, '', ''
      );
      expect( results ).toEqual( geographicPrograms );
    } );

  } );

  describe( 'filterProgramsByCounty', () => {
    it( 'returns state if no other matches', () => {
      const results = filterProgramsByCounty( IndianaPrograms, 'Adams' );
      expect( results.length ).toEqual( 1 );
      expect( results[0].name ).toEqual( 'Indiana' );
    } );

    it( 'returns state and county if a county match exists', () => {
      const results = filterProgramsByCounty( IndianaPrograms, 'Lake' );
      expect( results.length ).toEqual( 2 );
      expect( results[0].name ).toEqual( 'Indiana' );
      expect( results[1].name ).toEqual( 'Lake County' );
    } );

    it( 'returns state and city if a city match exists', () => {
      const results = filterProgramsByCounty( IndianaPrograms, 'Marion' );
      expect( results.length ).toEqual( 2 );
      expect( results[0].name ).toEqual( 'Indiana' );
      expect( results[1].name ).toEqual( 'Indianapolis' );
    } );

    it( 'returns state, county, and city if both city and county matches exist', () => {
      const results = filterProgramsByCounty( IndianaPrograms, 'Hamilton' );
      expect( results.length ).toEqual( 3 );
      expect( results[0].name ).toEqual( 'Indiana' );
      expect( results[1].name ).toEqual( 'Fort Wayne' );
      expect( results[2].name ).toEqual( 'Hamilton County' );
    } );

    it( 'returns state, county, and city matches for county equivalent', () => {
      const programs = [
        { type: 'State', name: 'Louisiana' },
        { type: 'County', name: 'East Baton Rouge Parish' },
        { type: 'County', name: 'Orleans Parish' },
        { type: 'City', name: 'New Orleans', county: [ 'Orleans Parish' ]},
        { type: 'City', name: 'Baton Rouge', county: [ 'East Baton Rouge Parish' ]}
      ];
      const results = filterProgramsByCounty( programs, 'Orleans Parish' );
      expect( results.length ).toEqual( 3 );
      expect( results[0].name ).toEqual( 'Louisiana' );
      expect( results[1].name ).toEqual( 'Orleans Parish' );
      expect( results[2].name ).toEqual( 'New Orleans' );
    } );

    it( 'matches counties based on either name and county prop', () => {
      const programs = [
        { type: 'State', name: 'Kentucky' },
        { type: 'County',
          name: 'Lexington-Fayette Urban County Government',
          county: [ 'Fayette County' ]},
        { type: 'County', name: 'Fayette County' }
      ];
      const results = filterProgramsByCounty( programs, 'Fayette' );
      expect( results.length ).toEqual( 3 );
      expect( results[0].name ).toEqual( 'Kentucky' );
      expect( results[1].name ).toEqual( 'Lexington-Fayette Urban County Government' );
      expect( results[2].name ).toEqual( 'Fayette County' );
    } );

  } );

  describe( 'filterTribalPrograms', () => {
    it( 'returns result for tribe selection', () => {
      const results = filterTribalPrograms(
        tribalPrograms, 'Oklahoma', 'Caddo Nation'
      );
      expect( results.length ).toEqual( 1 );
      expect( results[0] ).toEqual( tribalPrograms[1] );
    } );

    it( 'returns no results for unmatched tribe selection', () => {
      const results = filterTribalPrograms(
        tribalPrograms, 'Oklahoma', 'Nation'
      );
      expect( results ).toEqual( [] );
      expect( results.length ).toEqual( 0 );
    } );

    it( 'returns no results when state but not tribe is selected', () => {
      const results = filterTribalPrograms(
        tribalPrograms, 'California', ''
      );
      expect( results.length ).toEqual( 0 );
    } );

    it( 'returns all results if no state or tribe is selected', () => {
      const results = filterTribalPrograms(
        tribalPrograms, '', ''
      );
      expect( results.length ).toEqual( 3 );
      expect( results[0] ).toEqual( tribalPrograms[0] );
    } );
  } );

  describe( 'generateCountyOptions', () => {
    it( 'returns options for state when they exist', () => {
      const countyData = { Indiana: [ 'A', 'B' ]};
      const options = generateCountyOptions( countyData, 'Indiana' );
      expect( options.length ).toEqual( 2 );
      expect( options ).toEqual( countyData.Indiana );
    } );

    it( 'returns options by state', () => {
      const countyData = {};
      const options = generateCountyOptions( countyData, 'Indiana' );
      expect( options.length ).toEqual( 0 );
      expect( options ).toEqual( [] );
    } );
  } );

  describe( 'generateTribalOptions', () => {
    it( 'generates options for all tribes', () => {
      const options = generateTribalOptions( tribalPrograms );
      expect( options.length ).toEqual( 3 );
      expect( options[0] ).toEqual( tribalPrograms[0].name );
    } );
  } );

  describe( 'getGeographicData', () => {
    it( 'returns counties when county threshold met', () => {
      const countyData = { Indiana: [ 'County 1', 'County 2' ]};
      const [ geographicResults, countyOptionResults ] = getGeographicData(
        IndianaPrograms, countyData, 'Indiana', '', '', 1
      );
      expect( countyOptionResults ).toEqual( countyData.Indiana );
    } );
    it( 'does not return counties when county threshold not met', () => {
      const countyData = { Indiana: [ 'County 1', 'County 2' ]};
      const [ geographicResults, countyOptionResults ] = getGeographicData(
        IndianaPrograms, countyData, 'Indiana', '', '', IndianaPrograms.length
      );
      expect( countyOptionResults ).toEqual( [] );
    } );
    it( 'does not return counties if no counties even if county threshold met', () => {
      const countyData = {};
      const [ geographicResults, countyOptionResults ] = getGeographicData(
        IndianaPrograms, countyData, 'Indiana', '', '', 0
      );
      expect( countyOptionResults ).toEqual( [] );
    } );
  } );

  describe( 'sortGeographic', () => {
    it( 'sorts cities alphabetically', () => {
      expect( sortGeographic(
        { name: 'Indianapolis', type: 'City' },
        { name: 'Fort Wayne', type: 'City' }
      ) ).toEqual( 1 );
    } );

    it( 'sorts cities then counties', () => {
      expect( sortGeographic(
        { name: 'Indianapolis', type: 'City' },
        { name: 'Allen County', type: 'County' }
      ) ).toEqual( -1 );
    } );

    it( 'sorts counties alphabetically', () => {
      expect( sortGeographic(
        { name: 'Lake County', type: 'County' },
        { name: 'Allen County', type: 'County' }
      ) ).toEqual( 1 );
    } );
  } );

  describe( 'sortStatePrograms', () => {
    it( 'sorts state results alphabetically by type and then name', () => {
      const sorted = sortStatePrograms( IndianaPrograms );
      // eslint-disable-next-line max-nested-callbacks
      const sortedMap = sorted.map( item => item.name );
      expect( sortedMap ).toEqual(
        [
          'Fort Wayne',
          'Indianapolis',
          'Elkhart County',
          'Hamilton County',
          'Lake County',
          'St. Joseph County',
          'Indiana'
        ]
      );
    } );
  } );

  describe( 'getCountyThreshold', () => {
    let UNDEFINED;
    const div = document.createElement( 'div' );
    div.id = 'container';
    document.body.appendChild( div );

    it( 'returns numerical value', () => {
      div.setAttribute( 'data-county-threshold', 1000 );
      expect( getCountyThreshold( div ) ).toEqual( 1000 );
    } );

    it( 'returns integer if value is decimal', () => {
      div.setAttribute( 'data-county-threshold', 10.5 );
      expect( getCountyThreshold( div ) ).toEqual( 10 );
    } );

    it( 'returns integer if value is numerical string', () => {
      div.setAttribute( 'data-county-threshold', '120' );
      expect( getCountyThreshold( div ) ).toEqual( 120 );
    } );

    it( 'returns undefined if value is not numerical', () => {
      div.setAttribute( 'data-county-threshold', 'asdf' );
      expect( getCountyThreshold( div ) ).toEqual( UNDEFINED );
    } );

    it( 'returns undefined if attribute does not exist', () => {
      div.removeAttribute( 'data-county-threshold' );
      expect( getCountyThreshold( div ) ).toEqual( UNDEFINED );
    } );

    it( 'returns undefined if container does not exist', () => {
      expect( getCountyThreshold() ).toEqual( UNDEFINED );
    } );

    it( 'returns undefined if container is not an HTML element', () => {
      expect( getCountyThreshold( 'string' ) ).toEqual( UNDEFINED );
    } );

  } );

  describe( 'setAppLanguage', () => {
    const div = document.createElement( 'div' );
    div.id = 'container';
    document.body.appendChild( div );
    const i18n = { changeLanguage: jest.fn() };

    it( 'does not call change language function if data attribute is not Spanish', () => {
      div.setAttribute( 'data-language', 'en' );
      setAppLanguage( div, i18n );
      expect( i18n.changeLanguage ).not.toHaveBeenCalled();
    } );

    it( 'calls change language function if data attribute is Spanish', () => {
      div.setAttribute( 'data-language', 'es' );
      setAppLanguage( div, i18n );
      expect( i18n.changeLanguage ).toHaveBeenCalledWith( 'es' );
    } );

  } );

} );
