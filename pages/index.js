import { useEffect, useState } from 'react';
import FirestoreHandler from '../Classes/FirestoreHandler';
import OpenWeatherMap from '../Classes/OpenWeatherMap';
import WeatherAPI from '../Classes/WeatherAPI';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyBO_7wXo6UTPVWInqARF5GRBp6FM_hGcog',
    authDomain: 'projektarbeit-new.firebaseapp.com',
    projectId: 'projektarbeit-new',
    storageBucket: 'projektarbeit-new.appspot.com',
    messagingSenderId: '213581876910',
    appId: '1:213581876910:web:b676f82f7b7d2a7cbca73f',
    measurementId: 'G-WT2468CCZM',
};

const app = initializeApp(firebaseConfig);

export default function Home() {
    const [weatherApiData, setWeatherApiData] = useState({});
    const [openWeatherMapApiData, setOpenWeatherMapApiData] = useState({});
    const [openWeatherMapResponses, setOpenWeatherMapResponses] = useState([]);
    const firestoreHandlerInstance = new FirestoreHandler(app);

    // const openWeatherMapInstance = new OpenWeatherMap('dfb626366e5b1d6d7dc6eef5481389a2');
    // const weatherApiInstance = new WeatherAPI('ec7ce5caf2ae4b03ad391006231304');

    // openWeatherMapInstance.getWeatherData(52.520008, 13.404954);
    // weatherApiInstance.getWeatherData(52.520008, 13.404954).then(data => {
    //     console.log(data);
    // });

    useEffect(() => {
        // openWeatherMapInstance.getWeatherData(52.520008, 13.404954).then(data => {
        //     setOpenWeatherMapApiData(data);
        // });
        firestoreHandlerInstance.fetchCollection('openweathermap').then(docs => {
            setOpenWeatherMapResponses(docs);
        });
        console.log(openWeatherMapResponses);
    }, []);

    return (
        <>
            <h1>Hello World!</h1>

            {openWeatherMapResponses.map(response => {
                return <p>{JSON.stringify(response.data())}</p>;
            })}
        </>
    );
}
