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
    forecast: "",
    tempData: "",
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      Axios.get(
        `https://us1.locationiq.com/v1/reverse.php?key=pk.fad98be50067c0d5c523819363c47ad8&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
      ).then((response) => {
        this.saveData(response);
      });
    });
  }

  saveData = (result) => {
    this.setState({
      tempData: result,
    });
    this.getWeatherFromApi(result.data.address.city);
  };

  getWeatherFromApi = (location) => {
    Axios.get(`${api.base}weather?q=${location}&units=metric&APPID=${api.key}`)
      .then((response) => {
        this.setWeather(response);
      })
      .catch((error) => alert(error));
    Axios.get(`${api.base}forecast?q=${location}&units=metric&APPID=${api.key}`)
      .then((response) => {
        this.setForecast(response);
      })
      .catch((error) => alert(error));
    this.setState({
      inputAdded: "",
    });
  };

  locationAdded = (event) => {
    const newLocation = event.target.value;

    this.setState({
      inputAdded: newLocation,
    });
  };

  findLocationWeather = (e) => {
    if (e.keyCode === 13) {
      this.getWeatherFromApi(this.state.inputAdded);
    }
  };

  setWeather = (result) => {
    this.setState({ weather: result }, () => {
      console.log(this.state.weather);
    });
    console.log("Weather Received for", this.state.weather.data.name);
  };

  setForecast = (result) => {
    this.setState({ forecast: result }, () => {
      console.log(this.state.forecast);
    });
    console.log("Forecast Received for", this.state.weather.data.name);
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
          {this.state.weather && this.state.forecast !== "" ? (
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
              forecastdata={this.state.forecast.data.list}
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
