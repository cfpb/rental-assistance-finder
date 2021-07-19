const iconMap = {
  'success': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1200" className="cf-icon-svg"><path d="M500 105.2c-276.1 0-500 223.9-500 500s223.9 500 500 500 500-223.9 500-500-223.9-500-500-500zm259 284.2L481.4 870.3c-8.2 14.1-22.7 23.4-39 24.8-1.4.1-2.9.2-4.3.2-14.8 0-28.9-6.6-38.4-18L244.4 690.9c-17.9-21-15.4-52.6 5.7-70.5 21-17.9 52.6-15.4 70.5 5.7.2.3.5.5.7.8l109.4 131.4 241.8-418.8c13.6-24 44.2-32.4 68.2-18.8 24 13.6 32.4 44.2 18.8 68.2l-.5.5z"/></svg>,
  'warning': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1200" className="cf-icon-svg"><path d="M500 105.2c-276.1 0-500 223.9-500 500s223.9 500 500 500 500-223.9 500-500-223.9-500-500-500zm-49.7 234.6c0-27.6 22.4-50 50-50s50 22.4 50 50v328.6c0 27.6-22.4 50-50 50s-50-22.4-50-50V339.8zm50 582.5c-39.6 0-71.7-32.1-71.7-71.7s32.1-71.7 71.7-71.7S572 811 572 850.6s-32.1 71.7-71.7 71.7z"></path></svg>,
}

const Notification = ( props ) => {
  return (
    <div className={`m-notification 
                     m-notification__visible 
                     m-notification__${ props.type }`}>
      { props.type && iconMap[props.type]}
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