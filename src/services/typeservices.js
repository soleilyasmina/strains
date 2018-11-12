import React from 'react';

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
function strainType(strains, refStrain) {
  const validStrains = [];
  if (refStrain) {
    for (let key in strains) {
      if (key.toLowerCase().includes(refStrain.toLowerCase())) {
        validStrains.push(key);
      }
    }
  }
  return validStrains.map(strain => <p key={strain}>{strain}</p>);
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
  return validEffects.map(effect => <p key={effect.effect}>{`${effect.effect}: ${effect.type}`}</p>);
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
  strainType,
  effectType,
  flavorType
}
