import React from 'react';
import '../App.css';

function compare(a,b) {
  console.log(a, b);
  switch(true) {
    case a > b:
      return 1;
    case a < b:
      return -1;
    default:
      return 0;
  }
}
function addEffect(effect) {
  return effect;
}
function addStrain(strain) {
  return strain;
}
function effectType(effects, refEffect) {
  let validEffects = [];
  if (refEffect) {
    for (let key in effects) {
      let effect = effects[key].effect;
      if (effect.toLowerCase().includes(refEffect.toLowerCase())) {
        validEffects.push(effects[key]);
      }
    }
  }
  validEffects.sort((a,b) => compare(a.effect,b.effect));
  return validEffects.map(effect => {
    return (
      <div key={`${effect.effect}-div`}className="add">
        <p key={effect.effect}>{`${effect.effect}: ${effect.type}`}</p>
        <button type="button" key={`${effect.effect}-button`} onClick={() => addEffect(effect)}>+</button>
      </div>
    )
  });
}
function flavorType(flavors, refFlavor) {
  let validFlavors = [];
  if (refFlavor) {
    validFlavors = flavors.filter(flavor => flavor.toLowerCase().includes(refFlavor.toLowerCase()));
  }
  validFlavors.sort((a,b) => compare(a,b));
  return validFlavors.map(flavor => <p key={flavor}>{flavor}</p>);
}

export {
  effectType,
  flavorType
}
