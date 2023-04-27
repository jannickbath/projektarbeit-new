import Utility from "./Utility";

export default class WeatherStackDataset {
    static unify(dataset) {
        if (Utility.isEmpty(dataset) || dataset?.success == false) {
            return {};
        }

        return {
            description: dataset.current.weather_descriptions[0],
            temperature: dataset.current.temperature,
            humidity: dataset.current.humidity,
            fetched: dataset.lastUpdated
        }
    }
}