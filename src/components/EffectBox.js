import React from 'react';
import '../App.css';

export default function EffectBox(props) {
  const check = (myEffects, effect) => {
    for (let key in myEffects) {
      if (myEffects[key].effect === effect.effect) return true;
    }
    return false;
  }
  return (
    <div className="fieldset-container">
    <fieldset>
    <legend>Positive Effects</legend>
    <div className="fieldset">
    {props.effects ? props.effects.filter(effect => effect.type === 'positive')
    .sort((a,b) => {
      switch(true) {
        case a.effect > b.effect:
          return 1;
        case b.effect > a.effect:
          return -1;
        default:
          return 0;
      }
    })
    .map(effect => {
      return (
        <div key={effect.effect} className="check-holder">
        <label htmlFor={effect.effect}>{effect.effect}</label>
        <input type="checkbox" checked={check(props.myEffects,effect)} onChange={() => props.addEffect(effect)}/>
        </div>
      )
    }
  ) : <p>Loading...</p>}
    </div>
    </fieldset>
    <fieldset>
    <legend>Negative Effects</legend>
    <div className="fieldset">
    {props.effects ? props.effects.filter(effect => effect.type === 'negative')
      .sort((a,b) => {
        switch(true) {
          case a.effect > b.effect:
            return 1;
          case b.effect > a.effect:
            return -1;
          default:
            return 0;
        }
      })
      .map(effect => {
        return (
          <div key={effect.effect} className="check-holder">
          <label htmlFor={effect.effect}>{effect.effect}</label>
          <input type="checkbox" checked={check(props.myEffects,effect)} onChange={() => props.addEffect(effect)}/>
          </div>
        )
      }
  ) : <p>Loading...</p>}
    </div>
    </fieldset>
    <fieldset>
    <legend>Medical Treatments for</legend>
    <div className="fieldset">
    {props.effects ? props.effects.filter(effect => effect.type === 'medical')
    .sort((a,b) => {
      switch(true) {
        case a.effect > b.effect:
          return 1;
        case b.effect > a.effect:
          return -1;
        default:
          return 0;
      }
    })
    .map(effect => {
      return (
        <div key={effect.effect} className="check-holder">
        <label htmlFor={effect.effect}>{effect.effect}</label>
        <input type="checkbox" checked={check(props.myEffects,effect)} onChange={() => props.addEffect(effect)}/>
        </div>
      )
    }
  ) : <p>Loading...</p>}
    </div>
    </fieldset>
    </div>
  )
}
