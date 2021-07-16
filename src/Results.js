import Notification from "./Notification.js";
import ResultItem from "./ResultItem.js";

const Results = ( props ) => {
	const len = props.data.length;
	if ( len > 0 ) {
		return (
			<div>
				<Notification message={`Showing ${ len } rental assistance 
				                       program${ len > 1 ? 's' : '' }`}
					            type='success' />
				{ props.data.map( ( item, index ) => (
          <ResultItem item={ item } key={ index }/>
        ) ) } 
			</div>
		)
	}
};

export default Results;