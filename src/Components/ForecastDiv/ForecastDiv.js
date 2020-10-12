import React from "react";
import "./ForecastDiv.css";
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

const forecastDiv = (props) => {
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

  // '2020-10-11 15:00:00'
  let [date, time] = props.date.split(" ");
  // date = '2020-10-11;
  // time = '15:00:00'
  date = date.slice(date.indexOf("-") + 1, date.length);
  //date.slice(5,10)=> 5,6,7,8,9
  // date.indexOf("-") => gives you the index of specified char
  time = time.slice(0, time.lastIndexOf(":"));
  return (
    <div className="forecast">
      <p className="p1" style={{ padding: "5px" }}>
        {date}
      </p>
      <p className="p2" style={{ paddingBottom: "5px" }}>
        {time}
      </p>
      <div className="icon" style={{ paddingTop: "5px" }}>
        {weatherIcon}
      </div>
      <p className="p3" style={{ padding: "10px" }}>
        {props.temp.toFixed(1)}°C
      </p>
    </div>
  );
};

export default forecastDiv;
