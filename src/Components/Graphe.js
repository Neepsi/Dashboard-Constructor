import React from 'react'

function Graphe({ graphe }) {
  return (
    <div className='d-flex'>
        <h4 className='mx-4'>Graphe : </h4> 
        <div className="row">
            {graphe.map(g => 
            <div className="col-sm-3" key={g.name}>
                    <div className="card mb-4" >
                        <img className='card-img-top mt-4' src={ require(`../images/${g.src}`) } 
                            height="100px" style={{ objectFit: "scale-down" }} />
                        <div className="card-body">
                            <p className="card-text text-center text-primary">{g.name}</p>
                        </div>
                    </div>
                </div> 
            )}          
        </div>
    </div> 
  )
}

export default Graphe