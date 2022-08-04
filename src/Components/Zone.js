import React from 'react'

function Zone() {

  const handleChange = () => {
    let btnG = document.getElementsByName('buttonGroup')
    console.log(btnG[0].checked)
  }

  return (
    <div className='d-flex'> 
        <h4 className='me-5'>Zone</h4>
        <div>
            <div>
                <input name='buttonGroup' id='1bloc' type='radio' defaultChecked onChange={(event) => handleChange(event)} />
                <label className='zoneLabel' htmlFor='1bloc'>1 Bloc</label>
            </div>
            <div>
                <input name='buttonGroup' id='2bloc' type='radio' onChange={() => handleChange()}   />
                <label className='zoneLabel' htmlFor='2bloc'>2 Blocs</label>
            </div>
        </div>
    </div>
  )
}

export default Zone