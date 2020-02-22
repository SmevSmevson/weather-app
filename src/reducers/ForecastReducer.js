export const forecastReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FORECAST':
            // action : {forecast}
            return action.forecast
        case 'SET_COLDEST_DAY':
            if(state.cod != "200") {
                return state
            }
            return {...state, lowestTemp: state.list.reduce((acc, val) => {
                return val.main.temp < acc.main.temp ? val : acc
            }).dt_txt}
            
        case 'SET_WETTEST_DAY':
            if(state.cod != "200") {
                return state
            }
            return {...state, mostRainfall: state.list.reduce((acc, val) => {
                return acc.rain ?
                    val.rain && val.rain['3h'] > acc.rain['3h'] ? val : acc
                    : val
            }).dt_txt}

        default:
            console.log('current Forecast State', state)
            return state
    }
}