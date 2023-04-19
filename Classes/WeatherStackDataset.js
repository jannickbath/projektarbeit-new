export default class WeatherStackDataset {
    static unify(dataset) {
        return {
            description: dataset.current.weather_descriptions[0],
            temperature: dataset.current.temperature,
            humidity: dataset.current.humidity,
            last_updated: dataset.current.observation_time
        }
    }
}