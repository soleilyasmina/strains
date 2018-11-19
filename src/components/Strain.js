import React from 'react';

export default function Strain(props) {
  let name = '';
  if (props.name === undefined) {
    name = props.strain.name;
  }
  else {
    name = props.name;
  }
  return (
    <div key={name} className={`${props.strain.race} strain`}>
      <h3>{name} {props.score ? <span>({props.score})</span> : null}</h3>
      <p><em>Species: {props.strain.race}</em></p>
      {!!props.strain.effects.medical.length ?
      <p>Treats:</p> : null}
      <ul>
        {props.strain.effects.medical.map(effect => <li key={effect}>{effect}</li>)}
      </ul>
      {!!props.strain.effects.positive.length ?
      <p>Positive Effects:</p> : null}
      <ul>
        {props.strain.effects.positive.map(effect => <li key={effect}>{effect}</li>)}
      </ul>
      {!!props.strain.effects.negative.length ?
      <p>Negative Effects:</p> : null}
      <ul>
        {props.strain.effects.negative.map(effect => <li key={effect}>{effect}</li>)}
      </ul>
      {props.isFavorite(name) !== undefined ?
      <button type="button" onClick={() => props.addStrain(name)}>Favorite</button> :
      <button type="button" onClick={() => props.addStrain(name)}>Unfavorite</button>}
    </div>
  )
}
