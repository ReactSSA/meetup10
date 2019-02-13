import React, { Component } from 'react';
import './App.css';
import Card from './components/card';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      deck: [],
      isOpen: false,
    }
  }

  componentDidMount() {
    fetch('https://api.magicthegathering.io/v1/cards?page=28')
      .then(res => res.json())
      .then(data => this.setState({ cards: data.cards }))
  }
    
  addCard = card => {
    const { deck } = this.state;
    this.setState({ deck: [...deck, card] });
  }

  removeCard = id => {
    const { deck } = this.state;
    const idx = deck.findIndex(card => card.cardId === id);
    deck.splice(idx, 1);
    this.setState({ deck });
  }

  toggleOpen= () => {
   this.setState({ isOpen: !this.state.isOpen });
} 

  render() {
    const { deck, isOpen } = this.state;
    return (
      <div className="appWrapper">
        <div className="appHeader">
          MONTE SEU DECK DE COMMANDER!
          <span className="icon" onClick={this.toggleOpen}>
            Meu deck: {deck.length}
          </span>
        </div>
        { 
          this.state.cards.map((card, idx) => <Card key={idx} card={card} onAdd={this.addCard} onRemove={this.removeCard} />) 
        }
        {
          isOpen &&
          <div className="wrapper">
            {
              deck.map((c,idx) => <div className="deck" key={idx}> - {c.name} </div>)
            }
            </div>
        }
      </div>
    );
  }
}

export default App;
