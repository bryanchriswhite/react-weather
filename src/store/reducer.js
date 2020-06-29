import ls from './localstorage';

const {save, load} = ls('REACT_WEATHER_STATE');
const cities = require('../cities.json');
const cityNames = Object.keys(cities);

export function reducer(state, action) {
    let newState;
    switch (action.type) {
        case 'setData':
            const {data} = action;
            newState = {...state, data};
            return newState;
        case 'setLocation':
            const {location} = action;
            newState = {...state, location};
            save(newState);
            return newState;
        case 'setHour':
            const {hour} = action;
            newState = { ...state, hour };
            save(newState);
            return newState;
        case 'setSettings':
            const {settings} = action;
            newState = {
                ...state, settings: {
                    ...state.settings,
                    ...settings
                }
            };
            save(newState);
            return newState
        default:
            throw new Error('unknown action');
    }
}

const _defaultState = {
    location: {
        country: 'Germany',
        city: cityNames[0],
        lat: cities[cityNames[0]][0],
        lon: cities[cityNames[0]][1]
    },
    data: {
        current: {},
        daily: [{temp: {}}]
    },
    settings: {
        maxWind: 15,
        minRain: 10,
    }
};

export const defaultState = load(_defaultState);
