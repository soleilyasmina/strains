import React from 'react';
import '../App.css';

export default function FlavorBox(props) {
  return (
    <div className="fieldset-container">
    <fieldset>
      <legend>Flavors</legend>
    <div className="fieldset">
    {props.flavors ? props.flavors.sort((a,b) => {
      switch(true) {
        case a > b:
          return 1;
        case b > a:
          return -1;
        default:
          return 0;
      }
    })
      .map(flavor => {
        return (
          <div key={flavor} className="check-holder">
          <label htmlFor={flavor}>{flavor}</label>
          <input type="checkbox" checked={props.myFlavors.includes(flavor)} onChange={() => props.addFlavor(flavor)}/>
          </div>
        )
      }
  ): <p>Loading...</p>}
    </div>
    </fieldset>
    </div>
  )
}
