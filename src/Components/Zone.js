import React from 'react'

function Zone() {
  return (
    <div className='d-flex'> 
        <h4 className='me-5'>Zone :</h4>
        <div>
            <div>
                <input name='buttonGroup' id='1bloc' type='radio' defaultChecked />
                <label className='zoneLabel' htmlFor='1bloc'>1 Bloc</label>
            </div>
            <div>
                <input name='buttonGroup' id='2bloc' type='radio' />
                <label className='zoneLabel' htmlFor='2bloc'>2 Blocs</label>
            </div>
        </div>
    </div>
  )
}

export default Zone