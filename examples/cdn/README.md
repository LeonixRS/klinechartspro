# KLineChart Pro - CDN Example

This example demonstrates how to use KLineChart Pro directly in the browser via CDN without any build tools or package managers.

## Overview

This example shows:
- How to include KLineChart Pro via CDN links
- How to use the library in a plain HTML environment
- Basic chart configuration with dummy data
- Real-time data simulation without external APIs

## Files

- `index.html` - Complete self-contained example

## Usage

Simply open `index.html` in any modern web browser. No installation or build process required!

Alternatively, you can serve it with any HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## CDN Resources

This example uses the following CDN resources:

### CSS
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/@klinecharts/pro/dist/klinecharts-pro.css"/>
```

### JavaScript
```html
<script src="https://cdn.jsdelivr.net/@klinecharts/pro/dist/klinecharts-pro.umd.js"></script>
```

## Key Differences from NPM Version

1. **Global Object**: The library is available as `klinechartspro` global object
2. **No Import Statements**: Direct script inclusion instead of ES6 imports  
3. **No Build Process**: Ready to run in any browser immediately

## API Usage

```javascript
// Create chart instance
const chart = new klinechartspro.KLineChartPro({
  container: document.getElementById('chart'),
  symbol: { ticker: 'AAPL', name: 'Apple Inc.' },
  period: { multiplier: 15, timespan: 'minute', text: '15m' },
  datafeed: new DummyDatafeed()
})

// You can still use all the same methods
chart.setTheme('dark')
chart.setSymbol({ ticker: 'GOOGL', name: 'Google' })
```

## Browser Compatibility

Works in all modern browsers:
- Chrome 61+
- Firefox 60+  
- Safari 12+
- Edge 79+

## Production Considerations

For production use:

1. **Pin Versions**: Use specific version numbers in CDN URLs
   ```html
   <script src="https://cdn.jsdelivr.net/@klinecharts/pro@0.1.1/dist/klinecharts-pro.umd.js"></script>
   ```

2. **Host Locally**: Download and host the files yourself for better performance and reliability

3. **Fallback**: Consider providing fallbacks if CDN is unavailable
   ```html
   <script src="https://cdn.jsdelivr.net/@klinecharts/pro/dist/klinecharts-pro.umd.js"></script>
   <script>
     if (typeof klinechartspro === 'undefined') {
       // Load local fallback
       document.write('<script src="./lib/klinecharts-pro.umd.js"><\/script>');
     }
   </script>
   ```

## Customization

The example includes the same dummy datafeed implementation as the NPM version, providing:
- Realistic OHLC data generation
- Multiple symbol support (AAPL, GOOGL, MSFT)  
- Simulated real-time updates
- Proper error handling

You can easily replace the dummy datafeed with real data sources by implementing the same interface.