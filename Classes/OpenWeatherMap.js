import Utility from './Utility';

export default class OpenWeatherMap {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}`;
    }

    async getWeatherData(location) {
        const url = (this.baseUrl += `&q=${location}`);

        try {
            return await Utility.fetchJson(url);
        } catch (err) {
            throw err;
        }
    }
}
