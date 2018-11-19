import React, { Component } from 'react';
import { getAllStrains, getEffects, getFlavors } from './services/strainservices';
import { search } from './services/searchservices';
import Favorites from './components/Favorites';
import Nav from './components/Nav';
import Permissions from './components/Permissions';
import Search from './components/Search';
import TypeAhead from './components/TypeAhead';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strains: '',
      flavors: '',
      effects: '',
      myStrains: JSON.parse(localStorage.getItem('myStrains')), // add localStorage
      myFlavors: [],
      myEffects: [],
      mySpecies: [],
      currentStrain: '',
      currentName: '',
      view: 'strains',
      suggestions: '',
      birthday: '',
      permissions: JSON.parse(localStorage.getItem('permissions'))
    }
    this.getAllStrains = this.getAllStrains.bind(this);
    this.getEffects = this.getEffects.bind(this);
    this.getFlavors = this.getFlavors.bind(this);
    this.setView = this.setView.bind(this);
    this.addStrain = this.addStrain.bind(this);
    this.addEffect = this.addEffect.bind(this);
    this.addFlavor = this.addFlavor.bind(this);
    this.addSpecies = this.addSpecies.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setStrain = this.setStrain.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.isFavorite = this.isFavorite.bind(this);
    this.setPermissions = this.setPermissions.bind(this);
    this.setBirthday = this.setBirthday.bind(this);
  }
  setBirthday(e) {
    let birthday = e.target.value;
    this.setState({ birthday });
  }
  setPermissions() {
    let birthday = this.state.birthday;
    birthday = Date.parse(birthday);
    let current = new Date();
    if (current.getTime() - birthday >= 662709600000) {
      localStorage.setItem('permissions',true);
      this.setState({permissions : true});
    }
  }
  setView(e) {
    const view = e.target.name;
    this.setState({view});
  }
  clearSearch() {
    this.setState({
      myFlavors: [],
      myEffects: [],
      mySpecies: []
    })
  }
  addStrain(strain) {
    this.setState((state,props) => {
      let myStrains;
      if (this.isFavorite(strain) === undefined) {
        myStrains = state.myStrains;
        delete myStrains[strain];
      }
      else {
        let key = this.isFavorite(strain);
        myStrains = { ...state.myStrains, [key] : state.strains[key]};
      }
      localStorage.setItem('myStrains',JSON.stringify(myStrains));
      return { myStrains };
    });
  }
  isFavorite(strain) {
    let myStrainNames = [];
    for (let myKey in this.state.myStrains) {
      myStrainNames.push(myKey);
    }
    for (let key in this.state.strains) {
      if (strain === key && !myStrainNames.includes(key)) {
        return key;
      }
      else if (strain === key && myStrainNames.includes(key)) {
        return undefined;
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
  async setStrain(strain,name) {
    let currentStrain = strain;
    let currentName = name;
    await this.setState({currentStrain, currentName});
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
  handleSubmit(e) {
    e.preventDefault();
    let suggestions = search(this.state.strains,this.state.mySpecies,this.state.myEffects,this.state.myFlavors);
    this.setState({suggestions});
  }
  getView() {
    switch(this.state.view) {
      case 'strains':
        return <TypeAhead
          strains={this.state.strains}
          addStrain={this.addStrain}
          setStrain={this.setStrain}
          isFavorite={this.isFavorite}
          currentStrain={this.state.currentStrain}
          currentName={this.state.currentName}
          showStrain={this.showStrain}/>;
      case 'search':
        return <Search
          addSpecies={this.addSpecies}
          mySpecies={this.state.mySpecies}
          effects={this.state.effects}
          myEffects={this.state.myEffects}
          addEffect={this.addEffect}
          flavors={this.state.flavors}
          myFlavors={this.state.myFlavors}
          addFlavor={this.addFlavor}
          handleSubmit={this.handleSubmit}
          suggestions={this.state.suggestions}
          clearSearch={this.clearSearch}
          addStrain={this.addStrain}
          isFavorite={this.isFavorite}/>
      case 'favorites':
        return <Favorites
          strains={this.state.myStrains}
          addStrain={this.addStrain}
          isFavorite={this.isFavorite}/>
      default:
        return <Permissions />
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.state.permissions ?
        <div className="App">
        <h1>Lexicanna</h1>
        <Nav setView={this.setView}/>
        {this.getView()}
        </div>
       : <Permissions
            setPermissions={this.setPermissions}
            birthday={this.state.birthday}
            setBirthday={this.setBirthday}/>}
    </React.Fragment>
    );
  }
}

export default App;
