export default class WeatherApiDataset {
    static unify(dataset) {
        return {
            description: dataset.current.condition.text,
            temperature: dataset.current.temp_c,
            humidity: dataset.current.humidity,
            last_updated: dataset.current.last_updated_epoch
        }
    }
}