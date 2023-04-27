import Utility from "./Utility";

export default class OpenWeatherMapDataset {
    static unify(dataset) {        
        if (dataset?.cod != 200  || Utility.isEmpty(dataset)) {
            return {};
        }

        return {
            Description: dataset.weather[0].description,
            Temperature: Utility.kelvinToCelsius(dataset.main.temp)  + "°C",
            Humidity: dataset.main.humidity,
            Fetched: Utility.secondsToDate(dataset.lastUpdated)
        }
    }
}