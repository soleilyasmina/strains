import React from 'react';

export default function Flavors(props) {
  let validFlavors = [];
  if (props.refFlavor) {
    validFlavors = props.flavors.filter(flavor => flavor.toLowerCase().includes(props.refFlavor.toLowerCase()));
  }
  validFlavors.sort((a,b) => {
    switch(true) {
      case a > b:
        return 1;
      case a < b:
        return -1;
      default:
        return 0;
    }
  });
  return validFlavors.map(flavor => {
      return (
      <div key={`${flavor}-div`}className="add">
        <p key={flavor}>{flavor}</p>
        <button type="button" key={`${flavor}-button`} onClick={() => props.add(flavor)}>+</button>
      </div>
    )
  });
}
