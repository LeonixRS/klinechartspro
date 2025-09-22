// Import KLineChart Pro and its CSS
import { KLineChartPro } from '@klinecharts/pro'
import '@klinecharts/pro/dist/klinecharts-pro.css'

// Custom dummy datafeed that provides static sample data
class DummyDatafeed {
  constructor() {
    this.subscriptions = new Map()
  }

  // Search for symbols - returns sample symbols
  async searchSymbols(search = '') {
    const symbols = [
      {
        ticker: 'AAPL',
        name: 'Apple Inc.',
        shortName: 'Apple',
        exchange: 'NASDAQ',
        market: 'stocks',
        priceCurrency: 'USD',
        type: 'Common Stock'
      },
      {
        ticker: 'GOOGL',
        name: 'Alphabet Inc.',
        shortName: 'Google',
        exchange: 'NASDAQ',
        market: 'stocks',
        priceCurrency: 'USD',
        type: 'Common Stock'
      },
      {
        ticker: 'MSFT',
        name: 'Microsoft Corporation',
        shortName: 'Microsoft',
        exchange: 'NASDAQ',
        market: 'stocks',
        priceCurrency: 'USD',
        type: 'Common Stock'
      }
    ]

    // Filter symbols based on search term
    if (search) {
      return symbols.filter(symbol => 
        symbol.ticker.toLowerCase().includes(search.toLowerCase()) ||
        symbol.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    return symbols
  }

  // Generate dummy OHLC data
  generateDummyData(from, to, intervalMs = 60000) { // 1 minute intervals by default
    const data = []
    let currentTime = from
    let basePrice = 150 + Math.random() * 50 // Random base price between 150-200
    
    while (currentTime <= to) {
      // Generate realistic OHLC data with some volatility
      const change = (Math.random() - 0.5) * 4 // Random change between -2 and +2
      const open = basePrice
      const close = Math.max(0.01, basePrice + change)
      
      // High and low based on open/close with some random variation
      const high = Math.max(open, close) + Math.random() * 2
      const low = Math.min(open, close) - Math.random() * 2
      
      // Volume between 10K and 1M
      const volume = Math.floor(Math.random() * 990000) + 10000
      
      data.push({
        timestamp: currentTime,
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(Math.max(0.01, low).toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        volume: volume
      })
      
      basePrice = close // Next candle starts where this one ended
      currentTime += intervalMs
    }
    
    return data
  }

  // Get historical candlestick data
  async getHistoryKLineData(symbol, period, from, to) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Calculate interval in milliseconds based on period
    let intervalMs = period.multiplier * 60000 // Default to minutes
    
    switch (period.timespan) {
      case 'second':
        intervalMs = period.multiplier * 1000
        break
      case 'minute':
        intervalMs = period.multiplier * 60000
        break
      case 'hour':
        intervalMs = period.multiplier * 3600000
        break
      case 'day':
        intervalMs = period.multiplier * 86400000
        break
      case 'week':
        intervalMs = period.multiplier * 604800000
        break
      case 'month':
        intervalMs = period.multiplier * 2629746000 // Approximate month
        break
    }
    
    return this.generateDummyData(from, to, intervalMs)
  }

  // Subscribe to real-time data updates (dummy implementation)
  subscribe(symbol, period, callback) {
    const key = `${symbol.ticker}-${period.text}`
    
    // Simulate real-time updates every 5 seconds
    const interval = setInterval(() => {
      const now = Date.now()
      const data = this.generateDummyData(now - 60000, now, 60000)
      if (data.length > 0) {
        callback(data[data.length - 1])
      }
    }, 5000)
    
    this.subscriptions.set(key, interval)
  }

  // Unsubscribe from real-time data updates
  unsubscribe(symbol, period) {
    const key = `${symbol.ticker}-${period.text}`
    const interval = this.subscriptions.get(key)
    
    if (interval) {
      clearInterval(interval)
      this.subscriptions.delete(key)
    }
  }
}

// Initialize the chart when the page loads
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Create the chart instance
    const chart = new KLineChartPro({
      container: document.getElementById('chart'),
      symbol: {
        ticker: 'AAPL',
        name: 'Apple Inc.',
        shortName: 'Apple',
        exchange: 'NASDAQ',
        market: 'stocks',
        priceCurrency: 'USD',
        type: 'Common Stock'
      },
      period: {
        multiplier: 15,
        timespan: 'minute',
        text: '15m'
      },
      periods: [
        { multiplier: 1, timespan: 'minute', text: '1m' },
        { multiplier: 5, timespan: 'minute', text: '5m' },
        { multiplier: 15, timespan: 'minute', text: '15m' },
        { multiplier: 30, timespan: 'minute', text: '30m' },
        { multiplier: 1, timespan: 'hour', text: '1h' },
        { multiplier: 4, timespan: 'hour', text: '4h' },
        { multiplier: 1, timespan: 'day', text: '1D' },
        { multiplier: 1, timespan: 'week', text: '1W' }
      ],
      datafeed: new DummyDatafeed(),
      locale: 'en-US',
      watermark: 'KLineChart Pro Demo'
    })

    console.log('KLineChart Pro initialized successfully!')
    
    // You can interact with the chart using the returned instance
    // For example:
    // chart.setTheme('dark')
    // chart.setSymbol({ ticker: 'GOOGL', name: 'Alphabet Inc.' })
    
  } catch (error) {
    console.error('Error initializing KLineChart Pro:', error)
    
    // Display error message to user
    const chartContainer = document.getElementById('chart')
    chartContainer.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #e74c3c; font-size: 18px;">
        <div>
          <h3>Error loading chart</h3>
          <p>Please check the console for details.</p>
          <p style="font-size: 14px; color: #7f8c8d;">Make sure all dependencies are properly installed.</p>
        </div>
      </div>
    `
  }
})