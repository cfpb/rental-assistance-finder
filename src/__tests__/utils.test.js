import { 
  filterGeographicPrograms,
  filterTribalPrograms,
  filterProgramsByCounty,
  generateCountyOptions,
  generateTribalOptions, 
  sortGeographic,
  sortStatePrograms
} from '../utils.js';

const tribalPrograms = [
	{
    "type": "Tribal Government",
    "state": "Oklahoma",
    "name": "Apache Tribe of Oklahoma",
    "program": "Apache Tribe of Oklahoma Emergency Rental Assistance Program (ERAP)",
    "url": "https://apachetribe.org/emergency-rental-assistance-program-erap/",
  },
  {
    "type": "Tribal Government",
    "state": "Oklahoma",
    "name": "Caddo Nation",
    "program": "Caddo Nation Emergency Rental Assistance",
    "url": "https://mycaddonation.com/housing",
  },
  {
    "type": "Tribal Government",
    "state": "Oklahoma",
    "name": "Cherokee Nation",
    "program": "Cherokee Nation Emergency Rental Assistance Program (ERAP)",
    "url": "https://www.hacn.org/hacn",
  }
]

const geographicPrograms = [
   {
    "type": "State",
    "state": "Alabama",
    "name": "Alabama",
    "program": "Alabama Emergency Rental Assistance Program",
    "url": "https://eraalabama.com/",
  },
  {
    "type": "County",
    "state": "Alabama",
    "name": "Baldwin County",
    "program": "Baldwin County Emergency Rental Assistance Program",
    "url": "https://www.baldwinaltogether.org/",
  },
  {
    "type": "City",
    "state": "Alabama",
    "name": "Birmingham",
    "program": "Birmingham Emergency Rental Assistance Program",
    "url": "https://www.birminghamal.gov/renthelp",
  },
  {
    "type": "State",
    "state": "California",
    "name": "California",
    "program": "California's COVID-19 Rent Relief",
    "url": "https://landlordtenant.dre.ca.gov/covid_rr/index.html",
  },
  {
    "type": "County",
    "state": "California",
    "name": "Alameda County",
    "program": "Alameda County Housing Secure Emergency Rental Assistance Program (ACHS-ERAP)",
    "url": "https://www.ac-housingsecure.org/",
  },
  {
    "type": "City",
    "state": "California",
    "name": "Anaheim",
    "program": "Anaheim Emergency Rental Assistance Program",
    "url": "https://www.anaheim.net/5532/Emergency-Rental-Assistance-Program",
  }
]

const statePrograms = [
  {
     "type":"State",
     "state":"Indiana",
     "program":"Indiana Emergency Rental Assistance",
     "name":"Indiana",
     "url":"https://apply.ihcda.in.gov/submit"
  },
  {
     "type":"County",
     "state":"Indiana",
     "program":"Elkhart County Emergency Rental Assistance Program",
     "name":"Elkhart County",
     "url":"https://elkhartcounty.com/en/residents/elkhart-county-rental-assistance-program/"
  },
  {
     "type":"City",
     "state":"Indiana",
     "program":"Fort Wayne Emergency Rental Assistance Program",
     "name":"Fort Wayne",
     "County":[
        "Allen County"
     ],
     "url":"https://www.fwcommunitydevelopment.org/housing/renter-assistance"
  },
  {
     "type":"County",
     "state":"Indiana",
     "program":"Hamilton County Emergency Rental Assistance Program (ERAP)",
     "name":"Hamilton County",
     "url":"https://www.hctaindiana.com/era"
  },
  {
     "type":"City",
     "state":"Indiana",
     "program":"Indianapolis Rental Assistance Program",
     "name":"Indianapolis",
     "County":[
        "Marion County"
     ],
     "url":"https://indyrent.org/"
  },
  {
     "type":"County",
     "state":"Indiana",
     "program":"Lake County Emergency Assistance (LCERA) program",
     "name":"Lake County",
     "url":"https://www.lakecountyin.care/"
  },
  {
     "type":"County",
     "state":"Indiana",
     "program":"St. Joseph County’s Emergency Rental Assistance (ERA)",
     "name":"St. Joseph County",
     "url":"https://www.sjcindiana.com/2019/Emergency-Rental-Assistance-Program"
  }
]

const allPrograms = [...geographicPrograms, ...tribalPrograms]

describe('module::utils', () => {

  describe( 'filterTribalPrograms', () => {
    it( 'returns result for tribe selection' , () => {
      const results = filterTribalPrograms( 
        tribalPrograms, 'Oklahoma', 'Caddo Nation'
      )
      expect( results.length ).toEqual( 1 );
      expect( results[0] ).toEqual( tribalPrograms[1] )
    } );

    it( 'returns no results for unmatched tribe selection' , () => {
      const results = filterTribalPrograms( 
        tribalPrograms, 'Oklahoma', 'Nation'
      )
      expect( results ).toEqual( [] );
      expect( results.length ).toEqual( 0 );
    } );

    it( 'returns no results when state but not tribe is selected' , () => {
      const results = filterTribalPrograms( 
        tribalPrograms, 'California', ''
      )
      expect( results.length ).toEqual( 0 );
    } );

    it( 'returns all results if no state or tribe is selected' , () => {
      const results = filterTribalPrograms( 
        tribalPrograms, '', ''
      )
      expect( results.length ).toEqual( 3 );
      expect( results[0] ).toEqual( tribalPrograms[0] )
    } );
  } );

  describe( 'filterGeographicPrograms', () => {
    it( 'returns results for state selection' , () => {
      const results = filterGeographicPrograms( 
        geographicPrograms, 'California', 'Caddo Nation'
      )
      expect( results.length ).toEqual( 3 );
      expect( results[2].name ).toEqual( 'California' )
    } );

    it( 'returns no results when tribe but not state is selected' , () => {
      const results = filterGeographicPrograms( 
        geographicPrograms, '', 'Caddo Nation'
      )
      expect( results.length ).toEqual( 0 );
    } );

    it( 'returns all results when neither tribe nor state is selected' , () => {
      const results = filterGeographicPrograms( 
        geographicPrograms, '', ''
      )
      expect( results ).toEqual( geographicPrograms );
    } );

  } );

  describe( 'generateTribalOptions', () => {
    it( 'generates options for all tribes' , () => {
      const options = generateTribalOptions( tribalPrograms );
      expect( options.length ).toEqual( 3 );
      expect( options[0] ).toEqual( tribalPrograms[0].name )
    } );
  } );

  describe( 'sortStatePrograms', () => {
    it( 'sorts state results alphabetically by type and then name' , () => {
      const sorted = sortStatePrograms( statePrograms );
      expect( sorted.map( item => ( item.name ) ) ).toEqual(
        ['Fort Wayne', 'Indianapolis', 'Elkhart County',
         'Hamilton County', 'Lake County', 'St. Joseph County',
         'Indiana']
      )
    } );
  } );

  describe( 'sortGeographic', () => {
    it( 'sorts cities alphabetically' , () => {
      expect( sortGeographic(   
        {'name': 'Indianapolis', 'type': 'City'},
        {'name': 'Fort Wayne', 'type': 'City'}
      ) ).toEqual( 1 );
    } );

    it( 'sorts cities then counties' , () => {
      expect( sortGeographic(   
        {'name': 'Indianapolis', 'type': 'City'},
        {'name': 'Allen County', 'type': 'County'}
      ) ).toEqual( -1 );
    } );

    it( 'sorts counties alphabetically' , () => {
      expect( sortGeographic(   
        {'name': 'Lake County', 'type': 'County'},
        {'name': 'Allen County', 'type': 'County'}
      ) ).toEqual( 1 );
    } );
  } );
})