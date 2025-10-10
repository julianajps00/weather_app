import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import './App.css';

import Header from "./components/Header";
import CitySearch from "./components/CitySearch";
import WeatherCard from "./components/WeatherCard";
import HourlyForecast from "./components/HourlyForecast";
import useDayNight from "./hooks/useDayNight";

import { getWeatherByZIP, getWeatherByLatLon } from "./services/weatherApi";
import { useIsScreenMdUp } from "./utils/Screen";

const defaultCities = { pt: "Lisboa,PT", en: "London,GB" };

function App() {
  const [firstLoading, setFirstLoading] = useState(true);
  const [openDailyForecast, setOpenDailyForecast] = useState(false);
  const [weather, setWeather] = useState(null);
  const timeOfDay = useDayNight();
  const isMdUp = useIsScreenMdUp();
  const { i18n } = useTranslation();
  const [search, setSearch] = useState(defaultCities[i18n.language]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (weather) {
        const data = await getWeatherByLatLon(weather.coord.lat, weather.coord.lon);
        setWeather(data);
      } else {
        const data = await getWeatherByZIP(search);
        setWeather(data.error ? null : data);
      }
      setFirstLoading(false)
    };
    fetchWeather();
  }, [i18n.language]);

  useEffect(() => {
    setWeather(weather);
  }, [weather]);

  return (
    <div className="App w-full h-full min-h-screen">
      <Header />
      <main className={`w-full h-full min-h-[calc(100svh_-_36px)] flex ${isMdUp ? `sky-${timeOfDay}` : `bg-none`} md:p-5 md:items-center md:justify-center`}>
        {firstLoading && (!search || !weather) ?
          <></>
          :
          <div className={`flex flex-col md:flex-row w-full md:w-[1200px] flex-1 md:h-auto md:min-h-[500px] md:mx-auto background md:bg-none md:bg-white md:rounded-[2rem]`}>
            <div className={`flex-1 text-sky-950 md:text-inherit rounded-b-[3rem] border-t-0 border-y border-gray-300 shadow-[0_10px_15px_rgba(59,130,246,0.4)] dark:border-slay-800 dark:shadow-sm ${isMdUp ? `background` : `sky-${timeOfDay}`} md:rounded-b-0 md:rounded-l-[2rem] md:shadow-none md:border-0 md:w-[30%] md:h-full`}>
              <div className="p-6 h-[86px]">
                <CitySearch onSearch={setWeather} search={search} changeSearch={setSearch} />
              </div>
              <WeatherCard weather={weather} openDailyForecast={openDailyForecast}></WeatherCard>
            </div>
            <div className="flex-none md:w-[70%] md:h-auto md:rounded-r-[2rem] md:bg-white md:dark:bg-sky-900">
              <HourlyForecast weather={weather} onChangeWeather={setWeather} openDailyForecast={openDailyForecast} onChangeDailyForecast={setOpenDailyForecast}></HourlyForecast>
            </div>
          </div>
        }
      </main>
    </div>
  );
}

export default App;
