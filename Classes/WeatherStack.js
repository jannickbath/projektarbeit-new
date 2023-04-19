import Utility from "./Utility";

export default class WeatherStack {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = `http://api.weatherstack.com/current?access_key=${apiKey}`;
    }

    async getWeatherData(location) {
        const url = (this.baseUrl += `&query=${location}`);

        try {
            return await Utility.fetchJson(url);
        } catch (err) {
            throw err;
        }
    }
}