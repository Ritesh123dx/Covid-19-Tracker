import React from 'react';
import './Table.css';
import numeral from 'numeral';

 
function Table({countries}) {
    return (
        <div className="shadow rounded p-3 mt-5" style={{height : '90vh', overflow : 'scroll'}}>
            <h5 className="mb-4 text-center">Live cases by country</h5>
            {countries?.map(({country, cases}, index) => (
                <tr>
                    <td className={index%2 == 0 ? "table-bg-even p-2 rounded" : "bg-light p-2 rounded"}>{country}</td>
                    <td className={index%2 == 0 ? "table-bg-even p-2 rounded" : "bg-light p-2 rounded"}><b>{numeral(cases).format("0,0")}</b></td>
                </tr>
            ))}
        </div>
    )
}

export default Table
