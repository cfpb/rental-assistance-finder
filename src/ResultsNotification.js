import Notification from './Notification.js';
import { useTranslation } from 'react-i18next';
import React from 'react';
import PropTypes from 'prop-types';

const ResultsNotification = props => {
  const { t } = useTranslation();
  let resultsCount = props.resultsCount,
      explanation,
      links,
      message,
      type;
  if ( resultsCount === 0 ) {
    type = 'warning';
    message = t( 'results.none.message' );
    explanation = t( 'results.none.explanation' );
    links = t( 'results.none.links' );
  } else if ( resultsCount === 1 ) {
    type = 'success';
    if ( props.geographicCount === 1 ) {
      message = t( 'results.single_geographic.message' );
      explanation = t( 'results.single_geographic.explanation' );
    } else {
      message = t( 'results.single.message' );
      explanation = t( 'results.single.explanation' );
    }
  } else if ( props.filtered ) {
    type = 'success';
    message = t( 'results.filtered.count', { count: resultsCount } );
    explanation = t( 'results.filtered.explanation', { count: resultsCount } );
  } else {
    message = t( 'results.all.count', { count: resultsCount } );
  }
  return (
    <Notification explanation={ explanation }
      links={ links }
      message={ message }
      type={ type } />
  );
};

// Validate (type check) prop types.
ResultsNotification.propTypes = {
  resultsCount: PropTypes.number,
  geographicCount: PropTypes.number,
  filtered: PropTypes.object
};

export default ResultsNotification;
