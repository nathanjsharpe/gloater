import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Gloats } from './Gloats';
import Gloat from './Gloat';
import CircularProgress from 'material-ui/CircularProgress';

const testGloats = [
  {
    id: 1,
    content: 'Test content 1',
    user: {
      username: 'username',
      name: 'Test User',
      image: 'http://placehold.it/150x150'
    },
  },
  {
    id: 2,
    content: 'Test content 2',
    user: {
      username: 'username',
      name: 'Test User',
      image: 'http://placehold.it/150x150'
    },
  },
  {
    id: 3,
    content: 'Test content 3',
    user: {
      username: 'username',
      name: 'Test User',
      image: 'http://placehold.it/150x150'
    },
  },
];

describe('<Gloats>', () => {

  describe('when loading', () => {
    const render = () => shallow(
      <Gloats
        gloats={testGloats}
        loading
      />
    );

    it('renders CircularProgress', () => {
      const wrapper = render();

      expect(wrapper.find(CircularProgress).length).to.be.at.least(1);
    });

    it('does not render gloats', () => {
      const wrapper = render();

      expect(wrapper.find(Gloat)).to.have.length(0);
    });
  });

  describe('when not loading', () => {
    const render = () => shallow(
      <Gloats
        gloats={testGloats}
        loading={false}
      />
    );

    it('renders a Gloat component for each gloat', () => {
      const wrapper = render();

      expect(wrapper.find(Gloat).length).to.be.at.least(3);
    });

    it('does not render CircularProgress', () => {
      const wrapper = render();
      expect(wrapper.find(CircularProgress).length).to.equal(0);
    });
  })

});
