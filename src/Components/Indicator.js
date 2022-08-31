import React from 'react'

function Indicator({ libelleFigure, indicator, indicatorValue }) {
  return (
    <div>
        <h4 className='text-center my-4'>{libelleFigure}</h4>
        <div className='d-flex justify-content-center'>
        <div className='rounded' style={{paddingTop: '70px', paddingBottom: '70px', width: '550px', backgroundColor: '#A9A9A9' }}>
            <div className='d-flex justify-content-center'>
            <div className='d-flex flex-column'>
                <div>
                <h3 className='text-white'>{indicator.charAt(0).toUpperCase() + indicator.slice(1).replaceAll('_', ' ') }</h3>
                </div>
                <div className='text-center text-white'>
                <h4>{indicatorValue}</h4>
                </div>             
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Indicator