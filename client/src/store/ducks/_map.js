export const Types = {
    SET_COUNTRY_FILTER: '_map/SET_COUNTRY_FILTER',
    SET_STATE_FILTER: '_map/SET_STATE_FILTER',
    SET_CITY_FILTER: '_map/SET_CITY_FILTER',
}

const INITIAL_STATE = {
    country: false,
    state: null,
    city: null,
    layers: [
        {
            id: 1,
            text: "Layer 1"
        },
        {
            id: 2,
            text: "Layer 2"
        },
        {
            id: 3,
            text: "Layer 3"
        }
    ]
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