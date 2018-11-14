import React from 'react';
import '../App.css';

export default function EffectBox(props) {
  return (
    <fieldset>
    <legend>Effects</legend>
    <div className="fieldset">
    {props.effects.map(effect => {
      return (
        <div key={effect.effect} className="check-holder">
        <label htmlFor={effect.effect}>{effect.effect}</label>
        <input type="checkbox" onClick={() => props.addEffect(effect)}/>
        </div>
      )
    }
    )}
    </div>
    </fieldset>
  )
}
