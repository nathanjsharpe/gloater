import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme';
import { App } from './App';
import Navbar from './Navbar';

chai.use(chaiEnzyme);
const { expect } = chai;

describe('<App>', () => {
  it('renders div with class App', () => {
    expect(shallow(<App />).find('div.App')).to.have.length(1);
  });

  it('renders a Navbar', () => {
    expect(shallow(<App />).find(Navbar)).to.have.length(1);
  });
});
