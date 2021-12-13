const Analytics = {
  tagManagerIsLoaded: false,
  EVENT_CATEGORY: 'Page Interaction',

  /**
   * Get data layer object.
   * @param {string} action Name of event.
   * @param {string} label DOM element label.
   * @param {string} category Type of event.
   * @returns {object} Data layer object.
   */
  getDataLayerOptions: function( action, label, category ) {
    return {
      event:         category || Analytics.EVENT_CATEGORY,
      action:        action,
      label:         label || ''
    };
  },

  /**
   * Initialize the Analytics module.
   */
  init: function() {
    // detect if Google tag manager is loaded
    if ( window.hasOwnProperty( 'google_tag_manager' ) ) {
      Analytics.tagManagerIsLoaded = true;
    } else {
      let _tagManager;
      Object.defineProperty( window, 'google_tag_manager', {
        enumerable: true,
        configurable: true,
        get: function() {
          return _tagManager;
        },
        set: function( value ) {
          _tagManager = value;
          if ( !Analytics.tagManagerIsLoaded ) {
            Analytics.tagManagerIsLoaded = true;
          }
        }
      } );
    }
  },

  /**
   * @name sendEvent
   * @kind function
   *
   * @description
   * Pushes an event to the GTM dataLayer.
   * @param {object} dataLayerOptions Type of event.
   */
  sendEvent: function( dataLayerOptions ) {
    if ( Analytics.tagManagerIsLoaded ) {
      window.dataLayer.push( dataLayerOptions );
    }
  }

};

Analytics.init();

export default Analytics;
