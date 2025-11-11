import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { BsSearch, BsArrowUp, BsArrowDown } from "react-icons/bs";

import { getForecastByLatLon } from "../services/weatherApi";

import { formatDate, formatDateWeekName } from "../utils/Date";
import { useIsScreenMdUp } from "../utils/Screen";

export default function HourlyForecast({ weather, onChangeWeather, openDailyForecast, onChangeDailyForecast }) {
    const [weatherToday, setWeatherToday] = useState([]);
    const [dailyForecast, setDailyForecast] = useState([]);
    const isMdUp = useIsScreenMdUp();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (weather && !weather.min) getHourlyForecastByLatLon();
    }, [weather?.coord?.lat, weather?.coord?.lon, i18n.language]);

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

            return {
                ...weather,
                date,
                dayName: formatDateWeekName(date),
                weatherItem: weatherItem,
                min,
                max,
                pop: Math.round(avgPop * 100)
            };
        });
        const todayForecast = dailyForecast.find((d) => d.date === todayStr);
        const newPop = todayForecast ? todayForecast.pop : weather?.pop;

        if (newPop && newPop !== weather?.pop) {
            onChangeWeather((prev) => ({
                ...prev,
                pop: newPop,
            }));
        }

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
        <div className={`forecast-card`}>
            {weather ? (
                <div className="flex flex-col gap-3 p-6">
                    {(!openDailyForecast || isMdUp) && (
                        <>
                            <div className="flex gap-2 justify-between">
                                <p className="flex text-sm font-bold dark:text-white">{!weather.date || formatDate(weather.date) === formatDate(new Date()) ? t("next_few_hours") : formatDate(weather.date)}</p>
                                <p className="flex text-sm text-gray-600 cursor-pointer hover:font-bold md:hidden" onClick={() => onChangeDailyForecast(!openDailyForecast)}>{t("7days")} &gt;</p>
                            </div>
                            <div className="flex md:grid grid-cols-8 gap-2 horizontal-scroll">
                                {weatherToday.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`px-3 py-2 flex flex-col justify-center items-center border border-gray-300 dark:border-gray-600 rounded-[.5rem] ${isMdUp ? `background` : `bg-none`} md:border-0`}
                                    >
                                        <div className="text-center text-sm dark:text-white">{item.hour}</div>
                                        <img
                                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                            alt={item.weather[0].description}
                                            className={`w-12 filter hue-rotate-40 saturate-150 brightness-110`}
                                        />
                                        <div className="flex justify-center gap-2 text-xs">
                                            <p className="font-bold dark:text-white">{Math.round(item.main.temp)}°</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {(openDailyForecast || isMdUp) && (<>
                        <div className="flex gap-2 justify-between md:mt-6">
                            <p className="hidden md:flex text-sm font-bold dark:text-white">{t("next_few_days")}</p>
                            <p className="flex text-sm text-gray-600 cursor-pointer hover:font-bold md:hidden" onClick={() => onChangeDailyForecast(!openDailyForecast)}>&lt; {t("back")}</p>
                        </div>
                        <div className="flex flex-col md:hidden">
                            {dailyForecast.map((item, i) => (
                                <div
                                    key={i}
                                    className="py-2 flex gap-2 items-center justify-between cursor-pointer hover:font-bold"
                                    onClick={() => { onChangeDailyForecast(false); getHourlyForecastByItem(item); onChangeWeather(item); }}
                                >
                                    <div className="min-w-28 text-start text-sm dark:text-white">{formatDate(item.date)}</div>
                                    <div className="w-full flex gap-1 items-center justify-start">
                                        <img
                                            src={`https://openweathermap.org/img/wn/${item.weatherItem.weather[0].icon}@2x.png`}
                                            alt={item.weatherItem.weather[0].description}
                                            className={`w-10 max-w-full filter hue-rotate-40 saturate-150 brightness-110`}
                                        />
                                        <p className="text-start text-xs text-gray-600">{item.weatherItem.weather[0].description}</p>
                                    </div>
                                    <div className="min-w-24 flex gap-1 justify-end">
                                        <p className="flex items-center font-bold dark:text-white"><BsArrowUp />{Math.round(item.max)}°</p>
                                        <p className="flex items-center text-gray-600"><BsArrowDown />{Math.round(item.min)}°</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="hidden md:grid grid-cols-6 gap-2">
                            {dailyForecast.map((item, i) => (
                                <div
                                    key={i}
                                    className={`px-3 py-2 flex flex-col border border-gray-300 dark:border-gray-600 rounded-[.5rem] md:border-0 cursor-pointer ${formatDate(item.date) === formatDate(weather.date) ? `background-selected` : `background`}`}
                                    onClick={() => { onChangeDailyForecast(false); getHourlyForecastByItem(item); onChangeWeather(item); }}
                                >
                                    <div className="text-center text-sm dark:text-white">{item.dayName}</div>
                                    <div className="flex items-center justify-center">
                                        <img
                                            src={`https://openweathermap.org/img/wn/${item.weatherItem.weather[0].icon}@2x.png`}
                                            alt={item.weatherItem.weather[0].description}
                                            className={`w-12 max-w-full filter hue-rotate-40 saturate-150 brightness-110`}
                                        />
                                    </div>
                                    <div className="flex justify-center gap-1 text-xs">
                                        <p className="flex items-center font-bold dark:text-white"><BsArrowUp />{Math.round(item.max)}°</p>
                                        <p className="flex items-center text-gray-600"><BsArrowDown />{Math.round(item.min)}°</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>)}
                </div>
            )
                :
                (
                    <div className="w-full h-full p-5 flex flex-col gap-2 items-start justify-center">
                        <p className="text-start flex gap-1 items-center"><BsSearch /> {t("city_not_found")}</p>
                        <p className="text-start text-xs text-gray-600 dark:text-gray-300 whitespace-pre-line">{t("not_found_description")}</p>
                    </div>
                )
            }
        </div>
    );
}