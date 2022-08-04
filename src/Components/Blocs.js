import empty_state from '../images/empty_state.png'

function Blocs({ oneBlockVisi, twoBlockVisi }) {
    return(  
        <div className='d-flex justify-content-center'>
            <div className='container ' style={{width:'60rem'}}>
                <div className='row'>
                    <div className='col bg-secondary m-2  rounded position-relative bg-light shadow-sm p-3 mb-3 bg-body'  style={{display:oneBlockVisi,height:'285px'}}>
                        <img src={empty_state} style={{maxWidth:'100%', maxHeight:'100%',width:'19rem', display: 'block',marginLeft:'auto',marginRight:'auto'}}/>                                                                              
                        <div className='badge text-wrap text-dark position-absolute bottom-0 start-50 translate-middle-x ' id='divEmptyStateOne' >
                            <p className='fs-2 fw-normal' style={{display: 'block'}}>Aucune donnée n’est disponible.</p>
                        </div>                     
                    </div>

                    <div className='w-100'></div>
                    <div className='col bg-secondary m-2 rounded position-relative bg-light shadow-sm p-3 mb-3 bg-body' style={{display:twoBlockVisi,height:'285px'}}>
                        <img src={empty_state} id='imgEmptyStateTwo' style={{maxWidth:'100%', maxHeight:'70%',display: 'block',marginLeft:'auto',marginRight:'auto'}}/>
                        <div className='badge text-wrap text-dark position-absolute bottom-0 start-50 translate-middle-x' id='divEmptyStateTwo'>
                            <p className='fs-5 fw-normal' id='texxt'>Aucune donnée n’est disponible.</p>
                        </div>  
                    </div>

                    <div className='col bg-secondary m-2 rounded position-relative bg-light shadow-sm p-3 mb-3 bg-body' style={{display:twoBlockVisi,height:'285px'}}>
                        <img src={empty_state} id='imgEmptyStateThree' style={{maxWidth:'100%', maxHeight:'70%', display: 'block',marginLeft:'auto',marginRight:'auto'}}/>                    
                        <div className='badge text-wrap text-dark position-absolute bottom-0 start-50 translate-middle-x' id='divEmptyStateThree'>
                                <p className='fs-5 fw-normal'>Aucune donnée n’est disponible.</p>
                            </div> 
                    </div>

                    <div className='w-100'></div>
                    <div className='col bg-secondary m-2  rounded position-relative bg-light shadow-sm p-3 mb-3 bg-body'  style={{display:oneBlockVisi,height:'285px'}}>
                        <img src={empty_state} style={{maxWidth:'100%', maxHeight:'100%',width:'19rem', display: 'block',marginLeft:'auto',marginRight:'auto'}}/>                                                                              
                        <div className='badge text-wrap text-dark position-absolute bottom-0 start-50 translate-middle-x ' id='divEmptyStateOne' >
                            <p className='fs-2 fw-normal' style={{display: 'block'}}>Aucune donnée n’est disponible.</p>
                        </div>                     
                    </div>
                </div>
            </div>   
        </div>     
    )
}

export default Blocs;