import React, { Component } from 'react';
import Strains from './Strains';
import Effects from './Effects';
import Flavors from './Flavors';
import '../App.css';

export default class TypeAhead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strain: '',
      effect: '',
      flavor: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.addEffect = this.addEffect.bind(this);
    this.addStrain = this.addStrain.bind(this);
    this.addFlavor = this.addFlavor.bind(this);
  }
  addStrain(strain) {
    this.props.addStrain(strain);
  }
  addEffect(effect) {
    this.props.addEffect(effect);
  }
  addFlavor(flavor) {
    this.props.addFlavor(flavor);
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
          {this.props.strains ? <h2>Select Strains</h2> :
            <h2>Select Species, Effects, and Flavors</h2>}
          {this.props.strains ? <div className="form-section">
            <input type="text" name="strain" placeholder="strains" value={this.state.strain} onChange={this.handleChange}/>
            <Strains
              strains={this.props.strains}
              refStrain={this.state.strain}
              add={this.addStrain}/>
          </div> : null}
          {this.props.species ? <div className="form-section">
            <label htmlFor="sativa">Sativa</label>
            <input type="checkbox" name="sativa" value="Sativa" onChange={() => this.props.addSpecies('sativa')}/>
            <label htmlFor="indica">Indica</label>
            <input type="checkbox" name="indica" value="Indica" onChange={() => this.props.addSpecies('indica')}/>
            <label htmlFor="hybrid">Hybrid</label>
            <input type="checkbox" name="hybrid" value="Hybrid" onChange={() => this.props.addSpecies('hybrid')}/>
          </div> : null}
          {this.props.effects ? <div className="form-section">
            <input type="text" name="effect" placeholder="effects" value={this.state.effect} onChange={this.handleChange}/>
            <Effects
              effects={this.props.effects}
              refEffect={this.state.effect}
              add={this.addEffect}/>
          </div> : null}
          {this.props.flavors ? <div className="form-section">
            <input type="text" name="flavor" placeholder="flavors" value={this.state.flavor} onChange={this.handleChange}/>
            <Flavors
              flavors={this.props.flavors}
              refFlavor={this.state.flavor}
              add={this.addFlavor}/>
          </div> : null}
          {this.state.species ? null : <input type="submit" value="Submit!"/>}
      </form>
    )
  }
}
