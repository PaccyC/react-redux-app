import { createSlice } from '@reduxjs/toolkit'


let lastId =0;
const slice = createSlice ({
    name:"projects",
    initialState:[],
    reducers:{
        projectAdded:(projects,action)=>{
            projects.push({
                    id: ++lastId,
                title: action.payload.title
            }
            )
        }
    }
})

export const {projectAdded} = slice.actions
export default slice.reducer