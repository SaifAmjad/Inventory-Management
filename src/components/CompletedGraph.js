import React from 'react'
import GraphSold from './GraphSold'


const CompletedGraph = () => {
  return (
    <div className="completedGraph">
       <div class="card" style={{width:"20pc",position:"absolute",top:"260px",left:"15pc",height:"20pc",borderRadius:'20px'}}>
      <div class="card-body">
       
        <GraphSold/> 
      
      </div>
    </div>
    </div>
  )
}

export default CompletedGraph
