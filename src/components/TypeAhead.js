import React, { Component } from 'react';
import Strains from './Strains';
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
    this.addStrain = this.addStrain.bind(this);
  }
  addStrain(strain) {
    this.props.addStrain(strain);
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  render() {
    return (
      <form>
          <h2>Select Strains</h2>
          {this.props.strains ? <div className="form-section">
            <input type="text" name="strain" placeholder="strains" value={this.state.strain} onChange={this.handleChange}/>
            <Strains
              strains={this.props.strains}
              refStrain={this.state.strain}
              add={this.addStrain}/>
          </div> : <p>Loading...</p>}
      </form>
    )
  }
}
