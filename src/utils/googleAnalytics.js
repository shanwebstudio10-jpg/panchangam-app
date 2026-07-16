export const trackEvent = (eventName, params = {}) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  } else {
    console.warn('G-6R3WJZRNL7:', eventName, params);
  }
};

// Common events for panchangam app
export const trackPageView = (pageType, date) => {
  trackEvent('panchangam_view', {
    page_type: pageType,
    selected_date: date,
  });
};

export const trackAdClick = (businessName, placement = 'banner') => {
  trackEvent('ad_click', {
    business_name: businessName,
    ad_placement: placement,
  });
};

export const trackDateChange = (newDate) => {
  trackEvent('date_selected', {
    selected_date: newDate,
  });
};