import Notification from "./Notification.js";
import ResultItem from "./ResultItem.js";

const Results = ( props ) => {
  const data = [ ...props.geographic, ...props.tribal ];
  const len = data.length;
  if ( len > 0 ) {
    return (
      <div>
        <Notification message={`Showing ${ len } rental assistance 
                                program${ len > 1 ? 's' : '' }`}
                      type='success' />
        { data.map( ( item, index ) => (
          <ResultItem item={ item } key={ index }/>
        ) ) } 
      </div>
    )
  } else {
    return ( 
      <Notification message='No results'
                    type='warning' /> 
    );
  }
  
};

export default Results;