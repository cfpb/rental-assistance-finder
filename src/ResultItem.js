const ResultItem = ( props ) => {
  const fields = props.fields;
  return (
    <div className="block
                    block__sub
                    block__border-bottom
                    block__padded-bottom">
      <h3>{ props.item.name }</h3>
      <dl>
        { props.item.type !== 'Tribal Government' &&
          <div>
            <dt>{ fields.state }:</dt>
            <dd>
              { props.item.state }
            </dd>
          </div>
        }
        <div>
          <dt>{ fields.name }:</dt>
          <dd>
            { props.item.program }
          </dd>
        </div>
        <div>
          <dt>{ fields.type }:</dt>
          <dd>
            { props.item.type }
          </dd>
        </div>
        { ( props.item.url || props.item.phone ) &&
          <div>
            <dt>{ fields.contact }:&nbsp;</dt>
            <dd>
              { props.item.url &&
                <a href={ props.item.url } rel='noreferrer' target='_blank'>
                  { props.item.url }
                </a>
              }
              { props.item.phone &&
                <span>{ props.item.phone }</span>
              }
            </dd>
          </div>
        }
      </dl>
    </div>    
  )
};

export default ResultItem;