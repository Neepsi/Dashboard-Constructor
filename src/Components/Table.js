import React from 'react'

function Table({ libelleFigure, table, data }) {
  return (
    <div style={{ maxHeight: 'clamp(10em, 75vh, 320px)', overflow: 'auto' }}>
        <h4 className='text-center my-3'>{libelleFigure}</h4>
        <table className='table table-striped'>
          <thead className='table-dark'>
              <tr>
                { table.map(x => <th>{x}</th>) }
                { table.length !== 0 && <th className='text-center'>Nombre de demandes</th> }
              </tr>
          </thead>
          <tbody>            
              { data.map(x => 
              <tr>
                  { table.map(y => 
                  <td>{x[y]}</td>
                  ) }
                  { table.length !== 0 && <td className='text-center'>{x['Nombre de demandes']}</td> }
              </tr> 
              ) }          
          </tbody>
        </table>    
    </div>     
  )
}

export default Table