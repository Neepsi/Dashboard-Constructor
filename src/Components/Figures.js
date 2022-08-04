import '../styles/block.css'
import empty_state from '../images/empty_state.png'
import three_dots from '../images/three_dots.png'
import delete_icon from '../images/delete_icon.png'
import edit_icon from '../images/edit_icon.png'
import { useState } from 'react'

function Figures({ oneBlockVisi, twoBlockVisi,bgColor,idFigureOne,idFigureTwo,idFigureThree }) {  
    const [open,setOpen] = useState(false);
    const [openn,setOpenn] = useState(false);
    

    const DropdownMenu = () =>
    {
        const DropdownItem = (props) =>
        {
            return(
                <div className='menu-item' id='testt' onClick={handleClick(props)}>
                <img src={props.name} id="img-test"/> {props.children}                
                </div>
            )
        }
        return(
            <div className='dropdownmenu'>
                <DropdownItem name={delete_icon}>Supprimer</DropdownItem>
                <DropdownItem name={edit_icon} >Modifier</DropdownItem>
            </div>
        )
       
    }    
    const handleClick =value=>()=>
    {
        console.log(document.body.getElementsByClassName('col'))
    }  
    const oneDiv=()=>
    {
        return (<p>Hello</p>)
    }
    return(    
        <div className='container'>    
            <div className='row'>   

            <div className={`col bg-secondary m-2 rounded position-relative shadow-sm p-3 mb-3 ${bgColor}`} id={idFigureOne} style={{display:oneBlockVisi,height:'285px'}}>                                                                                                        
                <img src={three_dots} id="threedot-icon" onClick={()=>setOpen(!open)} />
                    {open && (<DropdownMenu></DropdownMenu>)}            
                        <img src={empty_state} style={{maxWidth:'100%', maxHeight:'100%',width:'19rem', display: 'block',marginLeft:'auto',marginRight:'auto'}}/>                                                                              
                            <div className='badge text-wrap text-dark position-absolute bottom-0 start-50 translate-middle-x ' id='divEmptyStateOne' >
                                <p className='fs-2 fw-normal' style={{display: 'block'}}>Aucune donnée n’est disponible dans la période choisie.</p>
                            </div>                     
            </div>

            <div className={`col bg-secondary m-2 rounded position-relative shadow-sm p-3 mb-3 ${bgColor}`} id={idFigureTwo} style={{display:twoBlockVisi,height:'285px'}}>
                <img src={three_dots} id="threedot-icon" onClick={()=>setOpen(!open)} />
                    {open && (<DropdownMenu ></DropdownMenu>)}
                        <img src={empty_state} id='imgEmptyStateTwo' style={{maxWidth:'100%', maxHeight:'70%',display: 'block',marginLeft:'auto',marginRight:'auto'}}/>
                            <div className='badge text-wrap text-dark position-absolute bottom-0 start-50 translate-middle-x' id='divEmptyStateTwo'>
                                <p className='fs-5 fw-normal' id='texxt'>Aucune donnée n’est disponible dans la période choisie. 1</p>
                            </div>  
            </div>

            <div className= {`col bg-secondary m-2 rounded position-relative shadow-sm p-3 mb-3 ${bgColor}`} id={idFigureThree}  style={{display:twoBlockVisi,height:'285px'}}>                    
                <img src={three_dots} id="threedot-icon" onClick={()=>setOpenn(!openn)} />
                    {openn && (<DropdownMenu ></DropdownMenu>)}
                        <img src={empty_state} id='imgEmptyStateThree' style={{maxWidth:'100%', maxHeight:'70%', display: 'block',marginLeft:'auto',marginRight:'auto'}}/>                    
                            <div className='badge text-wrap text-dark position-absolute bottom-0 start-50 translate-middle-x' id='divEmptyStateThree'>
                                <p className='fs-5 fw-normal'>Aucune donnée n’est disponible dans la période choisie. 2</p>
                            </div> 
            </div>             
            </div>
        </div>                    
    )
}

export default Figures;