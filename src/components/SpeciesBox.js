import React from 'react';

export default function SpeciesBox(props) {
  return (
    <div className="fieldset-container">
    <fieldset>
      <legend>Species</legend>
      <div className="form-section">
        <label htmlFor="sativa">Sativa</label>
        <input type="checkbox" name="sativa" value="Sativa" checked={props.mySpecies.includes('sativa')} onChange={() => props.addSpecies('sativa')}/>
        <label htmlFor="indica">Indica</label>
        <input type="checkbox" name="indica" value="Indica" checked={props.mySpecies.includes('indica')} onChange={() => props.addSpecies('indica')}/>
        <label htmlFor="hybrid">Hybrid</label>
        <input type="checkbox" name="hybrid" value="Hybrid" checked={props.mySpecies.includes('hybrid')} onChange={() => props.addSpecies('hybrid')}/>
      </div>
    </fieldset>
    </div>
  )
}
