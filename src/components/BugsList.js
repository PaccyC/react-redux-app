import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBugs,unresolvedBugsSelector,resolveBug } from '../store/bugs'

const BugsList = () => {
    const dispatch= useDispatch()
    const bugs = useSelector(unresolvedBugsSelector);

    
    useEffect(()=>{
       dispatch(loadBugs());

    },[])


  return (
  <div>
    <h3>Here is the list of unresolved bugs</h3>
      <ul>{bugs.map((bug)=> 
      <li key={bug.id}>{bug.description}
      <button onClick={()=>dispatch(resolveBug(bug.id))}>Resolve</button>
      </li>)}</ul>
  </div>
  )
}

export default BugsList
