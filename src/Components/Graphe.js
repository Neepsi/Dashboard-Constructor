import React from 'react'

function Graphe({ graphe }) {
  return (
    <div className='d-flex'>
        <h4 className='me-4'>Graphe :</h4> 
        <div className='row'>
            {graphe.map(g => 
                <div className='col-sm-2'>                   
                    <div className="card mb-3" style={{maxWidth: 8+'rem'}}>
                        <img className='card-img-top mt-4' src={ require(`../images/${g.src}`) } height="50px" style={{ objectFit: "scale-down" }} />
                        <div className="card-body">
                            <p className="card-text text-center text-secondary">{g.name}</p>
                        </div>
                        
                    </div>
                </div>
            )}          
        </div>
    </div> 
  )
}

export default Graphe