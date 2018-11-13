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
      flavor: '',
      races: '',
      positive: [],
      negative: [],
      medical: [],
      flavors: '',
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
      <form>
        <fieldset>
          {this.props.strains ? <legend>Select Strains</legend> :
            <legend>Select Species, Effects, and Flavors</legend>}
          {this.props.strains ? <div className="form-section">
            <input type="text" name="strain" placeholder="strains" value={this.state.strain} onChange={this.handleChange}/>
            <button>+</button>
            <Strains
              strains={this.props.strains}
              refStrain={this.state.strain}
              add={this.addStrain}/>
          </div> : null}
          {this.props.effects ? <div className="form-section">
            <input type="text" name="effect" placeholder="effects" value={this.state.effect} onChange={this.handleChange}/>
            <button>+</button>
            <Effects
              effects={this.props.effects}
              refEffect={this.state.effect}
              add={this.addEffect}/>
          </div> : null}
          {this.props.flavors ? <div className="form-section">
            <input type="text" name="flavor" placeholder="flavors" value={this.state.flavor} onChange={this.handleChange}/>
            <button>+</button>
            <Flavors
              flavors={this.props.flavors}
              refFlavor={this.state.flavor}
              add={this.addFlavor}/>
          </div> : null}
        </fieldset>
      </form>
    )
  }
}
