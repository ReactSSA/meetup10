import React from 'react';

import './index.css';

export const CardDetails: SComponent<Props> = ({ 
  image,
  name,
  manaCost,
  type,
  rarity,
  setName,
  text,
  flavor = "No description",
  artist,
  onClose,
}) => (
  <div className="wrap" onClick={onClose}>  
    <img alt="imagem" className="image" src={image} />    

    <div className="detailsWrapper">
      <div className="text"> Nome: {name} </div>
      <div className="text"> Custo de mana: {manaCost} </div>
      <div className="text"> Tipo: {type} </div>
      <div className="text"> Raridade: {rarity} </div>
      <div className="text"> Coleção: {setName} </div>
      <div className="text"> Texto: {text} </div>
      <div className="text"> Descrição: {flavor} </div>
      <div className="text"> Artista: {artist} </div>
    </div>
  </div>
);

export default CardDetails;
