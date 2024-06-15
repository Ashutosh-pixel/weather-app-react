import React, { createRef, useState, useEffect, useContext } from "react";
import axios from "axios";
// import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceFrown,
  faFaceGrimace,
  faFaceLaughBeam,
  faFrown,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "./Slider";
import { WeatherContext } from "../context/WeatherContextProvider";
import Favorite from "./Favorite";
import RecentSearches from "./RecentSearches";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
  const { temperatureUnit, setTemperatureUnit } = useContext(WeatherContext);
  const [emptyInputError, setEmptyInputError] = useState(false);
  // const [recentSearches, setRecentSearches] = useState([]);
  const { recentSearches, setRecentSearches } = useContext(WeatherContext);
  const { favoritecity, setFavCity } = useContext(WeatherContext);

  const inputRef = createRef();

  let { weatherforcastarray, setWeatherforcastarray } =
    useContext(WeatherContext);

  const search = async () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      // If the query is empty, reset the error state to false and set emptyInputError to true
      setWeather({ data: {}, loading: false, error: false });
      setEmptyInputError(true);
      return;
    }

    setEmptyInputError(false); // Reset the empty input error state

    setWeather({ ...weather, loading: true });

    const url = "https://api.openweathermap.org/data/2.5/weather";

    const fivedayurl = "https://api.openweathermap.org/data/2.5/forecast";

    try {
      const response = await axios.get(url, {
        params: {
          q: trimmedQuery,
          units: temperatureUnit === "celsius" ? "metric" : "imperial",
          appid: appid,   //ENTER YOUR APIKEY
        },
      });

      const fivedaysweather = await axios.get(fivedayurl, {
        params: {
          q: trimmedQuery,
          units: temperatureUnit === "celsius" ? "metric" : "imperial",
          appid: appid, //ENTER YOUR APIKEY
        },
      });

      weatherforcastarray = fivedaysweather.data.list;
      setWeatherforcastarray(weatherforcastarray);
      // console.log(weatherforcastarray);

      if (!response.data || Object.keys(response.data).length === 0) {
        // If the data is empty, set the error state to true
        setWeather({ data: {}, loading: false, error: true });
      } else {
        // Otherwise, update the weather state with the received data
        setWeather({ data: response.data, loading: false, error: false });

        // Update recent searches only when a valid search is performed
        updateRecentSearches(trimmedQuery);
      }
    } catch (error) {
      // Handle other errors (e.g., network issues)
      setWeather({ ...weather, data: {}, loading: false, error: true });
      console.log("error", error);
    }
  };

  const updateRecentSearches = (search) => {
    const normalizedSearch = search.toLowerCase();
    const normalizedRecentSearches = recentSearches.map((item) =>
      item.toLowerCase()
    );

    if (!normalizedRecentSearches.includes(normalizedSearch)) {
      // Add the new search to the beginning of the array and keep only the last 5 searches
      const updatedSearches = [search, ...recentSearches].slice(0, 5);

      // Update the state and localStorage
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    }
  };

  useEffect(() => {
    // Call the search function when temperatureUnit changes
    search();
  }, [temperatureUnit]);

  const switchTemperatureUnit = (unit) => {
    setTemperatureUnit(unit);
  };

  useEffect(() => {
    // Load recent searches from local storage on component mount
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  // function favoriteCityAdd(city) {
  //   fetch("http://localhost:3001/favorites", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       cityName: `${city}`,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }

  // function getFavoriteCities() {
  //   fetch("http://localhost:3001/favorites")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }

  return (
    <div>
      <h1 className="app-name">
        Weather App<span>🔆</span>
      </h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Search City.."
          name="query"
          onChange={(event) => setQuery(event.target.value)}
          ref={inputRef}
        />
        <button onClick={search} className="search-button">
          Search
        </button>
      </div>

      {/* Display empty input error message */}
      {emptyInputError && (
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFaceLaughBeam} />
            <span> Please enter a city name</span>
          </span>
        </>
      )}

      {weather.loading && (
        <>
          <br />
          <br />
          {/* <Loader type="Oval" color="black" height={100} width={100} /> */}
        </>
      )}
      {weather.error && (
        <>
          {query && (
            <>
              <br />
              <br />
              <span className="error-message">
                <FontAwesomeIcon icon={faFrown} />
                <span> Sorry, City not found</span>
              </span>
            </>
          )}
        </>
      )}

      {weather && weather.data && weather.data.main && (
        <div>
          <div className="city-name">
            <h2>
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
          </div>
          <div className="icon-temp">
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            {temperatureUnit === "celsius"
              ? `${Math.round(weather.data.main.temp)}°C`
              : `${Math.round(weather.data.main.temp)}K`}
          </div>
          <div className="des-wind">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>Wind Speed: {weather.data.wind.speed}m/s</p>
          </div>

          {/* Show temperature unit buttons only when data is available */}
          <div>
            <button onClick={() => switchTemperatureUnit("celsius")}>
              Celsius
            </button>
            <button onClick={() => switchTemperatureUnit("kelvin")}>
              Kelvin
            </button>
          </div>
          {weatherforcastarray.length > 0 && <Slider />}
          <RecentSearches></RecentSearches>
          <Favorite></Favorite>
        </div>
      )}

      {/* Display recent searches */}
      {/* <RecentSearches></RecentSearches> */}
      {/* <Favorite></Favorite> */}
    </div>
  );
}

export default Weather;
