import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { AdmireButton } from './AdmireButton';
import FlatButton from 'material-ui/FlatButton';

const testGloat = (data = {}) => ({
  admirers_count: 3,
  ...data
});

const render = (props = {}) => shallow(
  <AdmireButton {...props} />
);

describe('<AdmireButton>', () => {
  it('renders a FlatButton', () => {
    const wrapper = render({ gloat: testGloat() });
    expect(wrapper.find(FlatButton)).to.have.length(1);
  });

  it('displays number of admirers', () => {
    const wrapper = render({ gloat: testGloat() });
    expect(wrapper.find(FlatButton).props()).to.have.property('label', 3);
  });

  describe('when gloat prop does not have admired property', () => {
    const gloat = testGloat();

    it('renders disabled FlatButton', () => {
      const wrapper = render({ gloat });
      expect(wrapper.find(FlatButton).prop('disabled')).to.equal(true);
    });

    it('does not call clickAdmire when FlatButton is clicked', () => {
      const clickAdmire = sinon.spy();
      const wrapper = render({ gloat, clickAdmire });
      wrapper.find(FlatButton).simulate('click');
      expect(clickAdmire.calledOnce).to.equal(false);
    });
  });

  describe('when gloat prop has admired property', () => {
    const gloat = testGloat({ admired: true });

    it('does not disable FlatButton', () => {
      const wrapper = render({ gloat });
      expect(wrapper.find(FlatButton).prop('disabled')).to.equal(false);
    });

    it('calls clickAdmire when FlatButton is clicked', () => {
      const clickAdmire = sinon.spy();
      const wrapper = render({ gloat, clickAdmire });
      wrapper.find(FlatButton).simulate('click');
      expect(clickAdmire.calledOnce).to.equal(true);
    });
  });
});
