const ResultItem = ( props ) => {
	return (
		<div className="block block__sub block__border-bottom block__padded-bottom">
			<h2>{ props.item['Program Name'] }</h2>
		</div>		
 	)
};

export default ResultItem;