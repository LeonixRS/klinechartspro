# KLineChart Pro - Minimal Working Example

This is a minimal working example demonstrating how to use `@klinecharts/pro` in a JavaScript/TypeScript project.

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone or download this example directory**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:8080`

You should see a financial chart displaying sample candlestick data!

## 📁 Project Structure

```
example/
├── package.json        # Project dependencies and scripts
├── index.html         # HTML page with chart container
├── main.js           # JavaScript code initializing the chart
└── README.md         # This documentation
```

## 🛠️ How It Works

### 1. Dependencies (`package.json`)

The example includes the necessary dependencies:
- `klinecharts`: The core charting library (v10+)
- `@klinecharts/pro`: The Pro version with enhanced features
- `http-server`: Simple development server

### 2. HTML Structure (`index.html`)

Simple HTML page with:
- Chart container div with id "chart"
- CSS imports for KLineChart Pro styles
- JavaScript imports for the library and your code

### 3. Chart Initialization (`main.js`)

The main JavaScript file demonstrates:

#### Custom DataFeed Implementation

```javascript
class CustomDatafeed {
  async searchSymbols(search) {
    // Return available symbols
  }

  async getHistoryKLineData(symbol, period, from, to) {
    // Return historical candlestick data
    // Note: from/to are in SECONDS, return data with MILLISECOND timestamps
  }

  subscribe(symbol, period, callback) {
    // Optional: implement real-time data updates
  }

  unsubscribe(symbol, period) {
    // Optional: cleanup real-time subscriptions
  }
}
```

#### Chart Initialization

```javascript
const chart = new klinechartspro.KLineChartPro({
  container: document.getElementById('chart'),
  symbol: {
    ticker: 'SAMPLE',
    name: 'Sample Stock Corporation',
    shortName: 'SAMPLE',
    priceCurrency: 'USD'
  },
  period: { multiplier: 1, timespan: 'day', text: '1D' },
  datafeed: new CustomDatafeed()
});
```

## 📊 Sample Data

The example uses generated sample data to demonstrate the chart functionality:
- 30 days of daily candlestick data
- Realistic OHLCV (Open, High, Low, Close, Volume) values
- Simulated real-time updates every 5 seconds

## 🎯 Key Features Demonstrated

- ✅ **Basic Chart Setup**: Container, symbol, and period configuration
- ✅ **Custom DataFeed**: Implementation without requiring external APIs
- ✅ **Static Data**: Uses dummy/sample data for demonstration
- ✅ **Real-time Updates**: Simulated live data updates
- ✅ **Error Handling**: Proper error display and console logging
- ✅ **Responsive Design**: Chart adapts to container size

## 🔧 Customization

### Modify Sample Data

Edit the `generateSampleData()` method in `main.js` to change:
- Time range (currently 30 days)
- Price range and volatility
- Volume levels
- Data interval

### Change Symbol Information

Update the `symbol` object in the chart initialization:
```javascript
symbol: {
  ticker: 'YOUR_SYMBOL',
  name: 'Your Company Name',
  shortName: 'SHORT',
  exchange: 'EXCHANGE',
  priceCurrency: 'USD'
}
```

### Adjust Time Period

Modify the `period` object:
```javascript
period: { 
  multiplier: 5,      // Number (1, 5, 15, etc.)
  timespan: 'minute', // 'minute', 'hour', 'day', 'week', 'month'
  text: '5m'         // Display text
}
```

## 🌐 Using with Real Data

To connect to real market data, replace the `CustomDatafeed` with:

### Option 1: Use DefaultDatafeed (requires Polygon.io API key)
```javascript
import { DefaultDatafeed } from '@klinecharts/pro';

const datafeed = new DefaultDatafeed('YOUR_POLYGON_API_KEY');
```

### Option 2: Implement custom API integration
```javascript
class APIDatafeed {
  async getHistoryKLineData(symbol, period, from, to) {
    const response = await fetch(`/api/bars?symbol=${symbol.ticker}&from=${from}&to=${to}`);
    const data = await response.json();
    return data.map(bar => ({
      timestamp: bar.timestamp, // Must be milliseconds
      open: bar.open,
      high: bar.high,
      low: bar.low,
      close: bar.close,
      volume: bar.volume
    }));
  }
}
```

## 📚 API Reference

### DataFeed Interface

The datafeed must implement these methods:

- `searchSymbols(search?: string): Promise<SymbolInfo[]>`
- `getHistoryKLineData(symbol, period, from, to): Promise<KLineData[]>`
- `subscribe(symbol, period, callback): void` (optional)
- `unsubscribe(symbol, period): void` (optional)

### Data Format

**KLineData format:**
```typescript
{
  timestamp: number;  // Milliseconds since epoch
  open: number;       // Opening price
  high: number;       // Highest price
  low: number;        // Lowest price
  close: number;      // Closing price
  volume?: number;    // Trading volume (optional)
}
```

**SymbolInfo format:**
```typescript
{
  ticker: string;           // Unique identifier
  name?: string;           // Full name
  shortName?: string;      // Short display name
  exchange?: string;       // Exchange name
  market?: string;         // Market type
  priceCurrency?: string;  // Currency code
  type?: string;           // Instrument type
  pricePrecision?: number; // Decimal places for price
  volumePrecision?: number; // Decimal places for volume
}
```

## 🔍 Troubleshooting

### Chart Not Displaying
- Check browser console for errors
- Ensure all files are served via HTTP (not file://)
- Verify dependencies are installed correctly

### Data Not Loading
- Check datafeed implementation
- Verify timestamp format (milliseconds, not seconds)
- Ensure data is sorted chronologically

### Real-time Updates Not Working
- Check subscribe/unsubscribe implementation
- Verify callback function is called correctly
- Check browser console for WebSocket errors

## 📄 License

This example is licensed under the Apache License 2.0, same as KLineChart Pro.

## 📞 Support

- [KLineChart Pro Documentation](https://pro.klinecharts.com/en-US)
- [GitHub Repository](https://github.com/klinecharts/pro)
- [KLineChart Core Documentation](https://klinecharts.com)

## 🎉 Next Steps

- Explore advanced chart features and overlays
- Implement real data connections
- Add custom indicators and tools
- Integrate with your trading platform or data provider