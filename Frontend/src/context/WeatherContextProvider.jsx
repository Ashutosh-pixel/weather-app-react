import React, { useState } from "react";
import { createContext } from "react";

export const WeatherContext = createContext();

export default function WeatherContextProvider({ children }) {
  const [weatherforcastarray, setWeatherforcastarray] = useState([]);
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");

  const [weathererror, setWeathererror] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [favoritecity, setFavCity] = useState("");

  return (
    <WeatherContext.Provider
      value={{
        weatherforcastarray,
        setWeatherforcastarray,
        temperatureUnit,
        setTemperatureUnit,
        weathererror,
        setWeathererror,
        recentSearches,
        setRecentSearches,
        favoriteCities,
        setFavoriteCities,
        favoritecity,
        setFavCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
