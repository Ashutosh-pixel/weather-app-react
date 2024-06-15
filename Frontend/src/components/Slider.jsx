import React, { useContext, useState } from "react";
import WeatherCard from "./WeatherCard";
import "./Slider.css";
import { WeatherContext } from "../context/WeatherContextProvider";
import dateFormat, { masks } from "dateformat";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { weatherforcastarray, setWeatherforcastarray } =
    useContext(WeatherContext);

  useContext(WeatherContext);

  const weatherData = [
    { day: "Today", tempHigh: 108, tempLow: 88, condition: "Sunny" },
    { day: "Sat 15", tempHigh: 107, tempLow: 90, condition: "Sunny" },
    { day: "Sun 16", tempHigh: 107, tempLow: 90, condition: "Sunny" },
    { day: "Mon 17", tempHigh: 106, tempLow: 91, condition: "Sunny" },
    { day: "Tue 18", tempHigh: 105, tempLow: 90, condition: "Sunny" },
  ];

  let weather = [];

  const weatherArray = () => {
    for (let i = 1; i < 10; i++) {
      if (i % 2 != 0) weather.push(weatherforcastarray[4 * i]);
    }
  };

  function getDailyTemperatures(forecastData) {
    const dailyTemps = [];
    const dateSet = new Set();
    let firstDateSkipped = false;

    for (let entry of forecastData) {
      const date = entry.dt_txt.split(" ")[0];

      if (!firstDateSkipped) {
        // Skip entries for the current day
        const currentDate = new Date().toISOString().split("T")[0];
        if (date === currentDate) {
          continue;
        }
        firstDateSkipped = true;
      }

      if (!dateSet.has(date)) {
        dailyTemps.push({
          date: date,
          temp: entry.main.temp,
        });
        dateSet.add(date);
      }

      // Break the loop once we have 5 unique dates
      if (dailyTemps.length === 5) {
        break;
      }
    }
    // console.log(dailyTemps);
    return dailyTemps;
  }

  weather = getDailyTemperatures(weatherforcastarray);

  // weatherArray();

  // console.log(weatherforcastarray);

  const slide = (direction) => {
    const newSlide = currentSlide + direction;
    if (newSlide >= 0 && newSlide < weatherData.length) {
      setCurrentSlide(newSlide);
    }
    // console.log(currentSlide);
  };

  return (
    <div className="slider-container">
      <button
        className="prev"
        onClick={() => slide(-1)}
        disabled={currentSlide === 0}
      >
        &#10094;
      </button>
      <div className="slider">
        <div
          className="slide"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {weather.map((weather, index) => (
            <WeatherCard
              key={index}
              day={dateFormat(weather.date, "fullDate")}
              temp={weather.temp}
            />
          ))}
        </div>
      </div>
      <button
        className="next"
        onClick={() => slide(1)}
        disabled={currentSlide === 1}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
