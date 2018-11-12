import React, { Component } from 'react';
import { strainType, effectType, flavorType } from '../services/typeservices';
import '../App.css';

export default class TypeAhead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strain: '',
      effect: '',
      flavor: ''
    }
    this.strainType = this.strainType.bind(this);
    this.effectType = this.effectType.bind(this);
    this.flavorType = this.flavorType.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  strainType() {
    return strainType(this.props.strains, this.state.strain);
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
          <legend>Select Strains, Effects, and Flavors</legend>
          <div className="form-section">
            <input type="text" name="strain" placeholder="strains" value={this.state.strain} onChange={this.handleChange}/>
            <button>+</button>
            {this.strainType()}
          </div>
          <div className="form-section">
            <input type="text" name="effect" placeholder="effects" value={this.state.effect} onChange={this.handleChange}/>
            <button>+</button>
            {this.effectType()}
          </div>
          <div className="form-section">
            <input type="text" name="flavor" placeholder="flavors" value={this.state.flavor} onChange={this.handleChange}/>
            <button>+</button>
            {this.flavorType()}
          </div>
        </fieldset>
      </form>
    )
  }
}
