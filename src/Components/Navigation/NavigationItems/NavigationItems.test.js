import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({ adapter: new Adapter() })
let wrapper

beforeEach(() => {
  wrapper = shallow(<NavigationItems />)
})

describe('<NavigationItems />', () => {
  it('should render two <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2)
  })

  it('should render three <NavigationItem /> elements if authenticated', () => {
    wrapper.setProps({ isAuth: true })
    expect(wrapper.find(NavigationItem)).toHaveLength(3)
  })

  it('should have an exact Logout <NavigationItem /> element if authenticated', () => {
    wrapper.setProps({ isAuth: true })
    expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true)
  })
})
