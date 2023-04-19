// Libraries
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';

// Classes
import FirestoreHandler from '../Classes/FirestoreHandler';
import OpenWeatherMap from '../Classes/OpenWeatherMap';
import WeatherStack from '../Classes/WeatherStack';
import OpenWeatherMapDataset from '../Classes/OpenWeatherMapDataset';
import WeatherStackDataset from '../Classes/WeatherStackDataset';

// Components
import WeatherCard from '../components/WeatherCard';

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
    const [weatherStackApiData, setWeatherStackApiData] = useState([]);
    const [openWeatherMapApiData, setOpenWeatherMapApiData] = useState({});

    const [openWeatherMapResponses, setOpenWeatherMapResponses] = useState([]);
    const [weatherStackFirestore, setWeatherStackFirestore] = useState([]);

    const [locationInput, setLocationInput] = useState("");

    // Instantiate classes
    const firestoreHandlerInstance = new FirestoreHandler(app);
    const openWeatherMapInstance = new OpenWeatherMap('dfb626366e5b1d6d7dc6eef5481389a2');
    const weatherStackInstance = new WeatherStack("5e2be9f1ff964163a9d3430aef2d04dd");

    // Fetch docs from firestore (copies from api)
    useEffect(() => {
        firestoreHandlerInstance.fetchCollection('openweathermap').then(docs => {
            setOpenWeatherMapResponses(docs);
        });

        firestoreHandlerInstance.fetchCollection('weatherstack').then(docs => {
            setWeatherStackFirestore(docs);
        });
    }, [weatherStackApiData, openWeatherMapApiData]);

    // TODO - After 10min a new record should be fetched and saved
    // TODO - Handle Translations e.g. münchen -> munich
    // TODO - Error handling for false requests -> dont save in db
        
    function handleOpenWeather(e) {
        e.preventDefault();

        const alreadyExists = openWeatherMapResponses.find(doc => {
            return locationInput.toLowerCase() == doc.data().name.toLowerCase();
        });

        if (alreadyExists) {
            console.log("exists openweathermap")
            setOpenWeatherMapApiData(alreadyExists.data());
        } else {
            console.log("fetched openweathermap");
            openWeatherMapInstance.getWeatherData(locationInput).then(data => {
                setOpenWeatherMapApiData(data);
                firestoreHandlerInstance.addToCollection('openweathermap', data);
            });
        }
    }

    function handleWeatherStack(e) {
        e.preventDefault();

        const alreadyExists = weatherStackFirestore.find(doc => {
            return locationInput.toLowerCase() == doc.data().location.name.toLowerCase();
        });

        if (alreadyExists) {
            console.log("exists weatherstack");
            setWeatherStackApiData(alreadyExists.data());
        } else {
            console.log("fetched weatherstack");
            weatherStackInstance.getWeatherData(locationInput).then(data => {
                setWeatherStackApiData(data);
                firestoreHandlerInstance.addToCollection('weatherstack', data);
            });
        }
    }

    function handleSubmit(e) {
        handleOpenWeather(e);
        handleWeatherStack(e);
    }

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    return (
        <>
            <h1>Hello World!</h1>

            <form className="inputWrapper" onSubmit={e => handleSubmit(e)}>
                <input type="text" className="location" onChange={e => setLocationInput(e.target.value)} placeholder="location" />
                <button type="submit">Submit</button>
            </form>

            {
                !isEmpty(weatherStackApiData) &&
                !isEmpty(openWeatherMapApiData) &&
                <div className="weatherWrapper">
                    <WeatherCard data={WeatherStackDataset.unify(weatherStackApiData)} provider="Weatherstack" />
                    <WeatherCard data={OpenWeatherMapDataset.unify(openWeatherMapApiData)} provider="Open Weather Map" />
                </div>  
            }
            
        </>
    );
}
