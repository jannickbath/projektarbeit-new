import Utility from './Utility';

export default class OpenWeatherMap {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}`;
    }

    async getWeatherData(lat, lon) {
        const url = (this.baseUrl += `&lat=${lat}&lon=${lon}`);

        try {
            return await Utility.fetchJson(url);
        } catch (err) {
            throw err;
        }
    }
}
