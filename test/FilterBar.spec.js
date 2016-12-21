import React from 'react'

import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'
import FilterBar from '../lib/components/FilterBar'

const sinon = require('sinon')

describe('Unit Test | FilterBar', () => {
  it('can mount with no properties', () => {
  const wrapper = shallow(<FilterBar />)
  })
  it('should have the button text rendered onto the page', function(){
    const wrapper = render(<FilterBar/>)
    expect(wrapper.text()).to.contain('Sort')
  })
})
