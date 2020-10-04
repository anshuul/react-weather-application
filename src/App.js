import React, { Component } from "react";
import "./App.css";
import Axios from "axios";

const api = {
  key: "850d3cf2a23c2ac0ba9e20dbdf545e68",
  base: "https://api.openweathermap.org/data/2.5/",
};

class App extends Component {
  state = {
    weather: "",
    inputAdded: "",
  };

  dateBuilder = (d) => {
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

  locationAdded = (event) => {
    const newLocation = event.target.value;

    this.setState(
      {
        inputAdded: newLocation,
      },
      () => {
        console.log(this.state.inputAdded);
      }
    );
  };

  findLocationWeather = (e) => {
    if (e.keyCode === 13) {
      Axios.get(
        `${api.base}weather?q=${this.state.inputAdded}&units=metric&APPID=${api.key}`
      )
        .then((response) => {
          console.log(response);
          this.setWeather(response);
        })
        .catch((error) => alert(`City does not exist`));
      this.setState({
        inputAdded: "",
      });
    }
  };

  setWeather = (result) => {
    this.setState({ weather: result });
    console.log("Weather Received", this.state.weather.data.name);
  };

  render() {
    return (
      <div
        className={
          this.state.weather != ""
            ? this.state.weather.data.main.temp > 16
              ? "App Warm"
              : "App"
            : "App"
        }
      >
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              onChange={(event) => this.locationAdded(event)}
              onKeyDown={(event) => this.findLocationWeather(event)}
              placeholder="Enter your city"
              value={this.state.inputAdded}
            />
          </div>
          {this.state.weather != "" ? (
            <div>
              <div className="location-box">
                <div className="location">
                  {this.state.weather.data.name},{" "}
                  {this.state.weather.data.sys.country}
                </div>
                <div className="date">{this.dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(this.state.weather.data.main.temp)}°C
                </div>
                <div className="weather">
                  {this.state.weather.data.weather[0].main}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </main>
      </div>
    );
  }
}

export default App;
