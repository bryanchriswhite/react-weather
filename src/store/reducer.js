const cities = require('../cities.json');
const cityNames = Object.keys(cities);

export function reducer(state, action) {
    switch (action.type) {
        case 'setData':
            const {data} = action;
            return {...state, data};
        case 'setLocation':
            const {location} = action;
            return {...state, location}
        case 'setHour':
            const {hour} = action;
            return {...state, hour};
        default:
            throw new Error('unknown action');
    }
};

export const defaultState = {
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
};
