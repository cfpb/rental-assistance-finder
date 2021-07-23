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
    "Geographic Level": "Tribal Government",
    "State": "Oklahoma",
    "Tribal Government/Territory": "Apache Tribe of Oklahoma",
    "Program Name": "Apache Tribe of Oklahoma Emergency Rental Assistance Program (ERAP)",
    "Program Page Link (Phone # if Link is Unavailable)": "https://apachetribe.org/emergency-rental-assistance-program-erap/",
  },
  {
    "Geographic Level": "Tribal Government",
    "State": "Oklahoma",
    "City/County/Locality": "",
    "Tribal Government/Territory": "Caddo Nation",
    "Program Name": "Caddo Nation Emergency Rental Assistance",
    "Program Page Link (Phone # if Link is Unavailable)": "https://mycaddonation.com/housing",
  },
  {
    "Geographic Level": "Tribal Government",
    "State": "Oklahoma",
    "City/County/Locality": "",
    "Tribal Government/Territory": "Cherokee Nation",
    "Program Name": "Cherokee Nation Emergency Rental Assistance Program (ERAP)",
    "Program Page Link (Phone # if Link is Unavailable)": "https://www.hacn.org/hacn",
  }
]

const geographicPrograms = [
   {
    "Geographic Level": "State",
    "State": "Alabama",
    "City/County/Locality": "",
    "Program Name": "Alabama Emergency Rental Assistance Program",
    "Program Page Link (Phone # if Link is Unavailable)": "https://eraalabama.com/",
  },
  {
    "Geographic Level": "County",
    "State": "Alabama",
    "City/County/Locality": "Baldwin County",
    "Program Name": "Baldwin County Emergency Rental Assistance Program",
    "Program Page Link (Phone # if Link is Unavailable)": "https://www.baldwinaltogether.org/",
  },
  {
    "Geographic Level": "City",
    "State": "Alabama",
    "City/County/Locality": "Birmingham",
    "Program Name": "Birmingham Emergency Rental Assistance Program",
    "Program Page Link (Phone # if Link is Unavailable)": "https://www.birminghamal.gov/renthelp",
  },
  {
    "Geographic Level": "State",
    "State": "California",
    "City/County/Locality": "",
    "Tribal Government/Territory": "",
    "Program Name": "California's COVID-19 Rent Relief",
    "Program Page Link (Phone # if Link is Unavailable)": "https://landlordtenant.dre.ca.gov/covid_rr/index.html",
  },
  {
    "Geographic Level": "County",
    "State": "California",
    "City/County/Locality": "Alameda County",
    "Tribal Government/Territory": "",
    "Program Name": "Alameda County Housing Secure Emergency Rental Assistance Program (ACHS-ERAP)",
    "Program Page Link (Phone # if Link is Unavailable)": "https://www.ac-housingsecure.org/",
  },
  {
    "Geographic Level": "City",
    "State": "California",
    "City/County/Locality": "Anaheim",
    "Tribal Government/Territory": "",
    "Program Name": "Anaheim Emergency Rental Assistance Program",
    "Program Page Link (Phone # if Link is Unavailable)": "https://www.anaheim.net/5532/Emergency-Rental-Assistance-Program",
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
    it( 'generates options for all tribes and an unlisted option' , () => {
      const options = generateTribalOptions( tribalPrograms );
      expect( options.length ).toEqual( 4 );
      expect( options[1] ).toEqual( tribalPrograms[0]["Tribal Government/Territory"] )
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