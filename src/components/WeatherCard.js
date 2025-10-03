import { BsClock, BsCalendar3, BsWind, BsDroplet, BsCloudRain } from "react-icons/bs";

import { formatDate } from "../utils/Date";

export default function WeatherCard({ weather, hour, openDailyForecast }) {

    return (
        <div className="weather-card h-[calc(100%_-_86px)]">
            {weather && (
                <div className="h-full px-6 pb-8">
                    {!weather.min ? 
                        (<div className="h-full flex flex-col justify-between divide-y divide-gray-300 md:flex-row md:divide-x md:divide-y-0">
                            <div className="h-full md:w-full flex items-center justify-center gap-3 md:justify-between md:p-12">
                                <div className="flex flex-col gap-3 items-center md:items-start">
                                    <p className="flex gap-2 text-sm items-center">{hour !== 'Now' && <BsClock />}{hour}</p>
                                    <div className={`md:flex-row-reverse md:items-start ${!openDailyForecast ? 'flex flex-col items-center' : 'flex flex-row-reverse'}`}>
                                        <img
                                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                            alt={weather.weather[0].description}
                                            className={`filter hue-rotate-40 saturate-150 brightness-110 md:w-24 ${!openDailyForecast ? 'w-60 max-w-[90%] -mt-5 -mb-10' : 'w-28'}`}
                                        />
                                        <h1 className="font-bold">{Math.round(weather.main.temp)}°</h1>
                                    </div>
                                    <div className="flex flex-col md:hidden">
                                        {!openDailyForecast ?
                                            <h2 className="capitalize">{weather.weather[0].description}</h2>
                                            :
                                            <p className="text-xl capitalize">{weather.weather[0].description}</p>
                                        }
                                        <p className="hidden md:flex">Feels like {Math.round(weather.main.feels_like)}°</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <p className="text-md font-bold">↑{Math.round(weather.main.temp_max)}°</p>
                                        <p className="text-md">↓{Math.round(weather.main.temp_min)}°</p>
                                    </div>
                                </div>
                                <div className="hidden md:flex flex-col">
                                    <p className="text-xl capitalize">{weather.weather[0].description}</p>
                                    <p className="hidden md:flex">Feels like {Math.round(weather.main.feels_like)}°</p>
                                </div>
                            </div>
                            <div className="w-full md:max-w-[200px] h-auto pt-8 flex gap-2 items-center md:flex-col md:py-4 md:gap-8 md:justify-center">
                                <div className="w-full flex flex-col gap-1 items-center">
                                    <BsWind className="mb-1 w-6 h-auto" />
                                    <p className="text-sm font-bold">{Math.round(weather.wind.speed * 3.6)} hm/h</p>
                                    <p className="text-sm text-gray-600">Wind</p>
                                </div>
                                <div className="w-full flex flex-col gap-1 items-center">
                                    <BsDroplet className="mb-1 w-6 h-auto" />
                                    <p className="text-sm font-bold">{weather.main.humidity}%</p>
                                    <p className="text-sm text-gray-600">Humidity</p>
                                </div>
                                <div className="w-full flex flex-col gap-1 items-center">
                                    <BsCloudRain className="mb-1 w-6 h-auto" />
                                    <p className="text-sm font-bold">{Number(weather.pop)}%</p>
                                    <p className="text-sm text-gray-600">Chance of rain</p>
                                </div>
                            </div>
                        </div>)
                        :
                        (<div className="w-full h-full flex flex-col justify-between divide-y divide-gray-300">
                            <div className="w-full h-full flex items-center justify-center gap-3">
                                <div className="flex flex-col gap-3 items-center">
                                    <p className="flex gap-2 text-sm items-center"><BsCalendar3 />{formatDate(weather.date)}</p>
                                    <div className={`${!openDailyForecast ? 'flex flex-col items-center' : 'flex flex-row-reverse'}`}>
                                        <img
                                            src={`https://openweathermap.org/img/wn/${weather.weatherItem.weather[0].icon}@2x.png`}
                                            alt={weather.weatherItem.weather[0].description}
                                            className={`filter hue-rotate-40 saturate-150 brightness-110 ${!openDailyForecast ? 'w-60 max-w-[90%] -mt-5 -mb-10' : 'w-28'}`}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        {!openDailyForecast ?
                                            <h2 className="capitalize">{weather.weatherItem.weather[0].description}</h2>
                                            :
                                            <p className="text-xl capitalize">{weather.weatherItem.weather[0].description}</p>
                                        }
                                    </div>
                                    <div className="flex gap-1">
                                        <p className="text-md font-bold">↑{Math.round(weather.max)}°</p>
                                        <p className="text-md">↓{Math.round(weather.min)}°</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-auto pt-8 flex gap-2 items-center">
                                <div className="w-full flex flex-col gap-1 items-center">
                                    <BsWind className="mb-1 w-6 h-auto" />
                                    <p className="text-sm font-bold">{Math.round(weather.weatherItem.wind.speed * 3.6)} hm/h</p>
                                    <p className="text-sm text-gray-600">Wind</p>
                                </div>
                                <div className="w-full flex flex-col gap-1 items-center">
                                    <BsDroplet className="mb-1 w-6 h-auto" />
                                    <p className="text-sm font-bold">{weather.weatherItem.main.humidity}%</p>
                                    <p className="text-sm text-gray-600">Humidity</p>
                                </div>
                                <div className="w-full flex flex-col gap-1 items-center">
                                    <BsCloudRain className="mb-1 w-6 h-auto" />
                                    <p className="text-sm font-bold">{Number(weather.pop)}%</p>
                                    <p className="text-sm text-gray-600">Chance of rain</p>
                                </div>
                            </div>
                        </div>)}
                </div>
            )
            }
        </div >
    );
}