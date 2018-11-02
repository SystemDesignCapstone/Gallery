import sum from './functions';
import fetchUser from './fetchUser';
import Test from './react-functions';
import { shallow } from 'enzyme';
import React from 'react';

describe("start tests", () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).not.toBe(5)
  })
})



// test('App matches Snapshot', () => {
//   const component = renderer.create(<App />);
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

describe('testing Test react', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Test />);
  });

  it('includes 1 div with class foo', () => {
    console.log(wrapper, 'this is the wrapper')
    console.log(<Test />, 'this is the test')
    console.log(Test, 'this is the test')
    expect(wrapper).toBeDefined();
  });

  // it('includes a span with test!', () => {
  //   expect(wrapper.find('span.bar').text()).to.be.equal('Hey!')
  // })
})


// Working with async data
// describe("testing async", () => {
//   test('function is defined', () => {
//     expect(fetchUser).toBeDefined();
//   })

//   test('User fetched name should be Leanne Graham', () => {
//     expect.assertions(1);
//     return fetchUser().then(data => {
//       expect(typeof data.name).resolves.toEqual('Leanne Graham');
//     })
//   })
// })
