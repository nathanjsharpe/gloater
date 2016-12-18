import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Navbar } from './Navbar';
import AppBar from 'material-ui/AppBar';

describe('<Navbar>', () => {
  it('renders an AppBar', () => {
    expect(shallow(<Navbar />).find(AppBar)).to.have.length(1);
  });
});
