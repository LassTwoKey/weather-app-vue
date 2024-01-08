import { defineStore } from 'pinia'
import {
    ForecastItemClient,
    Geo,
    Unit,
    WeatherInfoClient,
    WeatherMainInfo,
    WeatherMainTomorrowInfo
} from "../types";
import { getGeo, getUnit } from "../utils";
import { getFormattedDate } from "../utils/date.ts";

export const useGeoStore = defineStore('geo', {
    state: () => ({
        // basic location
        name: getGeo().name ?? 'Москва',
        lat: getGeo().lat ?? 55.7522,
        lon: getGeo().lon ?? 37.6156,
    }),
    getters: {
        getName: (state) => state.name,
        getLat: (state) => state.lat,
        getLon: (state) => state.lon,
    },
    actions: {
        setGeo({name, lat, lon}:Geo) {
            this.name = name
            this.lat = lat
            this.lon = lon

        },
    },
})

export const useUnitStore = defineStore('unit', {
    state: () => ({
        unit: getUnit() ?? 'metric',
    }),
    getters: {
        getUnit: (state) => state.unit
    },
    actions: {
        setUnit(unit: Unit) {
            this.unit = unit
        },
    },
})

export const useWeatherInfoStore = defineStore('weatherInfo', {
    state: () => ({
        geoName: 'N/A',
        temp: 'N/A',
        tempMax: 'N/A',
        tempMin: 'N/A',
        feelsLike: 'N/A',
        iconUrl: 'src/assets/widget/sample.svg',
        description: 'N/A',
        backgroundUrl: 'src/assets/widget/sample.svg',
        currentDate: getFormattedDate(),
    }),
    getters: {
        getGeoName: (state) => state.geoName,
        getTemp: (state) => state.temp,
        getTempMax: (state) => state.tempMax,
        getTempMin: (state) => state.tempMin,
        getFeelsLike: (state) => state.feelsLike,
        getIconUrl: (state) => state.iconUrl,
        getDescription: (state) => state.description,
        getBackgroundUrl: (state) => state.backgroundUrl,
        getCurrentDate: (state) => state.currentDate,
    },
    actions: {
        setWeatherInfo(payload: WeatherInfoClient) {
            this.geoName = payload.geoName
            this.temp = payload.temp
            this.tempMax = payload.tempMax
            this.tempMin = payload.tempMin
            this.feelsLike = payload.feelsLike
            this.iconUrl = payload.iconUrl
            this.description = payload.description
            this.backgroundUrl = payload.backgroundUrl
        },
    },
})

export const useForecastStore = defineStore('forecast', {
    state: () => ({
        forecast: [] as ForecastItemClient[]
    }),
    getters: {
        getForecast: (state) => state.forecast
    },
    actions: {
        setForecast(payload: ForecastItemClient[]) {
            this.forecast = payload
        },
    },
})

export const useTodayStore = defineStore('today', {
    state: () => ({
        info: {
            windSpeed: 'N/A',
            windDirection: 'N/A',
            clouds: 'N/A',
            pressure: 'N/A',
            humidity: 'N/A',
            sunrise: 'N/A',
            sunset: 'N/A',
        },
        list: [] as ForecastItemClient[]
    }),
    getters: {
        getInfo: (state) => state.info,
        getMainCards: (state) => [
            {
                id: 1,
                title: 'Ветер',
                value: state.info.windSpeed,
                descr: state.info.windDirection,
                iconSrc: 'src/assets/tabs/air.svg'
            },
            {
                id: 2,
                title: 'Облачность',
                value: state.info.clouds,
                iconSrc: 'src/assets/tabs/cloud.svg'
            },
            {
                id: 3,
                title: 'Давление',
                value: state.info.pressure,
                iconSrc: 'src/assets/tabs/wave.svg'
            },
            {
                id: 4,
                title: 'Влажность',
                value: state.info.humidity,
                iconSrc: 'src/assets/tabs/humidity.svg'
            },
        ],
        getDayStates: (state) => [
            {
                id: 1,
                title: 'Восход',
                value: state.info.sunrise,
                iconSrc: 'src/assets/tabs/nights_stay.svg'
            },
            {
                id: 2,
                title: 'Закат',
                value: state.info.sunset,
                iconSrc: 'src/assets/tabs/sunset.svg'
            },
        ],
        getForecast: (state) => state.list,
    },
    actions: {
        setInfo(payload: WeatherMainInfo) {
            this.info = payload
        },
        setForecast(payload: ForecastItemClient[]) {
            this.list = payload
        },
    },
})

export const useTomorrowStore = defineStore('tomorrow', {
    state: () => ({
        info: {
            windSpeed: 'N/A',
            windDirection: 'N/A',
            clouds: 'N/A',
            pressure: 'N/A',
            humidity: 'N/A',
        },
        list: [] as ForecastItemClient[]
    }),
    getters: {
        getInfo: (state) => state.info,
        getMainCards: (state) => [
            {
                id: 1,
                title: 'Ветер',
                value: state.info.windSpeed,
                descr: state.info.windDirection,
                iconSrc: 'src/assets/tabs/air.svg'
            },
            {
                id: 2,
                title: 'Облачность',
                value: state.info.clouds,
                iconSrc: 'src/assets/tabs/cloud.svg'
            },
            {
                id: 3,
                title: 'Давление',
                value: state.info.pressure,
                iconSrc: 'src/assets/tabs/wave.svg'
            },
            {
                id: 4,
                title: 'Влажность',
                value: state.info.humidity,
                iconSrc: 'src/assets/tabs/humidity.svg'
            },
        ],
        getForecast: (state) => state.list,
    },
    actions: {
        setInfo(payload: WeatherMainTomorrowInfo) {
            this.info = {
                windSpeed: payload.windSpeed,
                windDirection: payload.windDirection,
                clouds: payload.clouds,
                pressure: payload.pressure,
                humidity: payload.humidity,
            }
        },
        setForecast(payload: ForecastItemClient[]) {
            this.list = payload
        },
    },
})

export const useFiveDaysStore = defineStore('fiveDays', {
    state: () => ({
        forecast: [] as ForecastItemClient[][]
    }),
    getters: {
        getForecast: (state) => state.forecast,
        getMainCards: () => [
            {
                id: 'windSpeed',
                title: 'Ветер',
                value: 'N/A',
                descr: 'N/A',
                iconSrc: 'src/assets/tabs/air.svg'
            },
            {
                id: 'clouds',
                title: 'Облачность',
                value: 'N/A',
                iconSrc: 'src/assets/tabs/cloud.svg'
            },
            {
                id: 'pressure',
                title: 'Давление',
                value: 'N/A',
                iconSrc: 'src/assets/tabs/wave.svg'
            },
            {
                id: 'humidity',
                title: 'Влажность',
                value: 'N/A',
                iconSrc: 'src/assets/tabs/humidity.svg'
            },
        ],
    },
    actions: {
        setForecast(payload: ForecastItemClient[][]) {
            this.forecast = payload
        },
    }
})