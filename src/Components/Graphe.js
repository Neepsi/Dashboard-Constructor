import React from 'react'

function Graphe({ graph, selectedGraph, setSelectedGraph, graphCount }) {
    const handleChange = (i) => { 
        setSelectedGraph(selectedGraph = i)
    } 
 
    return (
        <div className='d-flex'>
            <h4 className='me-4'>Graphe</h4> 
            <div className='container'>
                <div className='row '>
                    {graph.map((g, index) =>                     
                        <div key={g.name} className='col-sm-2'>  
                            <label className='card-label'>
                                <input name='cardGroup' type='radio' onChange={() => handleChange(index)} onSelect={() => graphCount(graph.length)} />                
                                <div className='card mb-3 card-input' style={{maxWidth: 12+'rem'}}>
                                    {g.src ? <img className='card-img-top mt-4' src={ require(`../images/${g.src}`) } height='50px' style={{ objectFit: 'scale-down' }} /> : <img className='card-img-top mt-4' src={ require('../images/blank.png') } height='50px' style={{ objectFit: 'scale-down' }} /> }
                                    <div className='card-body'>
                                        <p className='card-text text-center lh-1'>{g.name}</p>                     
                                    </div>                    
                                </div>
                            </label>
                        </div>
                    )}          
                </div>
            </div>
        </div> 
    )
}

export default Graphe