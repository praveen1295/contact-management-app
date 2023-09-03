import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const [worldData, setWorldData] = useState({});
  const [countriesData, setCountriesData] = useState([]);
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const worldResponse = await axios.get(
        "https://disease.sh/v3/covid-19/all"
      );
      setWorldData(worldResponse.data);

      const countriesResponse = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      setCountriesData(countriesResponse.data);

      const graphResponse = await axios.get(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      console.log(graphResponse);
      setGraphData(graphResponse.data);
    }

    fetchData();
  }, []);

  const countryMarkers = countriesData.map((country) => (
    <Marker
      key={country.country}
      position={[country.countryInfo.lat, country.countryInfo.long]}
    >
      <Popup>
        <div>
          <p>{country.country}</p>
          <p>Active Cases: {country.active}</p>
          <p>Recovered Cases: {country.recovered}</p>
          <p>Deaths: {country.deaths}</p>
        </div>
      </Popup>
    </Marker>
  ));

  const graphOptions = {
    chart: {
      id: "cases-chart",
    },
    xaxis: {
      categories: Object.keys(graphData.cases || {}),
    },
  };

  const graphSeries = [
    {
      name: "Cases",
      data: Object.values(graphData.cases || {}),
    },
    {
      name: "deaths",
      data: Object.values(graphData.deaths || {}),
    },
    {
      name: "recovered",
      data: Object.values(graphData.recovered || {}),
    },
  ];

  return (
    <div className="App">
      <h1>COVID-19 Dashboard</h1>
      <div>
        <h2>Worldwide Data</h2>
        <p>Total Cases: {worldData.cases}</p>
        <p>Total Recovered: {worldData.recovered}</p>
        <p>Total Deaths: {worldData.deaths}</p>
      </div>
      <div>
        <h2>Map</h2>
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {countryMarkers}
        </MapContainer>
      </div>
      <div>
        <h2>Case Fluctuations</h2>
        <ReactApexChart
          options={graphOptions}
          series={graphSeries}
          type="line"
          height={300}
        />
      </div>
    </div>
  );
}

export default App;
