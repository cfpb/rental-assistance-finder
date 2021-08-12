import Notification from "./Notification.js";
import { useTranslation } from "react-i18next";

const ResultsNotification = ( props ) => {
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
  } else if ( props.filtered ) {
    type = 'success';
    message = t( 'results.filtered.count', { count: resultsCount } );
  } else {
    message = t( "results.all.count", { count: resultsCount } );
  }
  console.log(links)      
  return (
    <Notification explanation={ explanation }
                  links={ links }
                  message={ message }
                  type={ type } />
  )
};

export default ResultsNotification;