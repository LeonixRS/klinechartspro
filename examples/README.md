# KLineChart Pro Examples

This directory contains minimal working examples of using `@klinecharts/pro` in different environments.

## Examples Overview

### 1. Basic Example (`basic/`)
A complete npm-based project showing how to use KLineChart Pro in a modern JavaScript/TypeScript development environment.

**Features:**
- Vite build setup
- ES6 modules and imports
- Custom dummy datafeed implementation
- Multiple time periods and symbols
- Production build support

**Best for:** Modern web applications, React/Vue/Angular projects, TypeScript projects

### 2. CDN Example (`cdn/`)  
A simple HTML file demonstrating how to use KLineChart Pro directly via CDN without any build tools.

**Features:**
- No build process required
- Works in any browser immediately
- Global object usage
- Self-contained single file

**Best for:** Quick prototypes, legacy projects, simple integrations

## Quick Start

### For the Basic Example:
```bash
cd examples/basic
npm install
npm run dev
```

### For the CDN Example:
Simply open `examples/cdn/index.html` in your browser.

## Common Features

Both examples include:
- ✅ Dummy datafeed with realistic OHLC data
- ✅ Multiple symbol support (AAPL, GOOGL, MSFT)
- ✅ Various time periods (1m, 5m, 15m, 30m, 1h, 4h, 1D, 1W)
- ✅ Simulated real-time data updates
- ✅ Responsive chart container
- ✅ Error handling and user feedback
- ✅ Comprehensive documentation

## Data Sources

The examples use a custom `DummyDatafeed` class that generates realistic market data. In production, you would replace this with:

### Option 1: Polygon.io (Default)
```javascript
import { DefaultDatafeed } from '@klinecharts/pro'
const datafeed = new DefaultDatafeed('YOUR_API_KEY')
```

### Option 2: Custom API
Implement the `Datafeed` interface:
```javascript
class CustomDatafeed {
  async searchSymbols(search) { /* ... */ }
  async getHistoryKLineData(symbol, period, from, to) { /* ... */ }
  subscribe(symbol, period, callback) { /* ... */ }
  unsubscribe(symbol, period) { /* ... */ }
}
```

## Dependencies

### Core Dependencies
- `klinecharts@^10.0.0-alpha9` - Core charting library
- `@klinecharts/pro` - Pro version with additional features

### Development Dependencies  
- `vite` - Build tool and dev server (basic example only)

## Browser Support

All examples work in modern browsers supporting:
- ES6+ features
- Canvas 2D rendering
- WebSocket (for real-time data)

**Supported browsers:**
- Chrome 61+
- Firefox 60+
- Safari 12+
- Edge 79+

## API Reference

For complete documentation:
- [KLineChart Pro Docs](https://pro.klinecharts.com/en-US)
- [Getting Started Guide](https://pro.klinecharts.com/en-US/getting-started)
- [API Reference](https://pro.klinecharts.com/en-US/api)

## Contributing

When adding new examples:

1. Create a new directory under `examples/`
2. Include a comprehensive `README.md`
3. Ensure the example is minimal but complete
4. Use the same dummy datafeed pattern for consistency
5. Test in multiple browsers
6. Update this main README

## Troubleshooting

### Common Issues

**Chart not displaying:**
- Check browser console for errors
- Verify container element exists
- Ensure CSS is loaded

**Build errors:**
- Check Node.js version (14+ required)
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall

**Data not loading:**
- Verify datafeed implementation
- Check network requests in dev tools
- Ensure proper async/await usage

### Getting Help

- Check the [documentation](https://pro.klinecharts.com/en-US)
- Look at browser dev tools console
- Compare with working examples
- Create an issue on GitHub