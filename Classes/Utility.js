export default class Utility {
    static async fetchJson(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (err) {
            throw err;
        }
    }

    static fahrenheitToCelsius(fahrenheit) {
        return ((fahrenheit - 32) * (5 / 9)).toFixed(1);
    }

    static kelvinToCelsius(kelvin) {
        return (kelvin - 273.15).toFixed(1);
    }
    
    static isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
}
