import React from 'react';
import Card from '../';
import { shallow } from 'enzyme';
import { card } from '../../../data';

describe('Card', () => {
  const onAdd = jest.fn();
  const onRemove = jest.fn();
  const renderShallow = () => shallow(
    <Card card={card} onAdd={onAdd} onRemove={onRemove} />
  );

  describe('render', () => {
    it('Deve renderizar corretamente', () => {
      const wrapper = renderShallow();
      expect(wrapper).toMatchSnapshot();
    });

    it('Deve renderizar corretamente aberto', () => {
      const wrapper = renderShallow();
      wrapper.setState({ isOpen: true });
      expect(wrapper).toMatchSnapshot();
    });

    it('Deve renderizar corretamente adicionado', () => {
      const wrapper = renderShallow();
      wrapper.setState({ isAdded: true });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('behavior', () => {
    it('Deve setar o estado corretamente depois do clique', () => {
      const wrapper = renderShallow();
      expect(wrapper.state('isOpen')).toBeFalsy();
      const img = wrapper.find('.cardBody');
      img.simulate('click');
      expect(wrapper.state('isOpen')).toBeTruthy();
    });

    it('Deve setar o estado corretamente onClose', () => {
      const wrapper = renderShallow();
      wrapper.setState({ isOpen: true });
      const CardDetails = wrapper.find('CardDetails');
      CardDetails.simulate('close');
      expect(wrapper.state('isOpen')).toBeFalsy();
    });

    it('Deve remover uma carta no clique do botão', () => {
      const wrapper = renderShallow();
      wrapper.setState({ isAdded: true });
      const button = wrapper.find('.btn');
      button.simulate('click');
      expect(wrapper.state('isAdded')).toBeFalsy();
      expect(onRemove).toHaveBeenCalledWith(1);
    });

    it('Deve adicionar uma carta no clique do botão', () => {
      const wrapper = renderShallow();
      const button = wrapper.find('.btn');
      button.simulate('click');
      expect(wrapper.state('isAdded')).toBeTruthy();
      expect(onAdd).toHaveBeenCalledWith({
        name: card.name,
        cardId: card.id,
      });
    });
  });
});
