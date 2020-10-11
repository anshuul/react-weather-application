import React from "react";
import "./displayWeather.css";
import Aux from "../../hoc/Auxiliary";
import Forecast from "../Forecast/Forecast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";

const displayWeather = (props) => {
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date}, ${month} ${year}`;
  };

  let weatherIcon = null;

  if (props.icon === "Thunderstorm") {
    weatherIcon = <FontAwesomeIcon icon={faBolt} />;
  } else if (props.icon === "Drizzle") {
    weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
  } else if (props.icon === "Rain") {
    weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
  } else if (props.icon === "Snow") {
    weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
  } else if (props.icon === "Clear") {
    weatherIcon = <FontAwesomeIcon icon={faSun} />;
  } else if (props.icon === "Clouds") {
    weatherIcon = <FontAwesomeIcon icon={faCloud} />;
  } else {
    weatherIcon = <FontAwesomeIcon icon={faSmog} />;
  }

  return (
    <Aux>
      <div className="display">
        <div className="div1">
          <div className="location-box">
            <div className="location">
              {props.name},{props.country}
            </div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{Math.round(props.temp)}°C</div>
            <div className="weather">
              <div className="city-icon">{weatherIcon}</div>
              <p> {props.data} </p>
            </div>
          </div>
        </div>
        <div className="div2">
          <div className="weather-details">
            <div className="firstrow">
              <div className="details">
                <div className="data">{Math.round(props.feelslike)}°C</div>
                <p>Feels like</p>
              </div>
              <div className="details">
                <div className="data">{props.sunrise} </div>
                <p>Sunrise</p>
              </div>
              <div className="details">
                <div className="data">{props.wind}mph</div>
                <p>Wind</p>
              </div>
            </div>
            <div className="secondrow">
              <div className="details">
                <div className="data">{props.humidity}</div>
                <p>Humidity</p>
              </div>
              <div className="details">
                <div className="data">{props.sunset} </div>
                <p>Sunrise</p>
              </div>
              <div className="details">
                <div className="data">
                  {(props.visibility / 1000).toFixed(1)}Km
                </div>
                <p>Visibilty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2>Forecast</h2>
      <div className="forecast-box">
        <Forecast forecast={props.forecastdata} />
      </div>
    </Aux>
  );
};

export default displayWeather;
