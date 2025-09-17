# KLineChart Pro - Basic Example

This is a minimal working example demonstrating how to use `@klinecharts/pro` in a JavaScript/TypeScript project.

## Overview

This example shows:
- How to install and import KLineChart Pro
- How to create a basic chart with dummy data
- How to implement a custom datafeed for static data
- Basic chart configuration and initialization

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## Installation

1. Clone this repository or copy the example files
2. Navigate to the example directory:
   ```bash
   cd examples/basic
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Example

Start the development server:
```bash
npm run dev
```

Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`).

## File Structure

```
basic/
├── package.json          # Project dependencies and scripts
├── index.html            # Main HTML file with chart container
├── main.js               # Chart initialization and dummy datafeed
└── README.md             # This file
```

## Key Components

### Dependencies

The example uses these key dependencies:
- `klinecharts@^10.0.0-alpha9` - The core charting library
- `@klinecharts/pro@^0.1.1` - The pro version with additional features
- `vite@^4.3.0` - Development server and build tool

### Custom Datafeed

The example implements a `DummyDatafeed` class that provides:
- Sample symbol search results (AAPL, GOOGL, MSFT)
- Generated OHLC (Open, High, Low, Close) candlestick data
- Simulated real-time data updates
- Proper implementation of the Datafeed interface

### Chart Configuration

The chart is configured with:
- Multiple time periods (1m, 5m, 15m, 30m, 1h, 4h, 1D, 1W)
- Sample AAPL symbol data
- English locale
- Custom watermark
- Responsive container

## Using Real Data

To use real market data instead of dummy data, you have several options:

### Option 1: Polygon.io (Default Provider)
```javascript
import { DefaultDatafeed } from '@klinecharts/pro'

const chart = new KLineChartPro({
  // ... other options
  datafeed: new DefaultDatafeed('YOUR_POLYGON_API_KEY')
})
```

### Option 2: Custom API
Implement your own datafeed by extending the Datafeed interface:

```javascript
class CustomDatafeed {
  async searchSymbols(search) {
    // Implement symbol search
  }
  
  async getHistoryKLineData(symbol, period, from, to) {
    // Fetch historical data from your API
  }
  
  subscribe(symbol, period, callback) {
    // Implement real-time data subscription
  }
  
  unsubscribe(symbol, period) {
    // Implement unsubscription
  }
}
```

## Customization

### Themes
```javascript
// Set theme
chart.setTheme('dark') // or 'light'
```

### Styling
```javascript
chart.setStyles({
  candle: {
    priceMark: {
      high: { color: '#26A69A' },
      low: { color: '#EF5350' }
    }
  }
})
```

### Changing Symbol
```javascript
chart.setSymbol({
  ticker: 'GOOGL',
  name: 'Alphabet Inc.',
  shortName: 'Google',
  exchange: 'NASDAQ',
  market: 'stocks',
  priceCurrency: 'USD',
  type: 'Common Stock'
})
```

## Building for Production

Build the project for production:
```bash
npm run build
```

This creates a `dist` directory with optimized files ready for deployment.

## Browser Support

KLineChart Pro supports modern browsers that support ES6+ features:
- Chrome 61+
- Firefox 60+
- Safari 12+
- Edge 79+

## API Reference

For complete API documentation, visit:
- [KLineChart Pro Documentation](https://pro.klinecharts.com/en-US)
- [Getting Started Guide](https://pro.klinecharts.com/en-US/getting-started)

## Troubleshooting

### Chart Not Displaying
1. Check browser console for errors
2. Ensure all dependencies are installed
3. Verify the container element exists
4. Check that CSS is properly imported

### Data Not Loading
1. Verify your datafeed implementation
2. Check network requests in browser dev tools
3. Ensure proper error handling in datafeed methods

### Performance Issues
1. Limit the amount of historical data loaded
2. Implement proper data pagination
3. Use appropriate time intervals for your use case

## License

This example is provided under the same license as KLineChart Pro (Apache License 2.0).