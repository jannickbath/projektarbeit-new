import { useEffect, useState } from 'react';
import OpenWeatherMap from '../Classes/OpenWeatherMap';
import WeatherAPI from '../Classes/WeatherAPI';

export default function Home() {
    const [weatherApiData, setWeatherApiData] = useState({});
    const [openWeatherMapApiData, setOpenWeatherMapApiData] = useState({});

    const openWeatherMapInstance = new OpenWeatherMap('dfb626366e5b1d6d7dc6eef5481389a2');
    const weatherApiInstance = new WeatherAPI('ec7ce5caf2ae4b03ad391006231304');

    // openWeatherMapInstance.getWeatherData(52.520008, 13.404954);
    // weatherApiInstance.getWeatherData(52.520008, 13.404954).then(data => {
    //     console.log(data);
    // });

    useEffect(() => {
        openWeatherMapInstance.getWeatherData(52.520008, 13.404954).then(data => {
            setOpenWeatherMapApiData(data);
        });
    }, []);

    return (
        <>
            <h1>Hello World!</h1>

            {Object.keys(openWeatherMapApiData).map(key => {
                return <p>{key}</p>;
            })}
        </>
    );
}
