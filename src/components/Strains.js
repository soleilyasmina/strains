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
  return validStrains.map(strain => {
    return (
      <div key={`${strain}-div`}className="add">
        <p key={strain}>{strain}</p>
        <button type="button" key={`${strain}-button`} onClick={() => props.add(strain)}>+</button>
      </div>
    )
  });
}
