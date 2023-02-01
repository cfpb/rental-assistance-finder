import { useTranslation } from 'react-i18next';
import ResultsNotification from './ResultsNotification.js';
import ResultItem from './ResultItem.js';
import React from 'react';
import PropTypes from 'prop-types';

const Results = props => {
  const { t } = useTranslation();
  const fields = t( 'fields' );
  const statuses = t( 'statuses' );
  const results = [].concat( props.geographic, props.tribal );

  return (
    <div>
      <ResultsNotification filtered={ props.state || props.tribe }
        geographicCount={ props.geographic.length }
        resultsCount={ results.length } />
      { results.length > 0 && results.map( ( item, index ) => <ResultItem item={ item } key={ index } fields={ fields } statuses={ statuses }/>
      ) }
    </div>
  );
};

// Validate (type check) prop types.
Results.propTypes = {
  geographic: PropTypes.object,
  tribal: PropTypes.string,
  state: PropTypes.string,
  tribe: PropTypes.string,
  status: PropTypes.string
};

export default Results;
