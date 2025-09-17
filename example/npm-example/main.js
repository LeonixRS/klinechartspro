// Import KLineChart Pro
import { KLineChartPro } from '@klinecharts/pro'
// Import CSS
import '@klinecharts/pro/dist/klinecharts-pro.css'

// Sample financial data (OHLCV format)
const sampleData = [
    { timestamp: Date.now() - 30 * 24 * 60 * 60 * 1000, open: 150.0, high: 155.0, low: 148.0, close: 152.0, volume: 1000000 },
    { timestamp: Date.now() - 29 * 24 * 60 * 60 * 1000, open: 152.0, high: 158.0, low: 151.0, close: 156.0, volume: 1200000 },
    { timestamp: Date.now() - 28 * 24 * 60 * 60 * 1000, open: 156.0, high: 159.0, low: 154.0, close: 157.0, volume: 800000 },
    { timestamp: Date.now() - 27 * 24 * 60 * 60 * 1000, open: 157.0, high: 162.0, low: 155.0, close: 160.0, volume: 1500000 },
    { timestamp: Date.now() - 26 * 24 * 60 * 60 * 1000, open: 160.0, high: 163.0, low: 158.0, close: 159.0, volume: 900000 },
    { timestamp: Date.now() - 25 * 24 * 60 * 60 * 1000, open: 159.0, high: 164.0, low: 157.0, close: 162.0, volume: 1100000 },
    { timestamp: Date.now() - 24 * 24 * 60 * 60 * 1000, open: 162.0, high: 165.0, low: 160.0, close: 163.0, volume: 1300000 },
    { timestamp: Date.now() - 23 * 24 * 60 * 60 * 1000, open: 163.0, high: 168.0, low: 161.0, close: 166.0, volume: 1600000 },
    { timestamp: Date.now() - 22 * 24 * 60 * 60 * 1000, open: 166.0, high: 169.0, low: 164.0, close: 167.0, volume: 1000000 },
    { timestamp: Date.now() - 21 * 24 * 60 * 60 * 1000, open: 167.0, high: 170.0, low: 165.0, close: 168.0, volume: 1400000 },
    { timestamp: Date.now() - 20 * 24 * 60 * 60 * 1000, open: 168.0, high: 172.0, low: 166.0, close: 170.0, volume: 1200000 },
    { timestamp: Date.now() - 19 * 24 * 60 * 60 * 1000, open: 170.0, high: 173.0, low: 168.0, close: 171.0, volume: 1100000 },
    { timestamp: Date.now() - 18 * 24 * 60 * 60 * 1000, open: 171.0, high: 175.0, low: 169.0, close: 174.0, volume: 1500000 },
    { timestamp: Date.now() - 17 * 24 * 60 * 60 * 1000, open: 174.0, high: 176.0, low: 172.0, close: 173.0, volume: 800000 },
    { timestamp: Date.now() - 16 * 24 * 60 * 60 * 1000, open: 173.0, high: 177.0, low: 171.0, close: 175.0, volume: 1300000 },
    { timestamp: Date.now() - 15 * 24 * 60 * 60 * 1000, open: 175.0, high: 179.0, low: 173.0, close: 177.0, volume: 1400000 },
    { timestamp: Date.now() - 14 * 24 * 60 * 60 * 1000, open: 177.0, high: 180.0, low: 175.0, close: 178.0, volume: 1000000 },
    { timestamp: Date.now() - 13 * 24 * 60 * 60 * 1000, open: 178.0, high: 181.0, low: 176.0, close: 179.0, volume: 1200000 },
    { timestamp: Date.now() - 12 * 24 * 60 * 60 * 1000, open: 179.0, high: 183.0, low: 177.0, close: 181.0, volume: 1600000 },
    { timestamp: Date.now() - 11 * 24 * 60 * 60 * 1000, open: 181.0, high: 184.0, low: 179.0, close: 182.0, volume: 1100000 },
    { timestamp: Date.now() - 10 * 24 * 60 * 60 * 1000, open: 182.0, high: 185.0, low: 180.0, close: 183.0, volume: 1300000 },
    { timestamp: Date.now() - 9 * 24 * 60 * 60 * 1000, open: 183.0, high: 187.0, low: 181.0, close: 185.0, volume: 1500000 },
    { timestamp: Date.now() - 8 * 24 * 60 * 60 * 1000, open: 185.0, high: 188.0, low: 183.0, close: 186.0, volume: 900000 },
    { timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, open: 186.0, high: 189.0, low: 184.0, close: 187.0, volume: 1200000 },
    { timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000, open: 187.0, high: 191.0, low: 185.0, close: 189.0, volume: 1400000 },
    { timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000, open: 189.0, high: 192.0, low: 187.0, close: 190.0, volume: 1000000 },
    { timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000, open: 190.0, high: 194.0, low: 188.0, close: 192.0, volume: 1600000 },
    { timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, open: 192.0, high: 195.0, low: 190.0, close: 193.0, volume: 1300000 },
    { timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, open: 193.0, high: 197.0, low: 191.0, close: 195.0, volume: 1500000 },
    { timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, open: 195.0, high: 198.0, low: 193.0, close: 196.0, volume: 1200000 },
    { timestamp: Date.now(), open: 196.0, high: 199.0, low: 194.0, close: 197.0, volume: 1100000 }
];

// Simple mock datafeed implementation
class MockDatafeed {
    async searchSymbols(search) {
        // Return some sample symbols
        return [
            {
                ticker: 'AAPL',
                name: 'Apple Inc.',
                shortName: 'AAPL',
                exchange: 'NASDAQ',
                market: 'stocks',
                priceCurrency: 'usd',
                type: 'stock'
            },
            {
                ticker: 'MSFT',
                name: 'Microsoft Corporation',
                shortName: 'MSFT',
                exchange: 'NASDAQ',
                market: 'stocks',
                priceCurrency: 'usd',
                type: 'stock'
            }
        ];
    }

    async getHistoryKLineData(symbol, period, from, to) {
        // Return our sample data
        // Note: Pro expects data in ascending chronological order
        return sampleData.sort((a, b) => a.timestamp - b.timestamp);
    }

    subscribe(symbol, period, callback) {
        // Mock real-time updates (optional)
        // In a real implementation, you would connect to a WebSocket or polling service
        console.log('Subscribe called for:', symbol.ticker, period.text);
    }

    unsubscribe(symbol, period) {
        // Cleanup subscriptions
        console.log('Unsubscribe called for:', symbol.ticker, period.text);
    }
}

// Create chart instance
try {
    const chart = new KLineChartPro({
        container: document.getElementById('chart'),
        // Default symbol info
        symbol: {
            ticker: 'SAMPLE',
            name: 'Sample Stock Data',
            shortName: 'SAMPLE',
            exchange: 'DEMO',
            market: 'stocks',
            priceCurrency: 'usd',
            type: 'stock'
        },
        // Default period
        period: { multiplier: 1, timespan: 'day', text: '1D' },
        // Use our mock datafeed
        datafeed: new MockDatafeed()
    });

    console.log('KLineChart Pro initialized successfully!');
} catch (error) {
    console.error('Error initializing chart:', error);
    document.getElementById('chart').innerHTML = '<div style="padding: 20px; color: red;">Error loading chart: ' + error.message + '</div>';
}