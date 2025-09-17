# KLineChart Pro - Minimal Examples

This directory contains minimal examples demonstrating how to use **@klinecharts/pro** in a simple web application. The examples show both CDN and npm installation methods using the latest stable version (v0.1.1).

## 📁 Examples

### 1. CDN Example (`index.html`)
A simple HTML file that loads KLineChart Pro via CDN - perfect for quick prototyping or static websites.

**Features:**
- No build process required
- Direct browser loading via CDN
- Self-contained single HTML file
- Mock financial data
- Custom datafeed implementation

### 2. NPM Example (`npm-example/`)
A modern development setup using npm packages and Vite bundler.

**Features:**
- ES6 modules and modern JavaScript
- NPM package management
- Vite development server with hot reload
- Build optimization for production
- TypeScript-style imports

## 🚀 Quick Start

### Option 1: CDN Example (Simplest)

1. Open `index.html` directly in your browser
2. That's it! The chart should load with sample financial data.

### Option 2: NPM Example (Recommended for development)

1. Navigate to the npm-example directory:
   ```bash
   cd npm-example
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open your browser to the local development URL (usually `http://localhost:5173`)

## 📦 Installation Methods

### CDN Installation

Add these lines to your HTML:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/@klinecharts/pro/dist/klinecharts-pro.css"/>

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/@klinecharts/pro/dist/klinecharts-pro.umd.js"></script>
```

### NPM Installation

```bash
# Install both klinecharts and @klinecharts/pro
npm install klinecharts@^9.8.12 @klinecharts/pro
```

Then import in your JavaScript:

```javascript
import { KLineChartPro } from '@klinecharts/pro'
import '@klinecharts/pro/dist/klinecharts-pro.css'
```

## 🔧 Basic Usage

### 1. Create a container

```html
<div id="chart" style="height: 500px;"></div>
```

### 2. Implement a datafeed

```javascript
class CustomDatafeed {
    async searchSymbols(search) {
        // Return array of symbol objects
        return [];
    }

    async getHistoryKLineData(symbol, period, from, to) {
        // Return historical candlestick data
        // Note: from/to are in SECONDS, but return data with MILLISECOND timestamps
        return [
            {
                timestamp: Date.now(), // milliseconds
                open: 100,
                high: 105,
                low: 95,
                close: 102,
                volume: 1000000
            }
        ];
    }

    subscribe(symbol, period, callback) {
        // Optional: real-time data subscription
    }

    unsubscribe(symbol, period) {
        // Optional: cleanup subscriptions
    }
}
```

### 3. Initialize the chart

```javascript
const chart = new KLineChartPro({
    container: document.getElementById('chart'),
    symbol: {
        ticker: 'AAPL',
        name: 'Apple Inc.',
        shortName: 'AAPL',
        exchange: 'NASDAQ',
        market: 'stocks',
        priceCurrency: 'usd',
        type: 'stock'
    },
    period: { multiplier: 1, timespan: 'day', text: '1D' },
    datafeed: new CustomDatafeed()
});
```

## 📊 Sample Data Format

KLineChart Pro expects data in this format:

```javascript
{
    timestamp: 1640995200000,  // Unix timestamp in milliseconds
    open: 150.0,               // Opening price
    high: 155.0,               // Highest price
    low: 148.0,                // Lowest price
    close: 152.0,              // Closing price
    volume: 1000000            // Trading volume
}
```

## ⚠️ Important Notes

### Timestamp Format
- **DataFeed methods receive `from`/`to` parameters in SECONDS**
- **But must return data with timestamps in MILLISECONDS**
- Data should be returned in ascending chronological order

### Real Data vs Mock Data
These examples use mock data for demonstration. For real trading data:

1. **Use DefaultDatafeed**: Requires a [Polygon.io](https://polygon.io/) API key
   ```javascript
   import { DefaultDatafeed } from '@klinecharts/pro'
   datafeed: new DefaultDatafeed('your-polygon-api-key')
   ```

2. **Implement custom datafeed**: Connect to your own data source (recommended)

## 🛠️ Development Commands (NPM Example)

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📚 Additional Resources

- [Official Documentation](https://pro.klinecharts.com/en-US)
- [KLineChart v10 Documentation](https://klinecharts.com)
- [GitHub Repository](https://github.com/klinecharts/pro)
- [NPM Package](https://www.npmjs.com/package/@klinecharts/pro)

## 🐛 Troubleshooting

### Common Issues

1. **Chart not loading**: Check browser console for errors
2. **No data showing**: Verify datafeed implementation returns valid data format
3. **Build errors**: Ensure all dependencies are installed correctly

### Dependencies
- **klinecharts**: v9.8.12 or higher (peer dependency)
- **@klinecharts/pro**: v0.1.1 or higher

## 📄 License

This example is provided under the same license as KLineChart Pro (Apache License 2.0).