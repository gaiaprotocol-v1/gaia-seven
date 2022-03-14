import axios from "axios";
import { Service } from 'typedi';

@Service()
export default class OpenseaService {
    async getCollectionFP(ticker: string) {
        const floorPrice = await axios.get(`https://api.opensea.io/api/v1/collection/${ticker}/stats`);
        const klayEther = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=klay-token&vs_currencies=eth`);
        const price = floorPrice.data.stats.one_day_average_price / klayEther.data["klay-token"].eth;
        return price.toFixed(0);
    }
}