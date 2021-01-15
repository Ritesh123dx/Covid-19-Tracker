import React from 'react'
import numeral from 'numeral';


const boxStyle = {
    "Coronavirus Cases" : {
        "border-top" : '15px solid rgb(255 149 0)',
    },
    "Recovered" : {
        "border-top" : '15px solid rgb(6 189 91)'
    },
    "Deaths" : {
        "border-top" : '15px solid rgb(251 25 25)'
    },
    "text-Coronavirus Cases" : {
        "color" : "rgb(255 149 0)"
    },
    "text-Recovered" : {
        "color" : "rgb(6 189 91)"
    },
    "text-Deaths" : {
        "color" : "rgb(251 25 25)"
    }
    
}

function InfoBox({ title, cases, total }) {
    return (
        
        <div className="card shadow rounded mt-3" style={boxStyle[title]}>
            <div className="card-body">
                <h5 className="text-secondary">{title}</h5>
                <h4 style={boxStyle[`text-${title}`]} >+{numeral(cases).format("0,0")}</h4>
                <h5 className="">Total : {numeral(total).format("0,0")}</h5>

            </div>
        </div>
        
    )
}

export default InfoBox
