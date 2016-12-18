import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert } from 'chai';

import Application from '../lib/components/Application';
const sinon=require('sinon')

describe('Application', () => {
  it('can mount with no properties', () => {
    const wrapper = shallow(<Application />)
  })
  it('renders as a <div>', () => {
    const wrapper = shallow(<Application />)
    assert.equal(wrapper.type(), 'div');
  });
  it('can call componentDidMount', () => {
    sinon.spy(Application.prototype, 'componentDidMount')
    const wrapper = mount(<Application />)
    assert.equal(Application.prototype.componentDidMount.calledOnce, true)
  });
  it('should have clear button with 1 prop', function(){
  const wrapper = render(<Application />)
  assert.equal(wrapper.find('.clearBtn').length,1)
  });
  it('should have add new message component with 1 prop', function(){
  const wrapper = render(<Application />)
  assert.equal(wrapper.find('.AddNewMessageBtn').length,1)
  });
  it('renders xml elements', () => {
  sinon.spy(Application.prototype, 'render')
  const wrapper = mount(<Application />)
  assert.equal(Application.prototype.render.calledOnce, true)
})
});
