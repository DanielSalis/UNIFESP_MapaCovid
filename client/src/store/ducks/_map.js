export const Types = {
    SET_COUNTRY_FILTER: '_map/SET_COUNTRY_FILTER',
    SET_STATE_FILTER: '_map/SET_STATE_FILTER',
    SET_CITY_FILTER: '_map/SET_CITY_FILTER',
    SET_MAP: '_map/SET_MAP',
    CHANGE_LAYER: '_map/CHANGE_LAYER',
    SET_APPLIED_FILTERS: '_map/SET_APPLIED_FILTERS',
    SET_FILTERED_DATA: '_map/SET_FILTERED_DATA',
    SET_SIDEBAR_OPEN: '_map/SET_SIDEBAR_OPEN',
    SET_TITLE: '_map/SET_TITLE'
}

const INITIAL_STATE = {
    country: false,
    state: null,
    city: null,
    map: null,
    layers: [
        {
            id: 1,
            text: "Layer 1",
            name: 'OSM',
            visible: true,
        }
    ],
    appliedFilters: null,
    filteredData: null,
    sidebarOpen: false,
    title: 'Home'
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.SET_MAP:
            return {
                ...state,
                map: action.payload
            };

        case Types.SET_COUNTRY_FILTER:
            return {
                ...state,
                country: action.payload
            }

        case Types.SET_STATE_FILTER:
            return {
                ...state,
                state: action.payload
            }

        case Types.SET_CITY_FILTER:
            return {
                ...state,
                city: action.payload
            }

        case Types.CHANGE_LAYER:
            const id = action.payload.id;
            const initialLayers = INITIAL_STATE.layers;
            const item = initialLayers.find(item => item.id === id);
            item.visible = action.payload.visible;
            initialLayers[item] = item;
            const changedLayers = initialLayers;

            return {
                ...state,
                layers: changedLayers
            };

        case Types.SET_APPLIED_FILTERS:
            return {
                ...state,
                appliedFilters: action.payload
            }

        case Types.SET_FILTERED_DATA:
            return {
                ...state,
                filteredData: action.payload
            }

        case Types.SET_SIDEBAR_OPEN:
            return {
                ...state,
                sidebarOpen: action.payload
            }

        case Types.SET_TITLE:
            return {
                ...state,
                title: action.payload
            }

        default:
            return state
    }
}

export const Actions = {
    setCountry: (data) => ({
        type: Types.SET_COUNTRY_FILTER,
        payload: data
    }),

    setState: (data) => ({
        type: Types.SET_STATE_FILTER,
        payload: data
    }),

    setCity: (data) => ({
        type: Types.SET_CITY_FILTER,
        payload: data
    }),

    setMap: (data) => ({
        type: Types.SET_MAP,
        payload: data
    }),

    changeLayer: (id, visible) => ({
        type: Types.CHANGE_LAYER,
        payload: {
            id: id,
            visible: visible
        }
    }),

    setAppliedFilters: (data) => ({
        type: Types.SET_APPLIED_FILTERS,
        payload: data
    }),

    setFilteredData: (data) => ({
        type: Types.SET_FILTERED_DATA,
        payload: data
    }),

    setSidebarOpen: (data) => ({
        type: Types.SET_SIDEBAR_OPEN,
        payload: data
    }),

    setTitle: (data) => ({
        type: Types.SET_TITLE,
        payload: data
    })
}