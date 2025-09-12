<h1 align="center">KLineChart Pro</h1>
<p align="center">Financial chart built out of the box based on KLineChart v10+.</p>

<div align="center">

[![Version](https://badgen.net/npm/v/@klinecharts/pro)](https://www.npmjs.com/package/@klinecharts/pro)
[![Size](https://badgen.net/bundlephobia/minzip/@klinecharts/pro@latest)](https://bundlephobia.com/package/@klinecharts/pro@latest)
[![Typescript](https://badgen.net/npm/types/@klinecharts/pro)](dist/index.d.ts)
[![LICENSE](https://badgen.net/github/license/klinecharts/pro)](LICENSE)

</div>

## ⚡ KLineChart v10 Support

This version of KLineChart Pro has been updated for compatibility with KLineChart v10+. Key improvements include:

- 🔄 **Modern DataLoader Pattern**: Replaced legacy push/pagination APIs
- 🎯 **Enhanced Tooltip Features**: Updated tooltip system with new v10 feature structure  
- 🛠️ **Improved API**: Updated to use v10 formatter and chart APIs
- 📦 **Type Safety**: Full TypeScript support for v10 types

## Install

### Using npm or yarn
```bash
# using npm - ensure klinecharts v10+
npm install klinecharts@^10.0.0-alpha9 @klinecharts/pro --save

# using yarn  
yarn add klinecharts@^10.0.0-alpha9 @klinecharts/pro
```

### Using unpkg or jsDelivr
```html
<!-- using unpkg -->
<script src="https://unpkg.com/@klinecharts/pro/dist/klinecharts-pro.umd.js"></script>

<!-- using jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/@klinecharts/pro/dist/klinecharts-pro.umd.js"></script>
```

## Quick Start

```javascript
import { KLineChartPro, DefaultDatafeed } from '@klinecharts/pro'
import '@klinecharts/pro/dist/klinecharts-pro.css'

const chart = new KLineChartPro({
  container: 'chart',
  locale: 'en-US',
  symbol: { ticker: 'AAPL', shortName: 'Apple Inc.', priceCurrency: 'usd' },
  period: { multiplier: 1, timespan: 'day', text: '1D' },
  datafeed: new DefaultDatafeed('your-polygon-api-key') // or custom datafeed
});
```

### Custom DataFeed Pattern

```javascript
class CustomDatafeed {
  async getHistoryKLineData(symbol, period, from, to) {
    // from/to are in SECONDS, return data with MS timestamps
    const response = await fetch(`/api/bars?symbol=${symbol.ticker}&from=${from}&to=${to}`);
    const data = await response.json();
    return data.map(bar => ({
      timestamp: bar.timestamp, // milliseconds
      open: bar.open,
      high: bar.high, 
      low: bar.low,
      close: bar.close,
      volume: bar.volume
    }));
  }
  
  subscribe(symbol, period, callback) {
    // Optional: real-time updates
  }
  
  unsubscribe(symbol, period) {
    // Cleanup subscriptions
  }
}
```

## Docs
+ [中文](https://pro.klinecharts.com)
+ [English](https://pro.klinecharts.com/en-US)

## ©️ License
KLineChart Pro is available under the Apache License V2.
