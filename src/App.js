import { useEffect, useState } from "react";

import './App.css';

import CitySearch from "./components/CitySearch";
import WeatherCard from "./components/WeatherCard";
import HourlyForecast from "./components/HourlyForecast";
import useDayNight from "./hooks/useDayNight";

import { getWeatherByZIP } from "./services/weatherApi";

function App() {
  const [openDailyForecast, setOpenDailyForecast] = useState(false);
  const [weather, setWeather] = useState(null);
  const [hour, setHour] = useState('Now');
  const timeOfDay = useDayNight();

  useEffect(() => {
    getWeatherByZIP("London,GB").then((data) => setWeather(data));
  }, []);

  useEffect(() => {
    searchLocation(weather);
  }, [weather]);

  const searchLocation = async (weather) => {
    updateDate();
    setWeather(weather);
  };

  const updateDate = async () => {
    let date = new Date((weather?.dt + weather?.timezone) * 1000);
    const timer = setTimeout(() => {
      setHour(date.toUTCString().slice(17, 22));
    }, 180000);

    return () => clearTimeout(timer); // cleanup se desmontar
  };

  return (
    <div className="App w-full h-screen md:h-full">
      <main className="w-full h-full">
        <div className={`h-full flex flex-col background`}>
          <div className={`flex-1 rounded-b-[3rem] border-t-0 border-y border-gray-300 shadow-[0_10px_15px_rgba(59,130,246,0.4)] dark:border-slay-800 dark:shadow-sm sky-${timeOfDay} md:rounded-b-[0px] md:shadow-none md:border-0`}>
            <div className="p-6 h-[86px]">
              <CitySearch onSearch={searchLocation} />
            </div>
            <WeatherCard weather={weather} hour={hour} openDailyForecast={openDailyForecast}></WeatherCard>
          </div>
          <div className="flex-none">
            <HourlyForecast weather={weather} onChangeWeather={setWeather} openDailyForecast={openDailyForecast} onChangeDailyForecast={setOpenDailyForecast}></HourlyForecast>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
