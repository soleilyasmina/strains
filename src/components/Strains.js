import React from 'react';

export default function Strains(props) {
  const validStrains = [];
  if (props.refStrain) {
    for (let key in props.strains) {
      if (key.toLowerCase().includes(props.refStrain.toLowerCase())) {
        validStrains.push(key);
      }
    }
  }
  return (
    <div className="Strains">
      { validStrains.map(strain => {
      return (
        <div key={`${strain}-div`}className="add">
          <p key={strain}>{strain}</p>
          {props.isFavorite(strain) ?
            <button type="button" key={`${strain}-add`} onClick={() => props.add(strain)}>+</button> :
            <button type="button" key={`${strain}-add`} onClick={() => props.add(strain)}>-</button> }
          <button type="button" key={`${strain}-show`} onClick={() => props.set(props.strains[strain],strain)}>?</button>
        </div>
      )
    }) }
  </div>
);
}
