import '../styles/verification.css'
import delete_illu from '../images/delete_illu.svg'
import React from 'react';

function Verification ({ toggleveri, deleteFig }) {        
    return(
        <div id="modal">
            <div id="overlay"></div>
            <div id="modal-content">
                <div id='top'> <img src={delete_illu} style={{maxWidth:'100%', maxHeight:'80%', display: 'block',marginLeft:'auto',marginRight:'auto',position:'relative',top:'15%'}}/></div>
                <h5 className='d-flex justify-content-center p-2 pt-4'>Supprimer Figure ?</h5>
                <p className='d-flex justify-content-center'>Êtes-vous sure de supprimer cette figure ?</p>
                <div className='d-flex justify-content-evenly p-3'>
                    <button id='btn-annuler' onClick={toggleveri}>Annuler</button>
                    <button id='btn-supprimer'onClick={deleteFig}>Supprimer</button>
                </div>                
            </div>
            
        </div>
    )
}

export default Verification;