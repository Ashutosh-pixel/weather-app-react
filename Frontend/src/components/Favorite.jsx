import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Favorite() {
  const { favoriteCities, setFavoriteCities } = useContext(WeatherContext);
  const { favoritecity, setFavCity } = useContext(WeatherContext);

  const removeFromFavorites = (cityId) => {
    fetch(`http://localhost:3001/favorites/${cityId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete city from favorites.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("City deleted from favorites:", data);
        // Show toast notification
        // toast.success("City deleted from favorites.");
        // Update frontend state
        const updatedFavorites = favoriteCities.filter(
          (city) => city.id !== cityId
        );
        setFavoriteCities(updatedFavorites);
      })
      .catch((error) => {
        console.error("Error deleting city from favorites:", error);
        // Show toast notification for error
        // toast.error("Error deleting city from favorites.");
      });
  };

  const addFavCity = (cityId, cityName) => {
    // console.log(cityId);
    setFavCity(cityName);
  };

  return (
    <>
      <ToastContainer />
      <h3>Favorite Searches</h3>
      <details className="dropdown">
        <summary className="m-1 btn">Cities</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          {favoriteCities.map((city) => (
            <li
              key={city.id}
              onClick={(e) => addFavCity(city.id, city.cityName)}
            >
              {city.cityName}
              <button
                className="ml-2 text-red-500"
                onClick={() => removeFromFavorites(city.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
