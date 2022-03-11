import Binance from 'binance-api-node'
import { Service } from 'typedi';

@Service()
export default class BinanceService {
    async getCandles(tiker: string) {
        const client = Binance({
            apiKey: process.env.BINANCE_KEY,
            apiSecret: process.env.BINANCE_SECRET,
        });

        console.log(await client.candles({ symbol: "ETHBTC", interval: "1m" }))
    }
}