# Google Analytics & Search Console Setup Guide

This app has been configured with Google Analytics 4 (GA4) and Google Search Console integration. Follow these steps to complete the setup:

## 1. Google Analytics 4 Setup

### Get Your Measurement ID:
1. Go to [Google Analytics](https://analytics.google.com)
2. Click on **Admin** → **Property** → **Data Streams**
3. Select your web stream (create one if needed)
4. Copy your **Measurement ID** (starts with `G-`)

### Update Your App:
Replace `G-XXXXXXXXXX` with your actual Measurement ID in these files:
- **[index.html](../index.html)** - Line with `gtag('config', 'G-XXXXXXXXXX')`
- **[src/utils/googleAnalytics.js](../src/utils/googleAnalytics.js)** - `measurementId` variable

## 2. Google Search Console Setup

### Get Your Verification Code:
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property/domain
3. Choose **HTML tag** verification method
4. Copy the verification code (the part after `content="`)

### Update Your App:
Replace `YOUR_VERIFICATION_CODE_HERE` in **[index.html](../index.html)** with your verification code.

## 3. Files Modified/Created

### New Files:
- `src/utils/googleAnalytics.js` - Google Analytics utility functions

### Modified Files:
- `index.html` - Added GA script and Search Console meta tag
- `src/main.jsx` - Initialized Google Analytics
- `src/App.jsx` - Added page view tracking

## 4. Available GA Functions

Use these functions from `src/utils/googleAnalytics.js` throughout your app:

```javascript
import { trackEvent, trackUserAction } from './utils/googleAnalytics'

// Track custom events
trackEvent('button_click', { button_name: 'subscribe' })

// Track user actions
trackUserAction('engagement', 'video_play', 'festival-intro')
```

## 5. Verify Installation

After deploying:
1. Open your app in a browser
2. Go to Google Analytics → **Realtime**
3. You should see yourself visiting the site in real-time
4. Go to Google Search Console → **Coverage** to verify domain ownership

## Notes
- Google Analytics takes 24-48 hours to show historical data
- Make sure cookies are enabled for Analytics to work
- Test in incognito/private mode to ensure tracking works across different sessions
