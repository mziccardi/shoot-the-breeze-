import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';

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
  it('should have user state of null',()=>{
    const wrapper = shallow(<Application />)
   assert.equal(wrapper.state('user'),(null))
 })
  it('should have a filterUser state of null',()=>{
    const wrapper = shallow(<Application />)
  assert.equal(wrapper.state('filterUser'),(null))
})
  it('should have a filterMessages state of null',()=>{
    const wrapper = shallow(<Application />)
    assert.equal(wrapper.state('filterMessages'),(null))
  })


  it('should have clear button', function(){
  const wrapper = render(<Application />)
  assert.equal(wrapper.find('.clearBtn').length,0)
  });
  it('should have add new message component with no props', function(){
  const wrapper = render(<Application />)
  assert.equal(wrapper.find('.AddNewMessageBtn').length,0)
  });





  it('renders xml elements', () => {
  sinon.spy(Application.prototype, 'render')
  const wrapper = mount(<Application />)
  assert.equal(Application.prototype.render.calledOnce, true)
})
});
