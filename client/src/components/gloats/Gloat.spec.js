import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Gloat from './Gloat';
import AdmireButton from './AdmireButton';
import { Card, CardHeader, CardActions } from 'material-ui/Card';

const testGloat = (data = {}) => ({
  id: 123,
  content: 'Test content',
  admirers_count: 3,
  user: {
    username: 'username',
    name: 'Test User',
    image: 'http://placehold.it/150x150'
  },
  ...data
});

const render = (props = {}) => shallow(
  <Gloat
    gloat={testGloat()}
    {...props}
  />
);

let wrapper;

describe('<Gloat>', () => {

  beforeEach(() => wrapper = render());

  it('renders a Card', () => {
    expect(wrapper.find(Card)).to.have.length(1);
  });

  it('renders the content of the gloat', () => {
    expect(wrapper.contains('Test content')).to.be.true;
  });

  it('renders CardActions', () => {
    expect(wrapper.find(CardActions)).to.have.length(1);
  });

  describe('header', () => {
    it('renders a CardHeader', () => {
      expect(wrapper.find(CardHeader)).to.have.length(1);
    })

    it('passes the image for the user as avatar to CardHeader', () => {
      expect(wrapper.find(CardHeader).prop('avatar')).to.equal('http://placehold.it/150x150');
    });
  });

  describe('admire button', () => {
    it('renders an AdmireButton', () => {
      expect(wrapper.find(AdmireButton)).to.have.length(1);
    });

    it('passes gloat as prop to AdmireButton', () => {
      expect(wrapper.find(AdmireButton).prop('gloat')).to.deep.equal(testGloat());
    });
  });
});
