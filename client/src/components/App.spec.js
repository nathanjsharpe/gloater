import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme';
import { App } from './App';
import AppBar from 'material-ui/AppBar';

chai.use(chaiEnzyme);
const { expect } = chai;

describe('<App>', () => {
  it('renders div with class App', () => {
    expect(shallow(<App />).find('div.App')).to.have.length(1);
  });

  it('renders an AppBar', () => {
    expect(shallow(<App />).find(AppBar)).to.have.length(1);
  });
});
