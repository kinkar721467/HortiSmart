import React, { useState, useEffect } from 'react';
import { CloudSun, Droplets, Wind, CloudRain, Sun, Cloud, CloudSnow, Zap, MapPin, RefreshCw, AlertCircle } from 'lucide-react';

// Map weather condition codes to icons & labels
const getWeatherIcon = (code) => {
  if (!code && code !== 0) return <CloudSun className="w-10 h-10 text-orange-400" />;
  if (code === 0) return <Sun className="w-10 h-10 text-yellow-400" />;
  if (code <= 2) return <CloudSun className="w-10 h-10 text-orange-400" />;
  if (code <= 9) return <Cloud className="w-10 h-10 text-gray-400" />;
  if (code <= 29) return <CloudRain className="w-10 h-10 text-blue-400" />;
  if (code <= 39) return <CloudSnow className="w-10 h-10 text-blue-300" />;
  if (code <= 67) return <CloudRain className="w-10 h-10 text-blue-500" />;
  if (code <= 77) return <CloudSnow className="w-10 h-10 text-blue-200" />;
  if (code <= 82) return <CloudRain className="w-10 h-10 text-blue-600" />;
  if (code <= 95) return <Zap className="w-10 h-10 text-yellow-500" />;
  return <CloudSun className="w-10 h-10 text-orange-400" />;
};

const getWeatherLabel = (code) => {
  if (!code && code !== 0) return 'Loading...';
  if (code === 0) return 'Clear Sky';
  if (code <= 2) return 'Partly Cloudy';
  if (code <= 9) return 'Overcast';
  if (code <= 29) return 'Foggy';
  if (code <= 39) return 'Drizzle';
  if (code <= 55) return 'Drizzle';
  if (code <= 57) return 'Freezing Drizzle';
  if (code <= 65) return 'Rain';
  if (code <= 67) return 'Freezing Rain';
  if (code <= 77) return 'Snowfall';
  if (code <= 82) return 'Rain Showers';
  if (code <= 95) return 'Thunderstorm';
  return 'Partly Cloudy';
};

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cityName, setCityName] = useState('');

  const fetchWeather = async (lat, lon) => {
    try {
      // Open-Meteo: 100% free, no API key needed
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation_probability,weather_code&wind_speed_unit=kmh`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather data unavailable');
      const data = await res.json();
      setWeather(data.current);
      setError('');
    } catch (err) {
      setError('Could not fetch weather');
    } finally {
      setLoading(false);
    }
  };

  const reverseGeocode = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await res.json();
      const city =
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        data.address?.county ||
        'Your Location';
      const state = data.address?.state || '';
      setCityName(state ? `${city}, ${state}` : city);
    } catch {
      setCityName('Your Location');
    }
  };

  const getLocation = () => {
    setLoading(true);
    setError('');
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lon: longitude });
        fetchWeather(latitude, longitude);
        reverseGeocode(latitude, longitude);
      },
      () => {
        // Fallback to India center (Delhi) if denied
        const lat = 28.6139;
        const lon = 77.2090;
        setCityName('New Delhi (Default)');
        setLocation({ lat, lon });
        fetchWeather(lat, lon);
      },
      { timeout: 8000 }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const wIcon = weather ? getWeatherIcon(weather.weather_code) : <CloudSun className="w-10 h-10 text-orange-400" />;
  const wLabel = weather ? getWeatherLabel(weather.weather_code) : '—';

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Weather Today</h3>
        <button
          onClick={getLocation}
          title="Refresh"
          className="text-gray-400 hover:text-green-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 text-xs text-green-600 font-medium mb-4">
        <MapPin className="w-3 h-3" />
        <span className="truncate">{cityName || 'Detecting location...'}</span>
      </div>

      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs text-gray-400">Getting weather...</p>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-red-500">
            <AlertCircle className="w-6 h-6 mx-auto mb-1" />
            <p className="text-xs">{error}</p>
            <button onClick={getLocation} className="text-xs text-green-600 hover:underline mt-1">Retry</button>
          </div>
        </div>
      )}

      {!loading && !error && weather && (
        <>
          {/* Main Temp */}
          <div className="flex items-center mb-6">
            <div className="mr-4 shrink-0">{wIcon}</div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{Math.round(weather.temperature_2m)}°C</h2>
              <p className="text-gray-500">{wLabel}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4 flex-1 justify-end flex flex-col">
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <div className="flex items-center text-gray-600">
                <Droplets className="w-4 h-4 mr-2 text-blue-400 shrink-0" />
                <span className="text-sm">Humidity</span>
              </div>
              <span className="text-sm font-medium">{weather.relative_humidity_2m}%</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <div className="flex items-center text-gray-600">
                <Wind className="w-4 h-4 mr-2 text-teal-400 shrink-0" />
                <span className="text-sm">Wind Speed</span>
              </div>
              <span className="text-sm font-medium">{Math.round(weather.wind_speed_10m)} km/h</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <div className="flex items-center text-gray-600">
                <CloudRain className="w-4 h-4 mr-2 text-indigo-400 shrink-0" />
                <span className="text-sm">Rain Chance</span>
              </div>
              <span className="text-sm font-medium">{weather.precipitation_probability ?? 0}%</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherCard;
