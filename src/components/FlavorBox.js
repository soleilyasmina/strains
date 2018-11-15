import React from 'react';
import '../App.css';

export default function FlavorBox(props) {
  return (
    <div className="fieldset-container">
    <fieldset>
      <legend>Flavors</legend>
    <div className="fieldset">
    {props.flavors ? props.flavors.map(flavor => {
      return (
        <div key={flavor} className="check-holder">
        <label htmlFor={flavor}>{flavor}</label>
        <input type="checkbox" onClick={() => props.addFlavor(flavor)}/>
        </div>
      )
    }
  ): <p>Loading...</p>}
    </div>
    </fieldset>
    </div>
  )
}
