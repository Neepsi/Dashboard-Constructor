import empty_state from './images/empty_state.png'

const Blocks = ({oneBlockVisi,twoBlockVisi}) =>
{
    
    return(  
        <div class="d-flex justify-content-center">
        <div class="container " style={{width:'60rem'}}>
            <div class="row">
                <div class="col bg-secondary m-2  rounded position-relative bg-light shadow-sm p-3 mb-3 bg-body"  style={{display:oneBlockVisi,height:'285px'}}>
                    <img src={empty_state} style={{maxWidth:'100%', maxHeight:'100%',width:'19rem', display: 'block',marginLeft:'auto',marginRight:'auto'}}/>                                                                              
                        <div class="badge text-wrap text-dark position-absolute bottom-0 start-50 translate-middle-x " id='divEmptyStateOne' >
                            <p class="fs-2 fw-normal" style={{display: 'block'}}>Aucune donnée n’est disponible dans la période choisie.</p>
                        </div>                     
                </div>
                <div class="w-100"></div>
                <div class="col bg-secondary m-2 rounded position-relative bg-light shadow-sm p-3 mb-3 bg-body" style={{display:twoBlockVisi,height:'285px'}}>
                    <img src={empty_state} id="imgEmptyStateTwo" style={{maxWidth:'100%', maxHeight:'70%',display: 'block',marginLeft:'auto',marginRight:'auto'}}/>
                    <div class="badge text-wrap text-dark position-absolute bottom-0 start-50 translate-middle-x" id='divEmptyStateTwo'>
                            <p class="fs-5 fw-normal" id='texxt'>Aucune donnée n’est disponible dans la période choisie.</p>
                        </div>  
                </div>

                <div class="col bg-secondary m-2 rounded position-relative bg-light shadow-sm p-3 mb-3 bg-body" style={{display:twoBlockVisi,height:'285px'}}>
                    <img src={empty_state} id="imgEmptyStateThree" style={{maxWidth:'100%', maxHeight:'70%', display: 'block',marginLeft:'auto',marginRight:'auto'}}/>                    
                    <div class="badge text-wrap text-dark position-absolute bottom-0 start-50 translate-middle-x" id='divEmptyStateThree'>
                            <p class="fs-5 fw-normal">Aucune donnée n’est disponible dans la période choisie.</p>
                        </div> 
                </div>
                <div class="w-100"></div>
                <div class="col bg-secondary m-2  rounded position-relative bg-light shadow-sm p-3 mb-3 bg-body"  style={{display:oneBlockVisi,height:'285px'}}>
                    <img src={empty_state} style={{maxWidth:'100%', maxHeight:'100%',width:'19rem', display: 'block',marginLeft:'auto',marginRight:'auto'}}/>                                                                              
                        <div class="badge text-wrap text-dark position-absolute bottom-0 start-50 translate-middle-x " id='divEmptyStateOne' >
                            <p class="fs-2 fw-normal" style={{display: 'block'}}>Aucune donnée n’est disponible dans la période choisie.</p>
                        </div>                     
                </div>
            </div>
        </div>   
        </div>     
    )

}

export default Blocks;