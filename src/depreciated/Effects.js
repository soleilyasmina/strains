import React from 'react';

export default function Effects(props) {
  let validEffects = [];
  if (props.refEffect) {
    for (let key in props.effects) {
      let effect = props.effects[key].effect;
      if (effect.toLowerCase().includes(props.refEffect.toLowerCase())) {
        validEffects.push(props.effects[key]);
      }
    }
  }
  validEffects.sort((a,b) => {
    switch(true) {
      case a.effect > b.effect:
        return 1;
      case a.effect < b.effect:
        return -1;
      default:
        return 0;
    }
  });
  return validEffects.map(effect => {
    return (
      <div key={`${effect.effect}-div`}className="add">
        <p key={effect.effect}>{`${effect.effect}: ${effect.type}`}</p>
        <button type="button" key={`${effect.effect}-button`} onClick={() => props.add(effect)}>+</button>
      </div>
    )
  });
}
