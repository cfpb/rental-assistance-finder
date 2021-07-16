const Notification = ( props ) => {
  return (
    <div className={`m-notification 
                     m-notification__visible 
                     m-notification__${ props.type }`}>
      <div className="m-notification_content"
           role={ ['warning', 'error'].includes( props.type ) ?  'alert' : undefined }>
        <div className="h4 m-notification_message">{ props.message }</div>
      </div>
    </div>
  );
};

export default Notification;