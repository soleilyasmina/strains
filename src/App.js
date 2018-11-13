import React, { Component } from 'react';
import { getAllStrains, getEffects, getFlavors } from './services/strainservices';
import Nav from './components/Nav';
import TypeAhead from './components/TypeAhead';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strains: '',
      flavors: '',
      effects: '',
      myStrains: {},
      species: ['hybrid','indica','sativa'],
      view: 'search',
    }
    this.getAllStrains = this.getAllStrains.bind(this);
    this.getEffects = this.getEffects.bind(this);
    this.getFlavors = this.getFlavors.bind(this);
    this.setView = this.setView.bind(this);
    this.addStrain = this.addStrain.bind(this);
  }
  setView(e) {
    const view = e.target.name;
    this.setState({view});
  }
  addStrain(strain) {
    let newStrain = '';
    let myStrainNames = [];
    for (let myKey in this.state.myStrains) {
      myStrainNames.push(myKey);
    }
    for (let key in this.state.strains) {
      if (strain === key && !myStrainNames.includes(key)) {
        this.setState({ myStrains: { [key] : this.state.strains[key]}});
        break;
      }
    }
  }
  async getAllStrains() {
    const strains = await getAllStrains();
    this.setState({strains});
  }
  async getEffects() {
    const effects = await getEffects();
    this.setState({effects});
  }
  async getFlavors() {
    const flavors = await getFlavors();
    this.setState({flavors});
  }
  async componentDidMount() {
    this.getAllStrains();
    this.getEffects();
    this.getFlavors();
  }
  getView() {
    switch(this.state.view) {
      case 'strains':
        return <TypeAhead
          strains={this.state.strains}
          addStrain={this.addStrain}/>;
      case 'search':
        return <TypeAhead
          species={this.state.species}
          effects={this.state.effects}
          flavors={this.state.flavors}/>;
    }
  }
  render() {
    return (
      <div className="App">
        <Nav setView={this.setView}/>
        {this.getView()}
      </div>
    );
  }
}

export default App;
