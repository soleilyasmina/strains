# Strains

## Deployment

Deployed on [http://lexicanna.surge.sh](http://lexicanna.surge.sh).

## Abstract

This application is built on [Evan Busse's Strain API](http://strains.evanbusse.com/index.html). The goal is to give medical cannabis consumers helpful information regarding strains, species, flavors, and effects of different strains of cannabis.

By selecting a variety of species (sativa, indica, hybrid), effects, and flavors, users can find the most applicable strains for their needs. In addition, users can search over 2,000 strains and find information on each one. Furthermore, users can choose favorites both from the strains menu as well as the search menu.

## User Stories
1. A user can enter a desired strain and see information regarding its species, effects, and flavors.
2. A user can enter species, effects, and flavors, and receive optimal strains to treat their condition.
3. A user can enter and return to favorite strains.

## Snippets
The purpose of this snippet is to return strains that contain a substring (i.e. searching 'blue d' and returning all valid strains.)

![_fig. 1: sample call_](./assets/strains.png)

The props passed for this are:
1. ```props.strains``` All possible strains stored in state.
2. ```props.refStrain``` The current string in the input box.
3. ```props.add``` Function to add the chosen strain to state variable ```myStrains```.


```javascript
import React from 'react';

export default function Strains(props) {
  const validStrains = [];
  if (props.refStrain) {
    for (let key in props.strains) {
      if (key.toLowerCase().includes(props.refStrain.toLowerCase())) {
        validStrains.push(key);
      }
    }
  }
  return (
    <div className="Strains">
      { validStrains.map(strain => {
      return (
        <div key={`${strain}-div`}className="add">
          <p key={strain}>{strain}</p>
          {props.isFavorite(strain) ?
            <button type="button" key={`${strain}-add`} onClick={() => props.add(strain)}>+</button> :
            <button type="button" key={`${strain}-add`} onClick={() => props.add(strain)}>-</button> }
          <button type="button" key={`${strain}-show`} onClick={() => props.set(props.strains[strain],strain)}>?</button>
        </div>
      )
    }) }
  </div>
);
}

```
