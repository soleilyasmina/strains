import React, { Component } from 'react';
import { effectType, flavorType } from '../services/typeservices';
import Strains from './Strains';
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
    this.effectType = this.effectType.bind(this);
    this.flavorType = this.flavorType.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addEffect = this.addEffect.bind(this);
    this.addStrain = this.addStrain.bind(this);
  }
  addStrain(strain) {
    this.props.addStrain(strain);
  }
  addEffect(effect) {
    switch (effect.type) {
      case 'positive':
        this.setState({ positive: [...this.state.positive,[effect.effect]]});
        break;
    }
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  effectType() {
    return effectType(this.props.effects, this.state.effect);
  }
  flavorType() {
    return flavorType(this.props.flavors, this.state.flavor);
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
            {this.effectType()}
          </div> : null}
          {this.props.flavors ? <div className="form-section">
            <input type="text" name="flavor" placeholder="flavors" value={this.state.flavor} onChange={this.handleChange}/>
            <button>+</button>
            {this.flavorType()}
          </div> : null}
        </fieldset>
      </form>
    )
  }
}
