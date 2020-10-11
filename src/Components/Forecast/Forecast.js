import React from "react";
import ForecastDiv from "../ForecastDiv/ForecastDiv";

const Forecast = (props) => {
  return props.forecast.map((forecast) => {
    return (
      <ForecastDiv
        temp={forecast.main.temp}
        time={forecast.dt_txt}
        icon={forecast.weather[0].main}
        date={forecast.dt_txt}
        key={forecast.dt_txt}
      />
    );
  });
};

export default Forecast;
