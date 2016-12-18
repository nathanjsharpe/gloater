import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import AccountButton from 'Components/nav/AccountButton';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';

describe('<AccountButton>', () => {
  describe('when no user is logged in', () => {
    const render = () => shallow(<AccountButton currentUser={null} />);

    it('renders a login button', () => {
      expect(render().find(FlatButton)).to.be.have.length(1);
    });

    it('does not render an avatar', () => {
      expect(render().find(Avatar)).to.have.length(0);
    })
  });

  describe('when a user is logged in', () => {
    const render = () => shallow(<AccountButton currentUser={{username: 'testuser', image: 'testimage'}} />);

    it('renders an avatar and username', () => {
      const wrapper = render();
      expect(wrapper.find(Avatar).prop('src')).to.equal('testimage');
      expect(wrapper.contains('testuser')).to.be.true;
    })
  })
});
