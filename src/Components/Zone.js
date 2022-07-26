import React from 'react'

function Zone() {
  return (
    <div className='d-flex'> 
        <h4 className='mx-4'>Zone : </h4>
        <div>
            <div>
                <input name='buttonGroup' id='1bloc' type="radio" defaultChecked />
                <label htmlFor='1bloc'>1 Bloc</label>
            </div>
            <div>
                <input name='buttonGroup' id='2bloc' type="radio" />
                <label htmlFor='2bloc'>2 Blocs</label>
            </div>
        </div>
    </div>
  )
}

export default Zone