import { combineReducers  } from 'redux'
import bugsReducer from './bugs'
import projectsReducer from './projects'
import userReducer from './user'
export default combineReducers({
    bugs:bugsReducer,
    projects:projectsReducer,
    users:userReducer
})