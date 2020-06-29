import React, {useState, useEffect, useReducer} from 'react';
import {Container, Fab, Grid, makeStyles} from "@material-ui/core";
import {Home, DirectionsWalk, Settings} from "@material-ui/icons";

import './App.css';
import MainWeather from "./components/MainWeather";
import HourlyTable from "./components/HourlyTable";
import {defaultState, reducer} from "./store/reducer";
import HourlyGraph from "./components/HourlyGraph";

// const WEATHER_URL = 'sample.json'
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/onecall?exclude=minutely&appid=9052b1a9ec107a8d04ddc0818c7f8e59'
const ICON_URL_TEMPLATE = 'https://openweathermap.org/img/wn/$@2x.png'

const useStyles = makeStyles({
    fixedGrid: {
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        pointerEvents: 'none',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        textAlign: 'right',
        top: 0,
        left: 0
    }
});

function getIconURL(icon) {
    return ICON_URL_TEMPLATE.replace('$', icon);
}

function urlFor({lat, lon}) {
    return WEATHER_URL + `&lat=${lat}&lon=${lon}`;
}

function App() {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const setLocation = (location) => {
        dispatch({
            type: 'setLocation',
            location
        })
    }
    const setData = (data) => {
        dispatch({
            type: 'setData',
            data
        })
    }

    const {location, data: {current, daily, hourly}} = state;

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

    const classes = useStyles();

    return (
        <div className="App">
            <Container maxWidth={'sm'}>
                <MainWeather
                    location={location}
                    setLocation={setLocation}
                    icons={currentWeatherIcons}
                    temp={current.temp}
                    high={daily[0].temp.max}
                    low={daily[0].temp.min}
                />
                <HourlyGraph hours={hourly} />
                <HourlyTable
                    hours={hourly}
                />
                <Grid container className={classes.fixedGrid} spacing={3}>
                    <Grid item xs={12}>
                        <Fab style={{pointerEvents: 'initial'}}>
                            <Settings/>
                        </Fab>
                    </Grid>
                    <Grid item xs={12}>
                        <Fab style={{pointerEvents: 'initial'}}>
                            <Home/>
                            <DirectionsWalk/>
                        </Fab>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
