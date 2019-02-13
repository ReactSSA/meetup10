import React from 'react';
import { shallow } from 'enzyme';
import { cards, deck, card } from './data';
import Card from './components/card';
import App from './App';

describe('<App />', () => {
  describe('render', () => {
    it('Deve renderizar corretamente', () => {
      const wrapper = shallow(<App />);
      expect(wrapper).toMatchSnapshot();
    });

    it('Deve renderizar corretamente com cartas', () => {
      const wrapper = shallow(<App />);
      wrapper.setState({ cards });
      expect(wrapper).toMatchSnapshot();
    });

    it('Deve renderizar corretamente com aberto', () => {
      const wrapper = shallow(<App />);
      wrapper.setState({ isOpen: true, deck });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('behavior', () => {
     const mockFetch = global.fetch;

    afterEach(() => {
      global.fetch = mockFetch;
    });

    it('Deve setar o estate corretamente com as cartas', () => {
      const data = {
        cards,
      };

      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => data,
      }));
      const url = 'https://api.magicthegathering.io/v1/cards?page=28';
      const wrapper = shallow(<App />);
      wrapper.instance().componentDidMount();
      expect(fetch).toHaveBeenCalledWith(url);
    });

    it('Deve toggleOpen quando clicado', () => {
      const wrapper = shallow(<App />);
      const span = wrapper.find('.icon');
      span.simulate('click');
      expect(wrapper.state('isOpen')).toBeTruthy();
      span.simulate('click');
      expect(wrapper.state('isOpen')).toBeFalsy();
    });

    it('Deve adicionar uma carta', () => {
      const wrapper = shallow(<App />);
      const { addCard } = wrapper.instance();
      wrapper.setState({ deck });
      addCard(card);
      expect(wrapper.state('deck')).toEqual([
        ...deck,
        card,
      ]);
    });

    it('Deve remover uma carta', () => {
      const wrapper = shallow(<App />);
      const { removeCard } = wrapper.instance();
      wrapper.setState({ deck });
      removeCard(2);
      expect(wrapper.state('deck')).toEqual([
        {
          name: 'Black Lotus',
          cardId: 1,
        },
        {
          name: 'Swamp',
          cardId: 3,
        },
        {
          name: 'Island',
          cardId: 4,
        }
      ]);
    });
  });
});
