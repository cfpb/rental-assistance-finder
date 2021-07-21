const ResultItem = ( props ) => {
  let contact = props.item['Program Page Link (Phone # if Link is Unavailable)'];
  if ( contact.startsWith( 'http' ) ) {
    contact = <a href='{ contact }' rel='noreferrer' target='_blank'>{ contact }</a>
  }
  return (
    <div className="block
                    block__sub
                    block__border-bottom
                    block__padded-bottom">
      <h3>
        { props.item['City/County/Locality'] ||
          props.item['Tribal Government/Territory'] ||
          props.item['State']
        }
      </h3>
      <dl>
        { props.item['Geographic Level'] !== 'Tribal Government' &&
          <div>
            <dt>State/Territory:</dt>
            <dd>
              { props.item['State'] || 
                props.item['Tribal Government/Territory'] }
            </dd>
          </div>
        }
        <div>
          <dt>Program name:</dt>
          <dd>
            { props.item['Program Name'] }
          </dd>
        </div>
        <div>
          <dt>Program type:</dt>
          <dd>
            { props.item['Geographic Level'] }
          </dd>
        </div>
        <div>
          <dt>Get started:&nbsp;</dt>
          <dd>
            { contact }
          </dd>
        </div>
      </dl>
    </div>    
  )
};

export default ResultItem;