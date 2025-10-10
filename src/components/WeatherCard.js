
import { BsCalendar3, BsWind, BsDroplet, BsCloudRain, BsThermometerHigh } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import "../i18n";

import { motion } from "framer-motion";

import { formatDate } from "../utils/Date";

export default function WeatherCard({ weather, openDailyForecast }) {
    const { t } = useTranslation();

    return (
        <div className="weather-card h-[calc(100%_-_86px)]">
            {weather && (weather?.weather?.length > 0 || weather?.weatherItem?.weather?.length > 0) && (
                <div className="h-full px-6 pb-8">
                    <div className="h-full flex flex-col justify-between divide-y divide-gray-300 md:divide-y-0 md:divide-gray-0">
                        <div className="h-full flex items-center justify-center gap-3">
                            <div className="flex flex-col gap-3 items-center">
                                <p className="flex gap-2 text-sm items-center">{!weather.min ? t("now") : <><BsCalendar3 />{formatDate(weather.date)}</>}</p>
                                <motion.div
                                    layout
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className={`flex md:flex-row-reverse md:items-start md:justify-center ${!openDailyForecast ? 'flex-col items-center' : 'flex-row-reverse'
                                        }`}
                                >
                                    <motion.img
                                        layout
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        src={!weather.min ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png` : `https://openweathermap.org/img/wn/${weather.weatherItem.weather[0].icon}@4x.png`}
                                        alt={!weather.min ? weather.weather[0].description : weather.weatherItem.weather[0].description}
                                        className={`filter hue-rotate-40 saturate-150 brightness-110 md:w-24 ${!openDailyForecast ? "w-60 max-w-[90%] -mt-5 -mb-10" : "w-28"
                                            }`}
                                    />
                                    {!weather.min && <motion.h1 layout className="font-bold">{Math.round(weather.main.temp)}°</motion.h1>}
                                </motion.div>
                                <div className="flex flex-col md:hidden">
                                    <h2 className={`capitalize transition-all duration-500 ease-in-out ${openDailyForecast ? "text-xl" : ""}`}>
                                        {weather.weather[0].description}
                                    </h2>
                                    <p className="hidden md:flex">{t("feels_like")} {Math.round(weather.main.feels_like)}°</p>
                                </div>
                                <div className="flex gap-1 mb-4">
                                    <p className="text-md font-bold">↑{Math.round(weather.main.temp_max)}°</p>
                                    <p className="text-md">↓{Math.round(weather.main.temp_min)}°</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-auto pt-8 flex gap-2 items-center md:flex-col md:gap-4">
                            <p className="hidden md:flex w-full text-sm text-start font-bold capitalize">{weather.weather[0].description}</p>
                            <div className="hidden md:flex-row gap-1 items-center">
                                <BsThermometerHigh className="w-6 md:w-4 h-auto md:mr-1" />
                                <p className="hidden md:block text-sm text-start">{t("feels_like")}: <span className="font-bold">{Math.round(weather.main.feels_like)}°</span></p>
                            </div>
                            <div className="w-full flex flex-col md:flex-row gap-1 items-center">
                                <BsWind className="w-6 md:w-4 h-auto md:mr-1" />
                                <p className="hidden md:block text-sm text-start">{t("humidity")}: <span className="font-bold">{Math.round(weather.wind.speed * 3.6)} hm/h</span></p>
                                <p className="block md:hidden text-sm font-bold">{Math.round(weather.wind.speed * 3.6)} hm/h</p>
                                <p className="flex md:hidden text-sm text-gray-600">{t("wind")}</p>
                            </div>
                            <div className="w-full flex flex-col md:flex-row gap-1 items-center">
                                <BsDroplet className="w-6 md:w-4 h-auto md:mr-1" />
                                <p className="hidden md:block text-sm text-start">{t("humidity")}: <span className="font-bold">{weather.main.humidity}%</span></p>
                                <p className="block md:hidden text-sm font-bold">{weather.main.humidity}%</p>
                                <p className="flex md:hidden text-sm text-gray-600">{t("humidity")}</p>
                            </div>
                            <div className="w-full flex flex-col md:flex-row gap-1 items-center">
                                <BsCloudRain className="w-6 md:w-4 h-auto md:mr-1" />
                                <p className="hidden md:block text-sm text-start">{t("chance_of_rain")}: <span className="font-bold">{Number(weather.pop) || 0}%</span></p>
                                <p className="block md:hidden text-sm font-bold">{Number(weather.pop) || 0}%</p>
                                <p className="flex md:hidden text-sm text-gray-600">{t("chance_of_rain")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
}