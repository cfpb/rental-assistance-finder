import { 
  filterGeographicPrograms,
  filterTribalPrograms,
  filterProgramsByCounty,
  generateCountyOptions,
  generateTribalOptions, 
  processData 
} from '../utils.js';

const tribalPrograms = [
	{
    "Type": "Tribal Government",
    "State": "Oklahoma",
    "Name": "Apache Tribe of Oklahoma",
    "Program": "Apache Tribe of Oklahoma Emergency Rental Assistance Program (ERAP)",
    "URL": "https://apachetribe.org/emergency-rental-assistance-program-erap/",
  },
  {
    "Type": "Tribal Government",
    "State": "Oklahoma",
    "Name": "Caddo Nation",
    "Program": "Caddo Nation Emergency Rental Assistance",
    "URL": "https://mycaddonation.com/housing",
  },
  {
    "Type": "Tribal Government",
    "State": "Oklahoma",
    "Name": "Cherokee Nation",
    "Program": "Cherokee Nation Emergency Rental Assistance Program (ERAP)",
    "URL": "https://www.hacn.org/hacn",
  }
]

const geographicPrograms = [
   {
    "Type": "State",
    "State": "Alabama",
    "Name": "Alabama",
    "Program": "Alabama Emergency Rental Assistance Program",
    "URL": "https://eraalabama.com/",
  },
  {
    "Type": "County",
    "State": "Alabama",
    "Name": "Baldwin County",
    "Program": "Baldwin County Emergency Rental Assistance Program",
    "URL": "https://www.baldwinaltogether.org/",
  },
  {
    "Type": "City",
    "State": "Alabama",
    "Name": "Birmingham",
    "Program": "Birmingham Emergency Rental Assistance Program",
    "URL": "https://www.birminghamal.gov/renthelp",
  },
  {
    "Type": "State",
    "State": "California",
    "Name": "California",
    "Program": "California's COVID-19 Rent Relief",
    "URL": "https://landlordtenant.dre.ca.gov/covid_rr/index.html",
  },
  {
    "Type": "County",
    "State": "California",
    "Name": "Alameda County",
    "Program": "Alameda County Housing Secure Emergency Rental Assistance Program (ACHS-ERAP)",
    "URL": "https://www.ac-housingsecure.org/",
  },
  {
    "Type": "City",
    "State": "California",
    "Name": "Anaheim",
    "Program": "Anaheim Emergency Rental Assistance Program",
    "URL": "https://www.anaheim.net/5532/Emergency-Rental-Assistance-Program",
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
      expect( results[0] ).toEqual( geographicPrograms[3] )
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
      expect( options[0] ).toEqual( tribalPrograms[0]["Name"] )
    } );
  } );

  describe( 'processData', () => {
    it( 'separates tribal and geographic programs' , () => {
      const [ geographic, tribal ] = processData( allPrograms );
      expect( geographic ).toEqual( geographicPrograms );
      expect( tribal ).toEqual( tribalPrograms );
    } );
  } );

})