import React from 'react';
import PropTypes from 'prop-types';
import { getStatusClass } from './utils.js';

const ResultItem = props => {
  const fields = props.fields;
  const statuses = props.statuses;
  const container = document.getElementById( 'rental-assistance-finder' );

  const statusClass = getStatusClass( props.item.status );

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
        <div className='status-row'>
          <dt>{ fields.status }:</dt>
          { ( statusClass === 'status-accepting' ) &&
            <dd className={ statusClass }>{ statuses.accepting }</dd>
          }
          { ( statusClass === 'status-waitlist' ) &&
            <dd className={ statusClass }>{ statuses.waitlist }</dd>
          }
          { ( statusClass === 'status-rolling' ) &&
            <dd className={ statusClass }>{ statuses.rolling }</dd>
          }
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
  );
};

// Validate (type check) prop types.
ResultItem.propTypes = {
  fields: PropTypes.object,
  item: PropTypes.object,
  statuses: PropTypes.object
};

export default ResultItem;
