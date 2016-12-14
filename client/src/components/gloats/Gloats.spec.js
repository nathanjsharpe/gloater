import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Gloats } from './Gloats';
import Card from 'material-ui/Card';
import RefreshIndicator from 'material-ui/RefreshIndicator';

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
  it('renders a RefreshIndicator', () => {
    const wrapper = shallow(
      <Gloats
        gloats={testGloats}
      />
    );
    expect(wrapper.find(RefreshIndicator)).to.have.length(1);
  });

  it('renders a Card for each gloat', () => {
    const wrapper = shallow(
      <Gloats
        gloats={testGloats}
      />
    );
    expect(wrapper.find(Card)).to.have.length(3);
  });

  describe('when loading', () => {
    const getWrapper = () => shallow(
      <Gloats
        gloats={testGloats}
        loading
      />
    );

    it('passes status of "loading" to RefreshIndicator', () => {
      const wrapper = getWrapper();

      expect(wrapper.find(RefreshIndicator).prop('status')).to.equal('loading');
    });
  });

  describe('when not loading', () => {
    const getWrapper = () => shallow(
      <Gloats
        gloats={testGloats}
        loading={false}
      />
    );

    it('passes status of "loading" to RefreshIndicator', () => {
      const wrapper = getWrapper();
      expect(wrapper.find(RefreshIndicator).prop('status')).to.equal('hide');
    });
  })

});
