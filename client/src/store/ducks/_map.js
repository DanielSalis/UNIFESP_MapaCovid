export const Types = {
    SET_COUNTRY_FILTER: '_map/SET_COUNTRY_FILTER',
    SET_STATE_FILTER: '_map/SET_STATE_FILTER',
    SET_CITY_FILTER: '_map/SET_CITY_FILTER',
}

const INITIAL_STATE = {
    country: false,
    state: null,
    city: null,
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.SET_COUNTRY_FILTER:
            return {
                ...state,
                country: action.payload.selected
            };

        default:
            return state
    }
}

export const Actions = {
    registerSuccess: (data) => ({
        type: Types.SET_COUNTRY_FILTER,
        payload: data
    }),
}