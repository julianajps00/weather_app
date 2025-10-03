import { useState, useEffect } from "react";

import { BsGeoAlt, BsCursorFill } from "react-icons/bs";

import ToogleTheme from "./ToogleTheme";
import { getWeatherByGeocoding, getWeatherByZIP, getWeatherByLatLon } from "../services/weatherApi";

export default function SearchInput({ onSearch }) {
    const [openSearch, setOpenSearch] = useState(false);
    const [search, setSearch] = useState("London, GB");
    const [searchSuggested, setSearchSuggested] = useState([]);
    const [recent, setRecent] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("recentSearches")) || [];
        setRecent(saved);
    }, []);

    const handleCityByGeocoding = async () => {
        try {
            let data = search;
            //if search starts with number → ZIP
            if (/^\d/.test(data)) {
                data = await getWeatherByZIP(data);
                updatedRecentSearch(data);
                setSearch(data.name + ', ' + data.sys.country);
                setOpenSearch(false);
                onSearch?.(data);
            } else {
                data = await getWeatherByGeocoding(data);
                setSearchSuggested(data);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSearch = async (e, latitude, longitude) => {
        e.preventDefault();

        const data = await getWeatherByLatLon(latitude, longitude);

        updatedRecentSearch(data);
        setSearchSuggested([]);
        setSearch(data.name + ', ' + data.sys.country);
        setOpenSearch(false);
        onSearch?.(data);
    };

    const handleSearchByCurrentLocation = async (e) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                handleSearch(e, latitude, longitude);
            },
            (err) => {
                console.error(err);
            }
        );
    };

    const updatedRecentSearch = async (data) => {
        const updated = [data, ...recent.filter(
            (r) => !(r.name === data.name && (r.country || r.sys?.country) === (data.country || data.sys?.country))
        ),].slice(0, 3); // mantém últimas 3
        setRecent(updated);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
    };

    return (
        <div className="relative w-full flex md:flex-row-reverse gap-2 items-center justify-between">
            <form className="w-full" onSubmit={(e) => {
                e.preventDefault();
                handleCityByGeocoding();
            }}>
                <div className="w-full md:w-auto peer flex items-center pl-3 bg-transparent text-base sm:text-sm/6 text-black border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400">
                    <div className="shrink-0 select-none mr-2">
                        <BsGeoAlt />
                    </div>
                    <input
                        type="text"
                        value={search}
                        onFocus={() => setOpenSearch(true)}
                        onBlur={() => setOpenSearch(false)}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="City or Zip Code"
                        className="w-full md:w-[300px] md:max-w-full block min-w-0 grow py-1.5 pr-3 pl-1 bg-transparent text-base placeholder:text-gray-400 focus:outline-none"
                    />
                </div>
                {openSearch && (<div className="z-20 absolute top-full w-full md:w-[300px] bg-white border rounded shadow block">
                    <div className="p-3 hover:bg-gray-100 cursor-pointer"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            handleSearchByCurrentLocation(e);
                        }}>
                        <div className="flex gap-2 items-center">
                            <BsCursorFill />
                            <span className="text-sm">Use current location</span>
                        </div>
                    </div>
                    {recent.length > 0 && !search?.trim() && (
                        <div>
                            <div className="px-3 py-2 border-b-1">
                                Recent
                            </div>
                            {recent.map((item, i) => (
                                <div
                                    key={i}
                                    className="z-10 p-3 text-sm hover:bg-gray-100 cursor-pointer"
                                    onMouseDown={(e) => {
                                        setSearch(item.name + ', ' + (item.country || item.sys?.country));
                                        setOpenSearch(false);
                                        onSearch?.(item);
                                    }}
                                >
                                    {item.name}, {item.country || item.sys?.country}
                                </div>
                            ))}
                        </div>
                    )}
                    {searchSuggested.length > 0 && search?.trim() && (
                        <div>
                            {searchSuggested.map((item, i) => (
                                <div type="button"
                                    key={i}
                                    className="relative z-50 p-3 text-sm hover:bg-gray-100 cursor-pointer"
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        handleSearch(e, item.lat, item.lon);
                                    }}
                                >
                                    {item.name}, {item.country}
                                </div>
                            ))}
                        </div>
                    )}
                </div>)}
            </form>
            <ToogleTheme />
        </div>
    );
}