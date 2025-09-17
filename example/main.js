// Custom datafeed implementation with static dummy data
class CustomDatafeed {
  constructor() {
    // Generate sample OHLCV data for demonstration
    this.sampleData = this.generateSampleData();
  }

  /**
   * Generate sample candlestick data
   * Creates realistic-looking OHLCV data for demonstration purposes
   */
  generateSampleData() {
    const data = [];
    const startTime = Date.now() - (30 * 24 * 60 * 60 * 1000); // 30 days ago
    const interval = 24 * 60 * 60 * 1000; // 1 day interval
    let price = 100; // Starting price

    for (let i = 0; i < 30; i++) {
      const timestamp = startTime + (i * interval);
      
      // Generate random price movement
      const change = (Math.random() - 0.5) * 4; // Random change between -2 and +2
      const open = price;
      const close = price + change;
      
      // Generate high and low around open/close
      const high = Math.max(open, close) + Math.random() * 2;
      const low = Math.min(open, close) - Math.random() * 2;
      
      // Generate random volume
      const volume = Math.floor(Math.random() * 1000000) + 100000;

      data.push({
        timestamp: timestamp,
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        volume: volume
      });

      price = close; // Update price for next iteration
    }

    return data.sort((a, b) => a.timestamp - b.timestamp);
  }

  /**
   * Search for symbols (required by datafeed interface)
   * Returns array of available symbols
   */
  async searchSymbols(search) {
    // Return a promise that resolves with the symbols
    return new Promise((resolve) => {
      // Return a list of sample symbols
      const symbols = [
        {
          ticker: 'SAMPLE',
          name: 'Sample Stock',
          shortName: 'SAMPLE',
          exchange: 'DEMO',
          market: 'stocks',
          priceCurrency: 'USD',
          type: 'stock',
          pricePrecision: 2,
          volumePrecision: 0
        },
        {
          ticker: 'DEMO',
          name: 'Demo Corporation',
          shortName: 'DEMO',
          exchange: 'DEMO',
          market: 'stocks',
          priceCurrency: 'USD',
          type: 'stock',
          pricePrecision: 2,
          volumePrecision: 0
        }
      ];

      // Filter symbols based on search query
      if (search) {
        const filtered = symbols.filter(symbol => 
          symbol.ticker.toLowerCase().includes(search.toLowerCase()) ||
          symbol.name.toLowerCase().includes(search.toLowerCase())
        );
        resolve(filtered);
      } else {
        resolve(symbols);
      }
    });
  }

  /**
   * Get historical K-line data (required by datafeed interface)
   * Returns candlestick data for the specified symbol and time range
   * Note: from and to are in SECONDS, but return timestamps should be in MILLISECONDS
   */
  async getHistoryKLineData(symbol, period, from, to) {
    // Convert from and to from SECONDS to MILLISECONDS for filtering
    const fromMs = from * 1000;
    const toMs = to * 1000;

    console.log(`Getting history data for ${symbol.ticker} from ${new Date(fromMs)} to ${new Date(toMs)}`);

    // Return a promise that resolves with the filtered data
    return new Promise((resolve) => {
      // Filter data based on time range
      const filteredData = this.sampleData.filter(item => 
        item.timestamp >= fromMs && item.timestamp <= toMs
      );

      // Return data sorted by timestamp
      resolve(filteredData.sort((a, b) => a.timestamp - b.timestamp));
    });
  }

  /**
   * Subscribe to real-time data (optional)
   * For this example, we'll simulate some updates
   */
  subscribe(symbol, period, callback) {
    console.log(`Subscribing to real-time data for ${symbol.ticker}`);
    
    // Simulate real-time updates every 5 seconds
    this.intervalId = setInterval(() => {
      // Get the last data point and create an update
      const lastData = this.sampleData[this.sampleData.length - 1];
      if (lastData) {
        const change = (Math.random() - 0.5) * 2; // Random change
        const newClose = lastData.close + change;
        
        const updatedData = {
          ...lastData,
          timestamp: Date.now(), // Current time
          close: parseFloat(newClose.toFixed(2)),
          high: Math.max(lastData.high, newClose),
          low: Math.min(lastData.low, newClose),
          volume: lastData.volume + Math.floor(Math.random() * 10000)
        };
        
        console.log('Sending real-time update:', updatedData);
        callback(updatedData);
      }
    }, 5000);
  }

  /**
   * Unsubscribe from real-time data (optional)
   */
  unsubscribe(symbol, period) {
    console.log(`Unsubscribing from real-time data for ${symbol.ticker}`);
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Initialize the chart when the page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing KLineChart Pro...');

  try {
    // Create a basic chart with DefaultDatafeed (even though we don't have a real API key)
    const chart = new klinechartspro.KLineChartPro({
      container: document.getElementById('chart'),
      symbol: {
        ticker: 'AAPL',
        shortName: 'Apple Inc.',
        priceCurrency: 'USD'
      },
      period: { 
        multiplier: 1, 
        timespan: 'day', 
        text: '1D' 
      },
      locale: 'en-US',
      datafeed: new klinechartspro.DefaultDatafeed('demo-key') // Use dummy API key
    });

    console.log('KLineChart Pro initialized successfully!');
    
    // Make chart available globally for debugging
    window.chart = chart;

  } catch (error) {
    console.error('Failed to initialize KLineChart Pro:', error);
    
    // Show error message to user
    const chartContainer = document.getElementById('chart');
    chartContainer.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #e74c3c; font-size: 16px;">
        <div>
          <h3>Failed to initialize chart</h3>
          <p>Error: ${error.message}</p>
          <p>Please check the console for more details.</p>
        </div>
      </div>
    `;
  }
});

// Additional debugging information
console.log('KLineChart Pro UMD available:', typeof klinechartspro !== 'undefined');
if (typeof klinechartspro !== 'undefined') {
  console.log('Available exports:', Object.keys(klinechartspro));
}