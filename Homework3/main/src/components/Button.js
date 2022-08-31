import React from "react";
import { useWeather } from "../context/WeatherContext";

function Button() {
  const { cities, activeCity, setActiveCity } = useWeather();
  return (
    <div>
      <select
      className="iColor"
        defaultValue={activeCity}
        onChange={(e) => setActiveCity(e.target.value)}
        name="city"
      >
        {cities.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Button;
