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
      view: 'search'
    }
    this.getAllStrains = this.getAllStrains.bind(this);
    this.getEffects = this.getEffects.bind(this);
    this.getFlavors = this.getFlavors.bind(this);
    this.setView = this.setView.bind(this);
  }
  setView(e) {
    const view = e.target.name;
    this.setState({view});
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
  render() {
    return (
      <div className="App">
        <Nav setView={this.setView}/>
        <TypeAhead
          strains={this.state.strains}
          effects={this.state.effects}
          flavors={this.state.flavors}/>
      </div>
    );
  }
}

export default App;
