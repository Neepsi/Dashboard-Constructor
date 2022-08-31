import React from 'react'

function Zone({ setSelectedZone }) {

  const handleChange = (e) => {
    e.currentTarget.id === '1bloc' ? setSelectedZone(1) : setSelectedZone(2)
  }

  return (
    <div className='d-flex'> 
        <h4 className='me-5'>Zone</h4>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-2'>
                <input name='buttonGroup' id='1bloc' type='radio' onChange={(event) => handleChange(event)} />
                <label className='zoneLabel' htmlFor='1bloc'>1 Bloc</label>
            </div>
            <div className='col-sm-2'>
                <input name='buttonGroup' id='2bloc' type='radio' onChange={(event) => handleChange(event)}   />
                <label className='zoneLabel' htmlFor='2bloc'>2 Blocs</label>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Zone