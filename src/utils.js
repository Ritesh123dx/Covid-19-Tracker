import React from 'react';
import numeral from 'numeral';
import { Circle, Popup} from 'react-leaflet';

export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1);
    
    return sortedData;
}



//Show circle on map
const casesTypeColors = {
    cases: {
      hex: "#CC1034",
    //   rgb: "rgb(204, 16, 52)",
    //   half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 300,
    },
    recovered: {
      hex: "#7dd71d",
    //   rgb: "rgb(125, 215, 29)",
    //   half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 300,
    },
    deaths: {
      hex: "#fb4443",
    //   rgb: "rgb(251, 68, 67)",
    //   half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 500,
    },
  };


export const showDataOnMap = (data, casesType='cases') => (
    data.map(country=> (
        
        <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        fillOpacity={0.4}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
    
        >
    <Popup>
        <div className="info-container">
       
         <div>
             <img src={country.countryInfo.flag} style={{width : '100%', height : '80px'}}/>
         </div>
         <div className="mt-2">{country.country}</div>
         <div className="mt-2"><b>Cases</b> : <b className="text-warning">{numeral(country.cases).format("0,0")}</b></div>
         <div className="mt-2"><b>Recovered</b> : <b className="text-success">{numeral(country.recovered).format("0,0")}</b></div>
         <div className="mt-2"><b>Deaths</b> : <b className="text-danger">{numeral(country.deaths).format("0,0")}</b></div>
        </div>
      </Popup>

        </Circle>
    ))
);