const ResultItem = ( props ) => {
  return (
    <div className="block
                    block__sub
                    block__border-bottom
                    block__padded-bottom">
      <h3>{ props.item['Name'] }</h3>
      <dl>
        { props.item['Type'] !== 'Tribal Government' &&
          <div>
            <dt>State/Territory:</dt>
            <dd>
              { props.item['State'] }
            </dd>
          </div>
        }
        <div>
          <dt>Program name:</dt>
          <dd>
            { props.item['Program'] }
          </dd>
        </div>
        <div>
          <dt>Program type:</dt>
          <dd>
            { props.item['Type'] }
          </dd>
        </div>
        { ( props.item['URL'] || props.item['Phone'] ) &&
          <div>
            <dt>Get started:&nbsp;</dt>
            <dd>
              { props.item['URL'] &&
                <a href={ props.item['URL'] } rel='noreferrer' target='_blank'>
                  { props.item['URL'] }
                </a>
              }
              { props.item['Phone'] &&
                <span>{ props.item['Phone'] }</span>
              }
            </dd>
          </div>
        }
      </dl>
    </div>    
  )
};

export default ResultItem;