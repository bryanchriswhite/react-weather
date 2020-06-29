import React, {useState, useEffect, useReducer} from 'react';
import {Container} from "@material-ui/core";

import './App.css';
import MainWeather from "./components/MainWeather";
import HourlyTable from "./components/HourlyTable";
import HourlyGraph from "./components/HourlyGraph";
import FabOverlay from "./components/FabOverlay";
import {defaultState, reducer} from "./store/reducer";

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/onecall?exclude=minutely&appid=9052b1a9ec107a8d04ddc0818c7f8e59'
const ICON_URL_TEMPLATE = 'https://openweathermap.org/img/wn/$@2x.png'

function getIconURL(icon) {
    return ICON_URL_TEMPLATE.replace('$', icon);
}

function urlFor({lat, lon}) {
    return WEATHER_URL + `&lat=${lat}&lon=${lon}`;
}

function App() {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const setLocation = (location) => dispatch({
        type: 'setLocation', location
    })

    const setData = (data) => dispatch({
        type: 'setData', data
    })

    const setSettings = (settings) => dispatch({
        type: 'setSettings', settings
    })

    const {
        data: {current, daily, hourly},
        settings,
        location,
    } = state;

    useEffect(() => {
        async function fetchWeather() {
            const res = await fetch(urlFor(location), {mode: 'cors'});
            if (res.ok) {
                setData(await res.json());
            }
        }

        fetchWeather();
    }, [location]);

    let currentWeatherIcons;
    if (current && current.weather) {
        currentWeatherIcons = current.weather.map(w => {
            const src = getIconURL(w.icon);
            return (
                <img alt={w.description} src={src} key={src}></img>
            )
        });
    }

    return (
        <div className="App">
            <Container maxWidth='sm'>
                <MainWeather
                    location={location}
                    setLocation={setLocation}
                    icons={currentWeatherIcons}
                    temp={current.temp}
                    high={daily[0].temp.max}
                    low={daily[0].temp.min}
                />
                <HourlyGraph hours={hourly}/>
                <HourlyTable
                    hours={hourly}
                />
                <FabOverlay hourlyWeather={hourly} settings={settings} setSettings={setSettings}/>
            </Container>
        </div>
    );
}

export default App;
