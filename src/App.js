import React, { Component } from 'react';
import { getAllStrains, getEffects, getFlavors } from './services/strainservices';
import { search } from './services/searchservices';
import Nav from './components/Nav';
import TypeAhead from './components/TypeAhead';
import EffectBox from './components/EffectBox';
import FlavorBox from './components/FlavorBox';
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
      myEffects: [],
      mySpecies: [],
      species: ['hybrid','indica','sativa'],
      view: 'strains',
    }
    this.getAllStrains = this.getAllStrains.bind(this);
    this.getEffects = this.getEffects.bind(this);
    this.getFlavors = this.getFlavors.bind(this);
    this.setView = this.setView.bind(this);
    this.addStrain = this.addStrain.bind(this);
    this.addEffect = this.addEffect.bind(this);
    this.addFlavor = this.addFlavor.bind(this);
    this.addSpecies = this.addSpecies.bind(this);
    this.getMine = this.getMine.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  setView(e) {
    const view = e.target.name;
    this.setState({view});
  }
  addStrain(strain) {
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
    let myEffectNames = [];
    for (let myKey in this.state.myEffects) {
      myEffectNames.push(this.state.myEffects[myKey].effect);
    }
    for (let key in this.state.effects) {
      if (effect.effect === this.state.effects[key].effect && !myEffectNames.includes(effect.effect)) {
        this.setState({ myEffects: [...this.state.myEffects,effect]});
        break;
      }
      else if (effect.effect === this.state.effects[key].effect && myEffectNames.includes(effect.effect)) {
        this.removeEffect(effect);
        break;
      }
    }
  }
  removeEffect(effect) {
    let myEffects = this.state.myEffects;
    let index;
    for (let key in myEffects) {
      if (effect.effect === myEffects[key].effect) {
        index = key;
      }
    }
    myEffects.splice(index,1);
    this.setState({ myEffects });
  }
  addFlavor(flavor) {
    for (let key in this.state.flavors) {
      if (flavor === this.state.flavors[key] && !this.state.myFlavors.includes(this.state.flavors[key])) {
        this.setState({ myFlavors: [...this.state.myFlavors, flavor]});
        break;
      }
      else if (flavor === this.state.flavors[key] && this.state.myFlavors.includes(this.state.flavors[key])) {
        this.removeFlavor(flavor);
      }
    }
  }
  removeFlavor(flavor) {
    let myFlavors = this.state.myFlavors;
    myFlavors.splice(myFlavors.indexOf(flavor),1);
    this.setState({ myFlavors });
  }
  addSpecies(species) {
    if (!this.state.mySpecies.includes(species)) {
      this.setState({ mySpecies: [...this.state.mySpecies,species]});
    }
    else {
      let mySpecies = this.state.mySpecies;
      mySpecies.splice(mySpecies.indexOf(species),1);
      this.setState({ mySpecies });
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
  getMine() {
    return (
      <div className="selected">
          {this.state.myEffects ? <h2>Effects</h2> : null}
          {this.state.myEffects ?
          this.state.myEffects.map(effect => {
            return (
              <div key={`${effect.effect}-div`}className="add">
                <p key={effect.effect}>{effect.effect} ({effect.type})</p>
                <button type="button" key={`${effect.effect}-button`} onClick={() => this.removeEffect(effect)}>-</button>
              </div>
            )
          }): null}
          {this.state.myFlavors ? <h2>Flavors</h2> : null}
          {this.state.myFlavors ?
          this.state.myFlavors.map(flavor => {
            return (
              <div key={`${flavor}-div`}className="add">
                <p key={flavor}>{flavor}</p>
                <button type="button" key={`${flavor}-button`} onClick={() => this.removeFlavor(flavor)}>-</button>
              </div>
            )}) : null}
      </div>
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    search(this.state.strains,this.state.mySpecies,this.state.myEffects,this.state.myFlavors);
  }
  getView() {
    switch(this.state.view) {
      case 'strains':
        return <TypeAhead
          strains={this.state.strains}
          addStrain={this.addStrain}/>;
      case 'search':
        return (
        <div className="type-container">
          <TypeAhead
            addSpecies={this.addSpecies}
            species={this.state.species}
            addEffect={this.addEffect}
            effects={this.state.effects}
            addFlavor={this.addFlavor}
            flavors={this.state.flavors}
            onSubmit={this.handleSubmit}/>
          <EffectBox
            addEffect={this.addEffect}
            effects={this.state.effects}/>
          <FlavorBox
            addFlavor={this.addFlavor}
            flavors={this.state.flavors}/>
          {this.getMine()}
        </div>);
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
