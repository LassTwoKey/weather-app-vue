import {useUnitStore} from "../store/store";
import { CityCoordinates } from "../types";
import { getUnit } from "../utils";

export const apiKey:string = '09d65a643b54838149fea98b67251c39'

export async function getWeatherByCity(city:string) {
    const unitStore = useUnitStore()
    const response = fetch(
        `https://api.openweathermap.org/data/2.5/weather?lang=ru&q=${city}&units=${getUnit() ?? unitStore.getUnit}&appid=${apiKey}`,
    )
    return (await response).json()
}
export async function getWeatherByCoordinate(lat:number, lon:number) {
    const unitStore = useUnitStore()
    const response = fetch(
        `https://api.openweathermap.org/data/2.5/weather?lang=ru&lat=${lat}&lon=${lon}&units=${getUnit() ?? unitStore.getUnit}&appid=${apiKey}`,
    )
    return (await response).json()
}

export async function getCitiesByValue(searchValue:string) {
    const unitStore = useUnitStore()
    const response = fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&units=${getUnit() ?? unitStore.getUnit}&appid=${apiKey}`,
    )
    return (await response).json()
}

export async function getForecastByCoordinate(lat:number, lon:number) {
    const unitStore = useUnitStore()
    const response = fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lang=ru&lat=${lat}&lon=${lon}&lang=ru&units=${getUnit() ?? unitStore.getUnit}&appid=${apiKey}`,
    )
    return (await response).json()
}

export async function getFullInfoByCities(locations: CityCoordinates[]) {
    const responseList = locations.map(({lat, lon}) => {
        return getWeatherByCoordinate(lat, lon)
    })

    return Promise.all(responseList)
        .then(dataArray => {
            return dataArray;
        })
        .catch(error => {
            console.error('Ошибка при загрузке информации о городах:', error);
        });
}