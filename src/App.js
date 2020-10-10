import React, { Component } from "react";
import "./App.css";
import Axios from "axios";
import DisplayWeather from "./Components/DisplayWeather/displayWeather";

const api = {
  key: "850d3cf2a23c2ac0ba9e20dbdf545e68",
  base: "https://api.openweathermap.org/data/2.5/",
};

class App extends Component {
  state = {
    weather: "",
    inputAdded: "",
  };

  /*   componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      Axios.get(
        `${api.base}onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${api.key}`
      )
        .then((response) => {
          console.log(response);
          this.displayWeatherInfo(response);
        })
        .catch((error) => console.log(error));
    });
  }

  displayWeatherInfo = (response) => (
    <DisplayWeather
      name={response.data.name}
      country={response.data.sys.country}
      temp={response.data.main.temp}
      icon={response.data.weather[0].icon}
      description={response.data.weather[0].description}
      data={response.data.weather[0].main}
    />
  ); */

  locationAdded = (event) => {
    const newLocation = event.target.value;

    this.setState({
      inputAdded: newLocation,
    });
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
        .catch((error) => alert(error));
      this.setState({
        inputAdded: "",
      });
    }
  };

  setWeather = (result) => {
    this.setState({ weather: result });
    console.log("Weather Received for", this.state.weather.data.name);
  };

  timeConverter(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const mins = date.getMinutes();
    const finalTime = hours + ":" + mins;
    return finalTime;
  }

  render() {
    return (
      <div className={"App"}>
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
          {this.state.weather !== "" ? (
            <DisplayWeather
              name={this.state.weather.data.name}
              country={this.state.weather.data.sys.country}
              temp={this.state.weather.data.main.temp}
              icon={this.state.weather.data.weather[0].main}
              description={this.state.weather.data.weather[0].description}
              data={this.state.weather.data.weather[0].main}
              //maxtemp={this.state.weather.data.main.temp_max}
              //mintemp={this.state.weather.data.main.temp_min}
              feelslike={this.state.weather.data.main.feels_like}
              humidity={this.state.weather.data.main.humidity}
              sunrise={this.timeConverter(this.state.weather.data.sys.sunrise)}
              sunset={this.timeConverter(this.state.weather.data.sys.sunset)}
              wind={this.state.weather.data.wind.speed}
              visibility={this.state.weather.data.visibility}
            />
          ) : (
            ""
          )}
        </main>
      </div>
    );
  }
}

export default App;
