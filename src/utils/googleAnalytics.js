import ReactGA from 'react-ga4'

// Initialize Google Analytics
export const initializeGoogleAnalytics = () => {
  // Replace with your Google Measurement ID
  const measurementId = 'G-XXXXXXXXXX' // Example: G-1234567890
  
  ReactGA.initialize(measurementId)
}

// Track page views
export const trackPageView = (pagePath) => {
  ReactGA.send({
    hitType: 'pageview',
    page: pagePath,
  })
}

// Track events
export const trackEvent = (eventName, eventData = {}) => {
  ReactGA.event(eventName, eventData)
}

// Track user actions
export const trackUserAction = (category, action, label = '') => {
  ReactGA.gtag.event(action, {
    event_category: category,
    event_label: label,
  })
}
