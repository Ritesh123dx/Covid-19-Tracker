import React, { useState, useEffect } from 'react';
import './App.css';
// import '../node_modules/jquery/dist/jquery.slim';
// import '../node_modules/popper.js/dist/popper';
// import '../node_modules/bootstrap/js/dist/dropdown.js';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './utils';
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';


function App() {
  const [selectedCountry, setSelectedCountry] = useState('World Wide');
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796 ]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  // https://disease.sh/v3/covid-19/countries

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/countries')
      .then(res => {
        setCountries(res.data.map(item => ({
          name: item.country,
          value: item.countryInfo.iso3
        })
        ))
        const sortedCountriesByCases = sortData(res.data);
        setTableData(sortedCountriesByCases);
        setMapCountries(res.data);
      })
      .catch(error => alert(error.message))


    axios.get('https://disease.sh/v3/covid-19/all') //get the data for all the country on page load
    .then(res => {
      
      setCountryInfo(res.data);
      console.log("DATA --> ", res);
    })
    .catch(error => alert(error.message))
  }, [])

  const onCountryChange = (event, country) => {
    console.log(country);
    
    let url = "";
    if (country === 'worldwide'){
      setSelectedCountry("World Wide");
      url = 'https://disease.sh/v3/covid-19/all';
    }
    else{
      setSelectedCountry(country.name);
      url = `https://disease.sh/v3/covid-19/countries/${country.name}`;
    }

    console.log(url);

    axios.get(url)
    .then(res => {
      setCountryInfo(res.data);
      setMapZoom(4);

      if(res.data.countryInfo)  setMapCenter([res.data.countryInfo.lat, res.data.countryInfo.long]);

      else  {
        setMapZoom(3);
        setMapCenter([34.80746, -40.4796 ]);
      }
      console.log("DATA --> ", res);
    })
    .catch(error => alert(error.message))

    
    

    
  }

  return (
    <>
      <nav class="navbar fixed-top navbar-light navbar-expand-lg navbar-light shadow">
        <h4 class="navbar-brand nav-text text-light text-center m-auto" >Covid-19 Tracker</h4>
      </nav>
    <div className="App container-fluid">
      
      <div className="row mt-4">

        <div className="col-12 col-md-8">
        
          <div className="row">
            <div className="col-12 col-sm-8">
              <h5 className="d-none d-sm-block">Click on the map circles to see data for respective country</h5>
            </div>
            <div className="col-12 col-sm-4 text-center">
              <div className="dropdown">
                <button className="btn btn-info dropdown-toggle shadow" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {selectedCountry} </button>
                <div className="dropdown-menu" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                <span onClick={e => onCountryChange(e, "worldwide")} type='button' className="dropdown-item" >World Wide </span>
                  {
                    countries.map(country => (
                      <span onClick={e => onCountryChange(e, country)} type='button' className="dropdown-item" >{country.name} </span>
                    ))
                  }

                </div>
              </div>
            </div>
          </div>
          
          {/* Info Boxes */}
          <div className="row mt-3">
            <div className="col-12 col-md-4">
              <InfoBox title="Coronavirus Cases" cases={countryInfo?.todayCases} total={countryInfo?.cases}/>
            </div>
            <div className="col-12 col-md-4">
              <InfoBox title="Recovered" cases={countryInfo?.todayRecovered} total={countryInfo?.recovered}/>
            </div>
            <div className="col-12 col-md-4">
              <InfoBox title="Deaths" cases={countryInfo?.todayDeaths} total={countryInfo?.deaths}/>
            </div>
          </div>

          {/* MAP */}
          <div className="row mt-4">
            <div className="col-12">
              
              <Map
              countries={mapCountries}
              center={mapCenter} zoom={mapZoom}/>
            </div>
          </div>


        </div>

        <div className="col-12 col-md-4">
          <LineGraph /> 
          <Table countries={tableData}/>
          
        </div>
      </div>


        
    </div>
    <footer className="bg-light shadow mt-3 text-center">Developed By Ritesh Gupta</footer>   
    </>
  );
}

export default App;
