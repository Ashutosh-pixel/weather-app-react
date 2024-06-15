import React, { useContext, useEffect } from "react";
import { WeatherContext } from "../context/WeatherContextProvider";
import Favorite from "./Favorite";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RecentSearches.css";

export default function RecentSearches() {
  const {
    recentSearches,
    setRecentSearches,
    favoriteCities,
    setFavoriteCities,
  } = useContext(WeatherContext);

  function favoriteCityAdd(city) {
    const normalizedCity = city.toLowerCase();
    const normalizedFavoriteCities = favoriteCities.map((item) =>
      item.cityName.toLowerCase()
    );

    if (!normalizedFavoriteCities.includes(normalizedCity)) {
      fetch("http://localhost:3001/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cityName: city,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("City added to favorites:", data);
          // Show toast notification
          // toast.success(`City "${city}" added to favorites!`);
          // Fetch the updated list of favorite cities
          getFavoriteCities();
        })
        .catch((error) => {
          console.error("Error adding favorite city:", error);
          // Show toast notification for error
          toast.error("Error adding city to favorites.");
        });
    } else {
      console.log("City is already in favorites:", city);
      // Show toast notification for duplicate
      toast.info(`City "${city}" is already in favorites.`);
    }
  }

  function getFavoriteCities() {
    fetch("http://localhost:3001/favorites")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Favorite cities:", data);
        setFavoriteCities(data); // Assuming you have setFavoriteCities in your context
      })
      .catch((error) => {
        console.error("Error fetching favorite cities:", error);
        // Show toast notification for error
        toast.error("Error fetching favorite cities.");
      });
  }

  // Use useEffect to fetch favorite cities when the component mounts
  useEffect(() => {
    getFavoriteCities();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <>
      <ToastContainer />
      {recentSearches.length > 0 && (
        <div>
          <h3>Recent Searches</h3>
          <details className="dropdown">
            <summary className="m-1 btn">Cities</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              {recentSearches.map((search, index) => (
                <li key={index} onClick={() => favoriteCityAdd(search)}>
                  {search}
                </li>
              ))}
            </ul>
          </details>
          {/* <Favorite></Favorite> */}
        </div>
      )}
    </>
  );
}
