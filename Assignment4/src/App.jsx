import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = '669adea248967c5cb7281a3070c1dfa2';

const QUICK_CITIES = ['Kolkata', 'London', 'New York', 'Tokyo', 'Sydney', 'Paris'];

export default function App() {
  const [city, setCity] = useState('Kolkata');
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (targetCity) => {
    if (!targetCity.trim()) {
      setError('Please provide a valid city name.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          targetCity
        )}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`City "${targetCity}" not found. Check the spelling and try again.`);
        } else if (response.status === 401) {
          throw new Error('Your API key is still activating or invalid. OpenWeatherMap keys can take 10-60 minutes to go live after generation.');
        } else {
          throw new Error('Unable to retrieve weather data. Please try again later.');
        }
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setWeatherData(null);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      fetchWeather(searchInput.trim());
      setSearchInput('');
    }
  };

  const formatTime = (unixSec, timezoneSec) => {
    if (!unixSec) return '--:--';
    const date = new Date((unixSec + timezoneSec) * 1000);
    return date.toUTCString().slice(17, 22);
  };

  return (
    <div className="weather-app-container">
      <div className="glow-blob blob-top"></div>
      <div className="glow-blob blob-bottom"></div>

      <div className="weather-shell">
        <header className="weather-header">
          <div className="header-text">
            <h1>Atmospheric Intelligence</h1>
            <p>Real-time OpenWeatherMap Observation Dashboard</p>
          </div>

          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="search-input-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search any global city..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button type="submit" className="search-submit-btn">Search</button>
          </form>
        </header>

        <div className="quick-access-bar">
          <span className="quick-label">Quick Jump:</span>
          <div className="chips-list">
            {QUICK_CITIES.map((c) => (
              <button
                key={c}
                className={`city-chip ${city.toLowerCase() === c.toLowerCase() ? 'active' : ''}`}
                onClick={() => {
                  setCity(c);
                  fetchWeather(c);
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="loading-card">
            <div className="spinner-orb"></div>
            <p>Syncing atmospheric telemetry for {city}...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error-banner">
            <span className="error-icon">⚠️</span>
            <div>
              <strong>Error Encountered</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {!loading && weatherData && (
          <div className="dashboard-grid">
            <section className="primary-weather-card">
              <div className="card-top-meta">
                <div>
                  <h2 className="location-name">
                    {weatherData.name}, <span className="country-code">{weatherData.sys?.country}</span>
                  </h2>
                  <span className="weather-condition-tag">
                    {weatherData.weather[0]?.main}
                  </span>
                </div>
                <span className="live-indicator">● LIVE METRICS</span>
              </div>

              <div className="hero-temp-container">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@4x.png`}
                  alt={weatherData.weather[0]?.description}
                  className="weather-hero-icon"
                />
                <div className="temp-readout">
                  <span className="temp-number">{Math.round(weatherData.main?.temp)}</span>
                  <span className="temp-symbol">°C</span>
                </div>
              </div>

              <div className="card-footer-meta">
                <p className="condition-description">
                  Feels like {Math.round(weatherData.main?.feels_like)}°C with {weatherData.weather[0]?.description}.
                </p>
                <div className="temp-extremes">
                  <span>Min: {Math.round(weatherData.main?.temp_min)}°C</span>
                  <span>Max: {Math.round(weatherData.main?.temp_max)}°C</span>
                </div>
              </div>
            </section>

            <section className="metrics-side-panel">
              <div className="metric-tile">
                <div className="metric-tile-header">
                  <span className="tile-icon">💧</span>
                  <span className="tile-title">Humidity</span>
                </div>
                <div className="metric-value-box">
                  <span className="metric-digit">{weatherData.main?.humidity}</span>
                  <span className="metric-unit">%</span>
                </div>
                <span className="metric-subtext">Pressure: {weatherData.main?.pressure} hPa</span>
              </div>

              <div className="metric-tile">
                <div className="metric-tile-header">
                  <span className="tile-icon">💨</span>
                  <span className="tile-title">Wind Speed</span>
                </div>
                <div className="metric-value-box">
                  <span className="metric-digit">{weatherData.wind?.speed}</span>
                  <span className="metric-unit">m/s</span>
                </div>
                <span className="metric-subtext">Gust Direction: {weatherData.wind?.deg ?? 0}°</span>
              </div>

              <div className="metric-tile">
                <div className="metric-tile-header">
                  <span className="tile-icon">🌅</span>
                  <span className="tile-title">Sunrise Time</span>
                </div>
                <div className="metric-value-box">
                  <span className="metric-digit">
                    {formatTime(weatherData.sys?.sunrise, weatherData.timezone)}
                  </span>
                  <span className="metric-unit">UTC</span>
                </div>
                <span className="metric-subtext">Local solar dawn</span>
              </div>

              <div className="metric-tile">
                <div className="metric-tile-header">
                  <span className="tile-icon">🌇</span>
                  <span className="tile-title">Sunset Time</span>
                </div>
                <div className="metric-value-box">
                  <span className="metric-digit">
                    {formatTime(weatherData.sys?.sunset, weatherData.timezone)}
                  </span>
                  <span className="metric-unit">UTC</span>
                </div>
                <span className="metric-subtext">Local solar dusk</span>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}