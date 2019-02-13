import React, { Component } from 'react';
import classNames from 'classnames';

import CardDetails from './details';

import './index.css';

export class Card extends Component {
  constructor() {
    super();
    this.state =  {
      isOpen: false,
      isAdded: false,
    };
  }

  addCard = () => {
    const { card } = this.props;
    this.setState({ isAdded: true });
    this.props.onAdd({ name: card.name, cardId: card.id });
  }

  removeCard = () => {
    const { card } = this.props;
    this.setState({ isAdded: false });
    this.props.onRemove(card.id);
  }

  render() {
    const { card } = this.props;
    const { isOpen, isAdded } = this.state;
    const text = isAdded
      ? 'Remover'
      : 'Adicionar';
    const onClick = isAdded ? this.removeCard : this.addCard;
    return (
      <div className="cardWrapper">
        <img alt="imagem" className="cardBody" onClick={() => this.setState({ isOpen: true })} src={card.imageUrl} /> 
        {
          isOpen && 
          <CardDetails 
            onClose={()=> this.setState({ isOpen: false })}
            image={card.imageUrl}
            name={card.name}
            manaCost={card.manaCost}
            type={card.type}
            rarity={card.rarity}
            setName={card.setName}
            text={card.text}
            flavor={card.flavor}
            artist={card.artist}
          />
        }
        <div className="cardFooter">
          <button 
            className={classNames("btn", { "added": isAdded } )}
            onClick={onClick}
          > 
            {text} 
          </button>
        </div>

      </div>
    );
  }
}

export default Card;
