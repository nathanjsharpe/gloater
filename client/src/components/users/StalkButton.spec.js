import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { StalkButton } from './StalkButton';
import FlatButton from 'material-ui/FlatButton';

const testUser = (data = {}) => ({
  stalkers_count: 3,
  ...data
});

const render = (props = {}) => shallow(
  <StalkButton {...props} />
);

describe('<StalkButton>', () => {
  it('renders a FlatButton', () => {
    const wrapper = render({ user: testUser() });
    expect(wrapper.find(FlatButton)).to.have.length(1);
  });

  it('displays number of stalkers', () => {
    const wrapper = render({ user: testUser() });
    expect(wrapper.find(FlatButton).props()).to.have.property('label', 3);
  });

  describe('when user prop does not have stalked property', () => {
    const user = testUser();

    it('renders disabled FlatButton', () => {
      const wrapper = render({ user });
      expect(wrapper.find(FlatButton).prop('disabled')).to.equal(true);
    });

    it('does not call clickStalk when FlatButton is clicked', () => {
      const clickStalk = sinon.spy();
      const wrapper = render({ user, clickStalk });
      wrapper.find(FlatButton).simulate('click');
      expect(clickStalk.calledOnce).to.equal(false);
    });
  });

  describe('when user prop has stalked property', () => {
    const user = testUser({ stalked: true });

    it('does not disable FlatButton', () => {
      const wrapper = render({ user });
      expect(wrapper.find(FlatButton).prop('disabled')).to.equal(false);
    });

    it('calls clickStalk when FlatButton is clicked', () => {
      const clickStalk = sinon.spy();
      const wrapper = render({ user, clickStalk });
      wrapper.find(FlatButton).simulate('click');
      expect(clickStalk.calledOnce).to.equal(true);
    });
  });
});
