import { useState, useEffect } from "react";

import { getForecastByLatLon } from "../services/weatherApi";

import { formatDate } from "../utils/Date";
import { useIsScreenMdUp } from "../utils/Screen";

export default function HourlyForecast({ weather, onChangeWeather, openDailyForecast, onChangeDailyForecast }) {
    const [weatherToday, setWeatherToday] = useState([]);
    const [dailyForecast, setDailyForecast] = useState([]);
    const isMdUp = useIsScreenMdUp();

    useEffect(() => {
        if (weather && !weather.min) getHourlyForecastByLatLon();
    }, [weather]);

    const getHourlyForecastByLatLon = async () => {
        const data = await getForecastByLatLon(weather.coord.lat, weather.coord.lon);
        const todayStr = new Date().toISOString().split("T")[0];

        // Filtra apenas os registros de hoje
        const todayData = data.list.filter((item) => {
            const itemDateStr = new Date(item.dt * 1000).toISOString().split("T")[0];
            item.hour = item.dt_txt.split(" ")[1].slice(0, 5);
            return itemDateStr === todayStr;
        });

        setWeatherToday(todayData);

        const forecastByDay = {};
        data.list.forEach((item) => {
            const date = item.dt_txt.split(" ")[0]; // "YYYY-MM-DD"
            if (!forecastByDay[date]) {
                forecastByDay[date] = [];
            }
            forecastByDay[date].push(item); // 👈 guarda o objeto inteiro
        });

        const dailyForecast = Object.entries(forecastByDay).map(([date, items]) => {
            const temps = items.map((i) => i.main.temp);
            const min = Math.min(...temps);
            const max = Math.max(...temps);
            const avgPop = items.reduce((sum, i) => sum + (i.pop || 0), 0) / items.length;

            const weatherItem =
                items.find(i => i.dt_txt.includes("12:00:00")) || items[Math.floor(items.length / 2)];

            if (date === todayStr && (!weather.pop || weather.pop !== Math.round(avgPop * 100))) {
                weather.pop = Math.round(avgPop * 100);
            }

            return {
                ...weather,
                date,
                dayName: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
                weatherItem: weatherItem,
                min,
                max,
                pop: Math.round(avgPop * 100)
            };
        });
        if (weather.pop) onChangeWeather(weather);
        setDailyForecast(dailyForecast);
    };

    const getHourlyForecastByItem = async (weatherData) => {
        const data = await getForecastByLatLon(weatherData.coord.lat, weatherData.coord.lon);

        // Filtra apenas os registros de hoje
        const todayData = data.list.filter((item) => {
            const itemDateStr = new Date(item.dt * 1000).toISOString().split("T")[0];
            item.hour = item.dt_txt.split(" ")[1].slice(0, 5);
            return itemDateStr === weatherData.date;
        });
        setWeatherToday(todayData);
    }

    return (
        <div className={`forecast-card transition-all duration-500 md:h-full md:p-12 ${openDailyForecast ? 'h-[45vh]' : 'h-[200px]'}`}>
            {weatherToday.length > 0 && (
                <div className="flex flex-col gap-3 p-6">
                    {!openDailyForecast && (
                        <>
                            <div className="flex gap-2 justify-between">
                                <p className="flex text-sm font-bold dark:text-white">{weather.date ? formatDate(weather.date) : 'Today'}</p>
                                <p className="flex text-sm text-gray-600 cursor-pointer hover:font-bold md:hidden" onClick={() => onChangeDailyForecast(!openDailyForecast)}>7 days &gt;</p>
                            </div>
                            <div className="flex gap-2 horizontal-scroll">
                                {weatherToday.map((item, i) => (
                                    <div
                                        key={i}
                                        className="px-4 py-2 flex flex-col border border-gray-300 dark:border-gray-600 rounded-[1.5rem]"
                                    >
                                        <div className="font-bold dark:text-white">{Math.round(item.main.temp)}°</div>
                                        <img
                                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                            alt={item.weather[0].description}
                                            className={`w-12 filter hue-rotate-40 saturate-150 brightness-110`}
                                        />
                                        <p className="text-xs text-gray-600">{item.hour}</p>
                                    </div>
                                ))}
                            </div>
                            {/* <div className="hidden md:flex flex-col">
                                {weatherToday.map((item, i) => (
                                    <div className="py-2 flex gap-2 items-center justify-between">
                                        <div className="w-10 text-xs text-gray-600">{item.hour}</div>
                                        <div className="w-24 flex gap-1 items-center justify-start">
                                            <img
                                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                                alt={item.weather[0].description}
                                                className={`w-10 max-w-full filter hue-rotate-40 saturate-150 brightness-110`}
                                            />
                                            <p className="text-xs text-gray-600">{item.weather[0].main}</p>
                                        </div>
                                        <div className="w-24 flex gap-2 justify-end">
                                            <p className="font-bold dark:text-white">{Math.round(item.main.temp)}°</p>
                                        </div>
                                    </div>
                                ))}
                            </div> */}
                        </>
                    )}
                    {(openDailyForecast || isMdUp) && (<>
                        <div className="flex gap-2 justify-between md:mt-6">
                            <p className="hidden md:flex text-sm font-bold dark:text-white">7 days</p>
                            <p className="flex text-sm text-gray-600 cursor-pointer hover:font-bold md:hidden" onClick={() => onChangeDailyForecast(!openDailyForecast)}>&lt; Back</p>
                        </div>
                        <div className="flex flex-col">
                            {dailyForecast.map((item, i) => (
                                <div
                                    key={i}
                                    className="py-2 flex gap-2 items-center justify-between cursor-pointer hover:font-bold"
                                    onClick={() => { onChangeDailyForecast(false); getHourlyForecastByItem(item); onChangeWeather(item); }}
                                >
                                    <div className="w-24 text-start text-sm dark:text-white">{formatDate(item.date)}</div>
                                    <div className="w-24 flex gap-1 items-center justify-start">
                                        <img
                                            src={`https://openweathermap.org/img/wn/${item.weatherItem.weather[0].icon}@2x.png`}
                                            alt={item.weatherItem.weather[0].description}
                                            className={`w-10 max-w-full filter hue-rotate-40 saturate-150 brightness-110`}
                                        />
                                        <p className="text-xs text-gray-600">{item.weatherItem.weather[0].main}</p>
                                    </div>
                                    <div className="w-24 flex gap-2 justify-end">
                                        <p className="font-bold dark:text-white">↑{Math.round(item.max)}°</p>
                                        <p className="text-gray-600">↓{Math.round(item.min)}°</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>)}
                </div>
            )}
        </div>
    );
}