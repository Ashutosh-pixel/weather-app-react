import React, { useContext } from "react";
import "./WeatherCard.css";
import { WeatherContext } from "../context/WeatherContextProvider";

const WeatherCard = ({ day, temp }) => {
  const { temperatureUnit, setTemperatureUnit } = useContext(WeatherContext);
  return (
    <div className="weather-card">
      <p>{day}</p>
      <>{temp}</>
      {temperatureUnit == "celsius" ? <>°C</> : <>K</>}
    </div>
  );
};

export default WeatherCard;
