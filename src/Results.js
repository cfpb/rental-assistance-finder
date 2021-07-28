import Notification from "./Notification.js";
import ResultItem from "./ResultItem.js";

const Results = ( props ) => {
  const results = [].concat( props.geographic, props.tribal );
  const resultsCount = results.length;
  if ( resultsCount > 0 ) {
    let notification, notificationType;
    if ( props.filtered ) {
      notification =`Showing ${ resultsCount } rental assistance 
                     program${ resultsCount > 1 ? 's' : ''} 
                     that match${ resultsCount > 1 ? '' : 'es' } your search`;
      notificationType = 'success';
    } else {
      notification = `Showing ${ resultsCount } total rental assistance 
                      program${ resultsCount > 1 ? 's' : '' }`
    }
    return (
      <div>
        <Notification message={ notification }
                      type={ notificationType } />
        { results.map( ( item, index ) => (
          <ResultItem item={ item } key={ index }/>
        ) ) } 
      </div>
    )
  } else {
    
    return (
      <Notification message={ `Sorry, we did not find a rental assistance 
                               program for your area.` }
                    explanation={ `Housing counselors can help you find resources 
                                  in your area and make a plan.` }
                    links={ [
                      {
                        'text': 'Find a housing counselor',
                        'url': 'https://www.consumerfinance.gov/find-a-housing-counselor/'
                      },
                      {
                        'text': 'Get advice about your legal rights',
                        'url': 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-find-an-attorney-in-my-state-en-1549/'
                      }
                    ] }
                    type="warning"/>
    )
  }
};

export default Results;