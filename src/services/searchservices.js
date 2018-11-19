function sort(a,b) {
  switch(true) {
    case a.count < b.count:
      return 1;
    case b.count < a.count:
      return -1;
    default:
      return 0;
  }
}

function random(limit) {
  return Math.floor(Math.random() * limit);
}

function search(strains,species,effects,flavors) {
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
        default:
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
  returnStrains.sort((a,b) => sort(a,b));
  let finalStrains = [];
  let highScore = returnStrains[0].count;
  for (let i = 0; i <= highScore + 1; i++) {
    finalStrains.push([]);
  }
  for (let i = 0; i < returnStrains.length; i++) {
    finalStrains[returnStrains[i].count].push(returnStrains[i]);
  }
  let suggestions = [];
  while (suggestions.length < 8) {
    switch(true) {
      case finalStrains[highScore].length > 0:
        let randIndex = random(finalStrains[highScore].length);
        let result = finalStrains[highScore].splice([randIndex],1);
        suggestions.push(result.pop());
        break;
      default:
        highScore -= 1;
        break;
    }
  }
  return suggestions;
}


export {
  search
}
