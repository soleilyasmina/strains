function search(strains,species,effects,flavors) {
  console.log(strains.length);
  let returnStrains = [];
  for (let key in strains) {
    let name = key;
    let count = 0;
    if (species.includes(strains[key].race)) {
      count += 1;
    }
    for (let effect in effects) {
      switch (effects[effect].type) {
        case 'positive':
          if (strains[key].effects.positive.includes(effects[effect].effect)) {
            count += 1;
          }
          break;
        case 'negative':
          if (strains[key].effects.negative.includes(effects[effect].effect)) {
            count += 1;
          }
          break;
        case 'medical':
          if (strains[key].effects.medical.includes(effects[effect].effect)) {
            count += 1;
          }
          break;
      }
    }
    for (let flavor in flavors) {
      if (strains[key].flavors.includes(flavors[flavor])) {
        count += 1;
      }
    }
  returnStrains.push({name, count, info: strains[key]});
  }
  returnStrains.sort((a,b) => {
    switch(true) {
      case a.count < b.count:
        return 1;
      case b.count < a.count:
        return -1;
      default:
        return 0;
    }
  });
  let finalStrains = [];
  for (let i = 0; i < 8; i++) {
    finalStrains.push(returnStrains[i]);
  }
  return finalStrains;
}

export {
  search
}
