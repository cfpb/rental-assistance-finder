import { useTranslation } from "react-i18next";
import ResultsNotification from "./ResultsNotification.js";
import ResultItem from "./ResultItem.js";

const Results = ( props ) => {
  const { t } = useTranslation();
  const fields = t( 'fields' );
  return (
    <div>
      <ResultsNotification filtered={ props.filtered }
                           resultsCount={ props.results.length } />
      { props.results.length > 0 && props.results.map( ( item, index ) => (
        <ResultItem item={ item } key={ index } fields={ fields }/>
      ) ) } 
    </div>
  )
};

export default Results;