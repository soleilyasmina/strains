import React from 'react';
import EffectBox from './EffectBox';
import FlavorBox from './FlavorBox';
import SpeciesBox from './SpeciesBox';
import Strain from './Strain';
import '../App.css';

export default function Search(props) {
  return (
  <form onSubmit={props.handleSubmit}>
  <h2>Search Strains</h2>
  <div className="type-container">
    <div className="flex-boxes">
    <FlavorBox
      className="FlavorBox"
      addFlavor={props.addFlavor}
      flavors={props.flavors}
      myFlavors={props.myFlavors}/>
    </div>
    <div className="flex-boxes">
    <EffectBox
      className="EffectBox"
      addEffect={props.addEffect}
      effects={props.effects}
      myEffects={props.myEffects}/>
    <SpeciesBox
      className="SpeciesBox"
      addSpecies={props.addSpecies}
      mySpecies={props.mySpecies}/>
    <input type="submit" value="Submit!"/>
    <input type="button" value="Clear" onClick={props.clearSearch}/>
    </div>
    </div>
    {props.suggestions ? <h2>Suggestions (Score)</h2> : null}
    <div className="suggestion-container">
    {props.suggestions ?
     props.suggestions.map(suggestion => <Strain key={suggestion.name} score={suggestion.count} strain={suggestion.info} name={suggestion.name} addStrain={props.addStrain} isFavorite={props.isFavorite}/>)
    : null}
    </div>
  </form>
);
}
