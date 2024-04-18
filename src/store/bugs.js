
import { createSlice,createSelector } from '@reduxjs/toolkit'
import { apiCallBegan } from './api';
import moment from 'moment'
import axios from 'axios';

 export const bugsSlice=createSlice  ({
    name:"bugs",
    initialState:{
        list:[],
        loading:false,
        lastFetched:null
    },
    reducers:{
        bugsRequested:(bugs,action)=>{
         bugs.loading = true;
        },
        bugsReceived : (bugs,action)=>{
        bugs.list = action.payload;
        bugs.loading = false;
        bugs.lastFetched = Date.now();
        },
        bugsRequestFailed :(bugs,action)=>{
       bugs.loading= false;
        },
        // Assign a bug to the team member(user)
        bugAssignedToUser: (bugs,action)=>{
            const  {id:bugId,userId} = action.payload
            const index= bugs.list.findIndex(bug =>bug.id === bugId);
            bugs.list[index].userId = userId;
        },
        bugAdded:(bugs,action)=>{
            bugs.list.push(action.payload)
        },
        bugResolved:(bugs,action)=>{
            const index= bugs.list.findIndex(bug => bug.id === action.payload.id)
            bugs.list[index].resolved =true
        }
    }
})

export default bugsSlice.reducer

export const {bugAdded,
    bugResolved,
    bugAssignedToUser,
    bugsReceived,
    bugsRequested,
    bugsRequestFailed} =bugsSlice.actions

//     actions.apiCallBegan({
 
//         url:"/bugs",
//         onStart:"bugs/bugsRequested",
//         onSuccess:"bugs/bugsReceived",
//         onError:"bugs/bugsRequestFailed",
    
    
// })

const url ="/bugs"
export const loadBugs  = () =>(dispatch,getState)=>{
    const {lastFetched} =getState().entities.bugs;

    const diffInMin= moment().diff(moment(lastFetched),"minutes")
    if(diffInMin <10)return
    dispatch(
        apiCallBegan({
            url,
            onStart:bugsRequested.type,
            onSuccess:bugsReceived.type,
            onError:bugsRequestFailed.type,
       
        })
    )
}


export const addBug =  bug =>async dispatch =>{
 const response= await axios.request({
    baseURL:"http://localhost:9001/api",
    url:"/bugs",
    method:"POST",
    data:bug
 })
 dispatch(bugAdded(response.data))
}

// export const addBug = bug =>apiCallBegan({
//         url,
//         method:"POST",
//         data:bug,
//         onSuccess:bugAdded.type
//     })


export const resolveBug = id =>apiCallBegan({
        url: url + "/" + id,
        method:"PATCH",
        data:{resolved:true},
        onSuccess:bugResolved.type
    })



export const assignBugToUser = (bugId,userId) => apiCallBegan({
    url : url + "/" + bugId,
    method: "PATCH",
    data: {userId},
    onSuccess:bugAssignedToUser.type

})

// Selector

// export const unresolvedBugsSelector = state =>{
//     return state.entities.bugs.filter(bug => !bug.resolved)
// }


  export const unresolvedBugsSelector= createSelector (
    state =>state.entities.bugs,
    bugs => bugs.list.filter(bug => !bug.resolved)
   )

 
   export const bugsByUserSelector = userId => createSelector(
    state =>state.entities.bugs,
    bugs =>bugs.filter(bug => bug.userId === userId)
   )