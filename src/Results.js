import { useTranslation } from 'react-i18next';
import ResultsNotification from './ResultsNotification.js';
import ResultItem from './ResultItem.js';

const Results = props => {
  const { t } = useTranslation();
  const fields = t( 'fields' );
  const results = [].concat( props.geographic, props.tribal );
  return (
    <div>
      <ResultsNotification filtered={ props.state || props.tribe }
        geographicCount={ props.geographic.length }
        resultsCount={ results.length } />
      { results.length > 0 && results.map( ( item, index ) => (
        <ResultItem item={ item } key={ index } fields={ fields }/>
      ) ) }
    </div>
  );
};

export default Results;
