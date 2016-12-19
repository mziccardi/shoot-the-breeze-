import React from 'react'

import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'
import AddNewMessage  from '../lib/components/AddNewMessage'

const sinon = require('sinon')

describe('Unit Test | AddNewMessage', () => {
  it('can mount with no properties', () => {
  const wrapper = shallow(<AddNewMessage />)
  })
  it('should have a button with 1 prop', function(){
    const wrapper = render(<AddNewMessage />)
    assert.equal(wrapper.find('.submitBtn').length, 1)
  })
  it('should have the button text rendered onto the page', function(){
    const wrapper = render(<AddNewMessage/>)
    expect(wrapper.text()).to.contain('Submit')
  })
})
// describe('Feature Test | AddNewMessage', () => {
//   it('submits a message', () => {
//     const onButtonClick = sinon.spy()
//     const wrapper = shallow(
//       <AddNewMessage onClick={onButtonClick} />)
//     const wrapper2 = shallow(
//       <MessageInput />)
//     wrapper.find('.submit-button').simulate('click')
//     expect(wrapper2.state('draftMessage')).to.eq('')
//   })
// })
