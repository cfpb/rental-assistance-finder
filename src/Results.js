import Notification from "./Notification.js";
import ResultItem from "./ResultItem.js";

const Results = ( props ) => {
  const results = [ ...props.geographic, ...props.tribal ];
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
                    explanation={`Housing counselors can help you find resources 
                                  in your area and make a plan.`}
                    links={ [
                      {
                        'text': 'Find a housing counselor',
                        'url': ''
                      },
                      {
                        'text': 'Get advice about your legal rights.',
                        'url': '',
                        'helper_text': 'You may qualify for free legal help.'
                      }
                    ] }
                    type='warning'/>
    )
  }
};

export default Results;