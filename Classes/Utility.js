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

    static isAtLeast10MinutesAgo(time) {
        if (time != undefined) {
            const tenMinutesInSeconds = 600;
            const currentTime = Math.floor(Date.now() / 1000);
            return (currentTime - time) >= tenMinutesInSeconds;
        }else {
            return false;
        }
    }
}
