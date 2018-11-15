import React from 'react';
import '../App.css';

export default function EffectBox(props) {
  return (
    <div className="fieldset-container">
    <fieldset>
    <legend>Effects</legend>
    <div className="fieldset">
    {props.effects ? props.effects.map(effect => {
      return (
        <div key={effect.effect} className="check-holder">
        <label htmlFor={effect.effect}>{effect.effect}</label>
        <input type="checkbox" onClick={() => props.addEffect(effect)}/>
        </div>
      )
    }
  ) : <p>Loading...</p>}
    </div>
    </fieldset>
    </div>
  )
}
