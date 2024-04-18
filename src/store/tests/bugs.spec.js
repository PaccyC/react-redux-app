import {addBug,resolveBug} from '../bugs'
import  configureStore  from '../configureStore'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import {unresolvedBugsSelector}  from '../bugs'
import { bugsSlice } from '../bugs'
describe("bugsSlice",()=>{
  it("It should handle addBug function",async()=>{

    const fakeAxios = new MockAdapter(axios)
    fakeAxios.onPost('/bugs').reply(200)
  const store= configureStore();
  const bug= {description:'a'};
  const saveBug = {...bug, id:1}
  
await  store.dispatch(addBug(bug));

  console.log(store.getState());

  expect(store.getState().entities.bugs.list).toHaveLength(1)
  })

  it("it should resolve a bug with given id if it's saved to the store",async()=>{
    
    // Arrange
    const fakeAxios = new MockAdapter(axios)
    fakeAxios.onPatch("/bugs/1").reply(200,{id:1,resolved:true})
    fakeAxios.onPost("/bugs").reply(200 ,{id:1})
    const store= configureStore();
    const bug=  {id:1,resolved:false};
     await store.dispatch(addBug({description: "a"}))
     await store.dispatch(resolveBug(1))
console.log(bugsSlice);
     expect(bugsSlice().list[0].resolved).toBe(true)
  })

      
    
})

const createState =()=>({
  entities:{
    bugs:{
      list:[] 
    }
  }
})

describe("SELECTORS",()=>{
  it("getUnresolved bugs should return unresolved bugs",()=>{

    // Arrange
    const state= createState();
    state.entities.bugs.list = [
      {id:1,description:'a',resolved:true},
      {id:2,description:'b',resolved:false},
      {id:3,description:'c',resolved:false}
    ]

    // Act
    const result =unresolvedBugsSelector(state)

    // Assert
    expect(result).toHaveLength(2);
  })
})
