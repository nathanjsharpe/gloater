import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Gloat from './Gloat';
import { Card, CardHeader } from 'material-ui/Card';

const testGloat = {
  id: 123,
  content: 'Test content',
  user: {
    username: 'username',
    name: 'Test User',
    image: 'http://placehold.it/150x150'
  },
};

describe('<Gloat>', () => {
  const render = () => shallow(
    <Gloat
      gloat={testGloat}
    />
  );

  it('renders a Card', () => {
    const wrapper = render();
    expect(wrapper.find(Card)).to.have.length(1);
  });

  it('renders a CardHeader', () => {
    const wrapper = render();
    expect(wrapper.find(CardHeader)).to.have.length(1);
  })

  it('passes username of the user prepended with "@" as subtitle to CardHeader', () => {
    const wrapper = render();
    expect(wrapper.find(CardHeader).prop('subtitle')).to.equal('@username');
  });

  it('passes name of the user as title to CardHeader', () => {
    const wrapper = render();
    expect(wrapper.find(CardHeader).prop('title')).to.equal('Test User');
  });

  it('passes the image for the user as avatar to CardHeader', () => {
    const wrapper = render();
    expect(wrapper.find(CardHeader).prop('avatar')).to.equal('http://placehold.it/150x150');
  });

  it('renders the content of the gloat', () => {
    const wrapper = render();
    expect(wrapper.contains('Test content')).to.be.true;
  });
});
