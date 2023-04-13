import { useState } from 'react';
import Utility from './Utility';

export default class WeatherAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}`;
    }

    async getWeatherData(lat, lon) {
        const url = (this.baseUrl += `&q=${lat},${lon}`);

        try {
            return await Utility.fetchJson(url);
        } catch (err) {
            throw err;
        }
    }
}
