import Utility from "./Utility";

export default class WeatherStackDataset {
    static unify(dataset) {
        if (Utility.isEmpty(dataset) || dataset?.success == false) {
            return {};
        }

        return {
            Description: dataset.current.weather_descriptions[0],
            Temperature: dataset.current.temperature + "°C",
            Humidity: dataset.current.humidity,
            Fetched: Utility.secondsToDate(dataset.lastUpdated)
        }
    }
}