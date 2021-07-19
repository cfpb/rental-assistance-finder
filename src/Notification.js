const Notification = ( props ) => {
  return (
    <div className={`m-notification 
                     m-notification__visible 
                     m-notification__${ props.type }`}>
      <div className="m-notification_content"
           role={ ['warning', 'error'].includes( props.type ) ?  'alert' : undefined }>
        <div className="h4 m-notification_message">{ props.message }</div>
        { props.explanation &&
          <div className="m-notification_explanation">{ props.explanation }</div>
        }
        { props.links &&
          <ul className="m-list m-list__links">
            { props.links.map( ( item, index ) => (
              <li className="m-list_item" key={ index }>
                <a className="m-list_link" href="{ item.url }">
                  { item.text }
                </a>
                { item.helper_text ? item.helper_text : '' }
              </li>
            ) ) }
          </ul>
        }
      </div>
    </div>
  );
};

export default Notification;