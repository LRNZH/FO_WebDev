import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const key = process.env.REACT_APP_API_KEY;
    const q = country[0].capital[0];

    axios
      .get(
        "http://api.weatherapi.com/v1/current.json?key=" +
          key +
          "&q=" +
          q +
          "&aqi=yes"
      )
      .then((response) => {
        const apiResponse = response.data;
        setWeather([apiResponse]);
      })

      .catch((error) => {});
  });

  if (weather.length > 0) {
    const currentWeather = weather[0].current;
    const currentLocation = weather[0].location;
    return (
      <div>
        {country.map((countr, index) => (
          <div key={index}>
            <h2>{countr.name.common}</h2>
            <p>Capital: {countr.capital[0]}</p>
            <p>Population: {countr.population}</p>
            <p>area: {countr.area} sq. km</p>
            <h3>Languages:</h3>
            <ul>
              {Object.values(countr.languages).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
            <img src={countr.flags.png} alt={countr.flags.alt} />
          </div>
        ))}
        <h2>Weather in {country[0].capital}</h2>
        <p>
          temperature: {currentWeather.temp_c}° Celcius, feels like{" "}
          {currentWeather.feelslike_c}° Celcius
        </p>
        <img src={currentWeather.condition.icon} alt="Weather icon"></img>
        <p>
          wind speed: {currentWeather.wind_mph}mph, direction:{" "}
          {currentWeather.wind_dir}
        </p>
        <p>Air Quality Index: {currentWeather.air_quality["us-epa-index"]}</p>
        <p>Local date & time: {currentLocation.localtime}</p>
      </div>
    );
  }

  return (
    <div>
      {country.map((countr, index) => (
        <div key={index}>
          <h2>{countr.name.common}</h2>
          <p>Capital: {countr.capital[0]}</p>
          <p>Population: {countr.population}</p>
          <p>area: {countr.area} sq. km</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(countr.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>

          <img src={countr.flags.png} alt={countr.flags.alt} />
        </div>
      ))}
    </div>
  );
};

export default Country;
