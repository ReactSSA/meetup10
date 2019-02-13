import React from 'react';
import CardDetails from '../details';
import { shallow } from 'enzyme';
import { card } from '../../../data';

describe('CardDetails', () => {
  describe('render', () => {
    it('Deve renderizar corretamente', () => {
      const {
        image,
        name,
        manaCost,
        type,
        rarity,
        setName,
        text,
        flavor,
        artist,
      } = card;
      const onClose = jest.fn();
      const wrapper = shallow(
        <CardDetails 
          image={image}
          name={name}
          manaCost={manaCost}
          type={type}
          rarity={rarity}
          setName={setName}
          text={text}
          flavor={flavor}
          artist={artist}
          onClose={onClose}
        />);
        expect(wrapper).toMatchSnapshot();
    });
  });

  describe('behavior', () => {
    it('Deve chamar função onClose quando clicado', () => {
      const onClose = jest.fn();
      const {
        image,
        name,
        manaCost,
        type,
        rarity,
        setName,
        text,
        flavor,
        artist,
      } = card;
      const wrapper = shallow(
        <CardDetails 
          image={image}
          name={name}
          manaCost={manaCost}
          type={type}
          rarity={rarity}
          setName={setName}
          text={text}
          flavor={flavor}
          artist={artist}
          onClose={onClose}
        />);
      const div = wrapper.find('.wrap');
      div.simulate('click');
      expect(onClose).toHaveBeenCalledWith();
    });
  });
});
