import React from 'react';
import Strain from './Strain';
export default function Favorites(props) {
  let strains = Object.entries(props.strains);
  return (
    <div>
    <h2>Favorites</h2>
    <div className="faves-container">
      { strains ?
        strains.map(strain => <Strain className="strain" key={strain[0]} name={strain[0]} strain={strain[1]} addStrain={props.addStrain} isFavorite={props.isFavorite}/>)
      : <p>Add some favorites!</p> }
    </div>
    </div>
  )
}
