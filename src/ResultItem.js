const ResultItem = ( props ) => {
  let contactInfo = props.item[ 'Program Page Link (Phone # if Link is Unavailable)' ];
  if ( contactInfo.startsWith( 'http' ) ) {
    contactInfo = <a href="{ contactInfo }">{ contactInfo }</a>
  }
  return (
    <div className="block block__sub block__border-bottom block__padded-bottom">
      <h3>
        { props.item[ 'City/County/Locality'] ||
          props.item[ 'Tribal Government/Territory'] ||
          props.item[ 'State']
        }
      </h3>
      <dl>
        { props.item[ 'Geographic Level' ] !== 'Tribal Government' &&
          <div>
            <dt>State/Territory:</dt>
            <dd>
              { props.item[ 'State' ] || 
                props.item[ 'Tribal Government/Territory' ] }
            </dd>
          </div>
        }
        <div>
          <dt>Program name:</dt>
          <dd>
            { props.item[ 'Program Name' ] }
          </dd>
        </div>
        <div>
          <dt>Program type:</dt>
          <dd>
            { props.item[ 'Geographic Level' ] }
          </dd>
        </div>
        <div>
          <dt>Contact info:&nbsp;</dt>
          <dd>
            { contactInfo }
          </dd>
        </div>
      </dl>
    </div>    
  )
};

export default ResultItem;