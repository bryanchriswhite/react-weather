import * as _ from 'lodash';

export default function factory(key) {
    const _save = (s) => save(key, s)
    const _load = (d) => load(key, d)
    return {
        save: _save,
        load: _load,
    }
}

export function save(key, state) {
    localStorage.setItem(key, JSON.stringify(state));
}

export function load(key, defaultState) {
    const loadedJSON = window.localStorage.getItem(key);
    if (loadedJSON) {
        try {
            const loadedState = JSON.parse(loadedJSON);
            let state = {};
            _.merge(state, defaultState, loadedState);
            return state
        } catch (error) {
            // TODO: better error handling
            console.error(error)
        }
    }
    return defaultState;
}

