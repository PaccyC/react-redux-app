import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBugs,unresolvedBugsSelector } from '../store/bugs'
const BugsList = () => {
    const dispatch= useDispatch()
    const bugs = useSelector(unresolvedBugsSelector);

    useEffect(()=>{
       dispatch(loadBugs());
    },[])

  return (
  <div>
    <h3>Here is the list of unresolved bugs</h3>
      <ul>{bugs.map((bug)=> <li key={bug.id}>{bug.description}</li>)}</ul>
  </div>
  )
}

export default BugsList
