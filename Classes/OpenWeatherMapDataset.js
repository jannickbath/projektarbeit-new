import Utility from "./Utility";

export default class OpenWeatherMapDataset {
    static unify(dataset) {        
        if (dataset?.cod != 200  || Utility.isEmpty(dataset)) {
            return {};
        }

        return {
            description: dataset.weather[0].description,
            temperature: Utility.kelvinToCelsius(dataset.main.temp),
            humidity: dataset.main.humidity,
            fetched: dataset.lastUpdated
        }
    }
}