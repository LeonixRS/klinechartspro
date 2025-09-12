# Getting started

::: info KLineChart v10 Compatibility
This version of @klinecharts/pro is compatible with KLineChart v10+. For v9 compatibility, use an earlier version of this package.
:::

## Installing
Use npm or yarn
```bash
# npm - ensure you have klinecharts v10+
npm install klinecharts@^10.0.0-alpha9 @klinecharts/pro

# yarn
yarn add klinecharts@^10.0.0-alpha9 @klinecharts/pro
```
If it is imported directly through a script tag, you can use either of the following two CDNs
::: warning Note
For production environments, it is recommended to use a clear version number to avoid unexpected damage caused by new versions.
:::

```html
<!-- unpkg -->
<script src="https://unpkg.com/@klinecharts/pro/dist/klinecharts-pro.umd.js"></script>

<!-- jsdelivr -->
<script src="https://cdn.jsdelivr.net/@klinecharts/pro/dist/klinecharts-pro.umd.js"></script>
```

## Usage
### Step 1: Create a container
```html
<div id="container"></div>
```
### Step 2: Create an instance
In projects using package managers such as npm and yarn
```javascript
// Import js
import { KLineChartPro, DefaultDatafeed } from '@klinecharts/pro'
// Import css
import '@klinecharts/pro/dist/klinecharts-pro.css'

// Create Instance
const chart = new KLineChartPro({
  container: document.getElementById('container'),
  // Default symbol info
  symbol: {
    exchange: 'XNYS',
    market: 'stocks',
    name: 'Alibaba Group Holding Limited American Depositary Shares, each represents eight Ordinary Shares',
    shortName: 'BABA',
    ticker: 'BABA',
    priceCurrency: 'usd',
    type: 'ADRC',
  },
  // Default period
  period: { multiplier: 15, timespan: 'minute', text: '15m' },
  // The default data access is used here. If the default data is also used in actual use, you need to go to the https://polygon.io/ apply for API key
  datafeed: new DefaultDatafeed(`${polygonIoApiKey}`)
})
```

In projects introduced directly through script tags
```html
<!-- Import js -->
<script src="https://cdn.jsdelivr.net/@klinecharts/pro/dist/klinecharts-pro.umd.js"></script>

<!-- Import css -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/@klinecharts/pro/dist/klinecharts-pro.css"/>
<script>
  // Create Instance
  const chart = new klinechartspro.KLineChartPro({
    container: document.getElementById('container'),
    // Default symbol info
    symbol: {
      exchange: 'XNYS',
      market: 'stocks',
      name: 'Alibaba Group Holding Limited American Depositary Shares, each represents eight Ordinary Shares',
      shortName: 'BABA',
      ticker: 'BABA',
      priceCurrency: 'usd',
      type: 'ADRC',
    },
    // Default period
    period: { multiplier: 15, timespan: 'minute', text: '15m' },
    // The default data access is used here. If the default data is also used in actual use, you need to go to the https://polygon.io/ apply for API key
    datafeed: new klinechartspro.DefaultDatafeed(`${polygonIoApiKey}`)
  })
</script>
```
The first chart is created. Working <a href="https://jsfiddle.net/mawsyh/ct65rysp/20/" target="_blank">example</a>

## DataFeed Implementation Guide

KLineChart Pro uses a DataFeed pattern for data access. You can either use the included `DefaultDatafeed` for Polygon.io data, or implement your own custom datafeed.

### Custom DataFeed Example

```javascript
class CustomDatafeed {
  async searchSymbols(search) {
    // Return array of symbol objects matching search
    return [];
  }

  async getHistoryKLineData(symbol, period, from, to) {
    // NOTE: Pro passes from/to in SECONDS; return bars with MS timestamps
    const res = await fetch(`/api/bars?symbol=${symbol.ticker}&tf=${period.text}&from=${from}&to=${to}`);
    const rows = await res.json();
    return rows.map(r => ({
      timestamp: Number(r.timestamp), // must be ms
      open: +r.open, 
      high: +r.high, 
      low: +r.low, 
      close: +r.close, 
      volume: +(r.volume ?? 0)
    })).sort((a, b) => a.timestamp - b.timestamp);
  }

  subscribe(symbol, period, callback) {
    // Optional realtime updates
    this.ws = new WebSocket(`wss://example.com/stream?symbol=${symbol.ticker}&tf=${period.text}`);
    this.ws.onmessage = (e) => callback(JSON.parse(e.data));
  }
  
  unsubscribe(symbol, period) {
    try { this.ws?.close(); } catch {}
  }
}

const chart = new KLineChartPro({
  container: 'chart',
  locale: 'en-US',
  symbol: { ticker: 'TEST', shortName: 'Test', priceCurrency: 'usd' },
  period: { multiplier: 1, timespan: 'day', text: '1D' },
  datafeed: new CustomDatafeed()
});
```

## Common Pitfalls

::: warning Timestamp Format
**Most common issue**: Pro expects millisecond timestamps in returned data, but passes from/to parameters in **seconds**. Make sure to:
- Convert from/to (seconds) → milliseconds when querying your API
- Return bars with millisecond timestamps
- Return bars in ascending chronological order
- Return empty array `[]` when no more historical data is available
:::

::: warning Realtime Data
For realtime updates:
- Ensure single-bar shape (not arrays) in subscribe callback
- Use millisecond timestamps
- Updates should represent the latest/current bar state
:::

## Migration from KLineChart v9

If you're upgrading from v9, note that Pro v10 no longer supports:
- `chart.loadMore()` / `chart.setLoadMoreData()` 
- `chart.applyNewData()` / `chart.updateData()`
- Custom precision setters (`setPriceVolumePrecision`)

These are now handled automatically through the DataFeed pattern and internal v10 APIs.
