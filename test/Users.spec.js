import React from 'react'

import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'
import Users from '../lib/components/Users'

const sinon = require('sinon')

describe('Unit Test | Users', () => {
  it('can mount with no properties', () => {
  const wrapper = shallow(<Users />)
  })
  it('renders as a <div>', () => {
    const wrapper = shallow(<Users />)
    assert.equal(wrapper.type(), 'div');
  })
  it('should have no prop', function(){
    const wrapper = render(<Users />)
    assert.equal(wrapper.find('.click').length, 0)
  })
})
