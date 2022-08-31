import React from "react";
import { useWeather } from "../context/WeatherContext";

function Content() {
  const { data, weekday } = useWeather();
  const days = data.data.data.filter((item, index) => index < 8);
  return (
    <div className="row schema">
      {days.map((item, index) => (
        <div key={index} className="col">
          <h5 className="hColor">
            {weekday[new Date(item.datetime).getDay()]}
          </h5>
          <img
            src={`https://www.weatherbit.io/static/img/icons/${item.weather.icon}.png`}
            alt="img"
          />
          <div>
            <span className="degrees">{Math.round(item.max_temp)}°</span>{" "}
            <span className="degrees newColor">
              {Math.round(item.min_temp)}°
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Content;
