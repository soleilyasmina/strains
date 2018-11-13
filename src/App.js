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
      myFlavors: [],
      myEffects: {
        positive: [],
        negative: [],
        medical: []
      },
      species: ['hybrid','indica','sativa'],
      view: 'search',
    }
    this.getAllStrains = this.getAllStrains.bind(this);
    this.getEffects = this.getEffects.bind(this);
    this.getFlavors = this.getFlavors.bind(this);
    this.setView = this.setView.bind(this);
    this.addStrain = this.addStrain.bind(this);
    this.addEffect = this.addEffect.bind(this);
    this.addFlavor = this.addFlavor.bind(this);
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
  addEffect(effect) {
    switch (effect.type) {
      case 'positive':
        this.setState({
          myEffects: {
            positive: [...this.state.myEffects.positive, effect.effect],
            negative: [...this.state.myEffects.negative],
            medical: [...this.state.myEffects.medical]
          }
        });
        break;
      case 'negative':
        this.setState({
          myEffects: {
            positive: [...this.state.myEffects.positive],
            negative: [...this.state.myEffects.negative, effect.effect],
            medical: [...this.state.myEffects.medical]
          }
        });
        break;
      case 'medical':
        this.setState({
          myEffects: {
            positive: [...this.state.myEffects.positive],
            negative: [...this.state.myEffects.negative],
            medical: [...this.state.myEffects.medical, effect.effect]
          }
        });
        break;
    }
  }
  addFlavor(flavor) {
    for (let key in this.state.flavors) {
      if (flavor === this.state.flavors[key] && !this.state.myFlavors.includes(this.state.flavors[key])) {
        this.setState({ myFlavors: [...this.state.myFlavors, flavor]});
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
          addEffect={this.addEffect}
          effects={this.state.effects}
          addFlavor={this.addFlavor}
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
