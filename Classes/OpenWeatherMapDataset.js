import Utility from "./Utility";

export default class OpenWeatherMapDataset {
    static unify(dataset) {
        return {
            description: dataset.weather[0].description,
            temperature: Utility.kelvinToCelsius(dataset.main.temp),
            humidity: dataset.main.humidity,
            last_updated: dataset.dt
        }
    }
}