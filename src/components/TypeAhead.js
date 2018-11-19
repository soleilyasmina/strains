import React, { Component } from 'react';
import Strains from './Strains';
import Strain from './Strain'
import '../App.css';

export default class TypeAhead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strain: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.addStrain = this.addStrain.bind(this);
    this.setStrain = this.setStrain.bind(this);
    this.isFavorite = this.isFavorite.bind(this);
  }
  addStrain(strain) {
    this.props.addStrain(strain);
  }
  isFavorite(strain) {
    this.props.isFavorite(strain);
  }
  setStrain(strain, name) {
    this.props.setStrain(strain,name);
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  render() {
    return (
      <form>
          <h2>Select Strains</h2>
          {this.props.strains ?
            <input type="text" name="strain" placeholder="Search Strains by Name" value={this.state.strain} onChange={this.handleChange}/>
            : <p>Loading...</p> }
          <div className="search-holder">
          {this.props.strains ? <div className="form-section">
            <Strains
              strains={this.props.strains}
              refStrain={this.state.strain}
              add={this.addStrain}
              set={this.setStrain}
              isFavorite={this.props.isFavorite}
              className="Strains"/>
          </div> : <p>Loading...</p>}
          {this.props.currentStrain ?
            <div className="strain-holder">
              <Strain
                strain={this.props.currentStrain}
                name={this.props.currentName}
                addStrain={this.props.addStrain}
                isFavorite={this.props.isFavorite}/>
            </div> : null}
        </div>
      </form>
    )
  }
}
