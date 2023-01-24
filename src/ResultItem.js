import React from 'react';
import PropTypes from 'prop-types';

const ResultItem = props => {
  const fields = props.fields;
  const container = document.getElementById( 'rental-assistance-finder' );
  const testing = container.getAttribute( 'beta-testing' ) === 'true';

  let statusClass = '';
  if ( props.item.status.includes( 'Accepting' ) ) {
    statusClass = 'status-open';
  } else if ( props.item.status.includes( 'Waitlist' ) ) {
    statusClass = 'status-waitlist';
  } else if ( props.item.status.includes( 'Unknown' ) ) {
    statusClass = 'status-unknown';
  }


  return (
    <div className='block
                    block__sub
                    block__border-bottom
                    block__padded-bottom
                    result-item'>
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
        { testing &&
        <div>
          <dt>{ fields.status }:</dt>
          <dd className={ statusClass }>{ props.item.status }</dd>
        </div>
        }
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
  );
};

// Validate (type check) prop types.
ResultItem.propTypes = {
  fields: PropTypes.object,
  item: PropTypes.object
};

export default ResultItem;
