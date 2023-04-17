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
    const [weatherApiResponses, setWeatherApiResponses] = useState([]);
    const [latInput, setLatInput] = useState([]);
    const [lonInput, setLonInput] = useState([]);
    const firestoreHandlerInstance = new FirestoreHandler(app);
    
    const openWeatherMapInstance = new OpenWeatherMap('dfb626366e5b1d6d7dc6eef5481389a2');
    const weatherApiInstance = new WeatherAPI('ec7ce5caf2ae4b03ad391006231304');

    useEffect(() => {
        firestoreHandlerInstance.fetchCollection('openweathermap').then(docs => {
            setOpenWeatherMapResponses(docs);
        });

        firestoreHandlerInstance.fetchCollection('weatherapi').then(docs => {
            setWeatherApiResponses(docs);
        });
    }, [weatherApiData, openWeatherMapApiData]);

    function handleWeatherApi(e) {
        // TODO - After 10min a new record should be fetched and saved
        e.preventDefault();

        const alreadyExists = weatherApiResponses.find(doc => {
            const docLat = doc.data().location.lat;
            const docLon = doc.data().location.lon;

            return docLat == latInput && docLon == lonInput;
        });

        if (alreadyExists) {
            setWeatherApiData(alreadyExists.data());
        } else {
            weatherApiInstance.getWeatherData(latInput, lonInput).then(data => {
                setWeatherApiData(data);
                firestoreHandlerInstance.addToCollection('weatherapi', data);
            });
        }
    }

    function handleOpenWeather(e) {
        e.preventDefault();

        const alreadyExists = openWeatherMapResponses.find(doc => {
            const docLat = doc.data().coord.lat;
            const docLon = doc.data().coord.lon;

            return docLat == latInput && docLon == lonInput;
        });

        if (alreadyExists) {
            setOpenWeatherMapApiData(alreadyExists.data());
        } else {
            openWeatherMapInstance.getWeatherData(latInput, lonInput).then(data => {
                setOpenWeatherMapApiData(data);
                firestoreHandlerInstance.addToCollection('openweathermap', data);
            });
        }
    }

    function handleSubmit(e) {
        handleOpenWeather(e);
        handleWeatherApi(e);
    }

    return (
        <>
            <h1>Hello World!</h1>

            <form className="inputWrapper" onSubmit={e => handleSubmit(e)}>
                <input type="text" className="lat" onChange={e => setLatInput(e.target.value)} placeholder="lat" />
                <input type="text" className="lon" onChange={e => setLonInput(e.target.value)} placeholder="lon" />
                <button type="submit">Submit</button>
            </form>

            {openWeatherMapResponses.map(response => {
                return <p>{JSON.stringify(response.data())}</p>;
            })}
        </>
    );
}
