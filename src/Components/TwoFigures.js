import '../styles/block.css'
import empty_state from '../images/empty_state.png'
import three_dots from '../images/three_dots.png'
import delete_icon from '../images/delete_icon.png'
import edit_icon from '../images/edit_icon.png'
import { useState } from 'react'
import Test from './Dashboard'
import OneFigure from './OneFigure'

function TwoFigures({bgColor, idFigure,idfigone,idfigtwo,deletefunc,orderfunc,toggleverif,editpopup}) {  
    const [open,setOpen] = useState(false);
    const [openn,setOpenn] = useState(false);
    

    const DropdownMenu = (props) =>
    {           
        const DropdownItem = (props) =>
        {               
            return(
                <div className='menu-item'>
                <img src={props.name} id="img-test"/> {props.children}                
                </div>
            )
            
        }
        const handleClick=()=>
        {   orderfunc();
            deletefunc();            
        }
        return(
            <div className='dropdownmenu'>
                <div onClick={()=>handleClick()}>
                    <DropdownItem name={delete_icon}>Supprimer</DropdownItem>
                </div>
                <div onClick={editpopup}>
                    <DropdownItem name={edit_icon}>Modifier</DropdownItem>
                </div>                
                
            </div>
        )
       
    }    

    return(    
        <div className='container'  >    
            <div className='row' id={"subFig"+idFigure}>   

            <div className={`col bg-secondary m-2 rounded position-relative shadow-sm p-3 mb-3 ${bgColor}`} id={"figo"+idfigone} style={{height:'285px'}}>
                <img src={three_dots} id="threedot-icon" onClick={()=>setOpen(!open)} />
                    {open && (<DropdownMenu id={'idFigone'}>{!open} </DropdownMenu>)}
                        <img src={empty_state} id='imgEmptyStateTwo' style={{maxWidth:'100%', maxHeight:'70%',display: 'block',marginLeft:'auto',marginRight:'auto'}}/>
                            <div className='badge text-wrap text-dark position-absolute bottom-0 start-50 translate-middle-x' id='divEmptyStateTwo'>
                                <p className='fs-5 fw-normal' id='texxt'>Aucune donnée n’est disponible dans la période choisie. 1</p>
                            </div>  
            </div>

            <div className= {`col bg-secondary m-2 rounded position-relative shadow-sm p-3 mb-3 ${bgColor}`} id={"figt"+idfigtwo} style={{height:'285px'}}>                    
                <img src={three_dots} id="threedot-icon" onClick={()=>setOpenn(!openn)} />
                    {openn && (<DropdownMenu id={'idFigtwo'}>{!openn}</DropdownMenu>)}
                        <img src={empty_state} id='imgEmptyStateThree' style={{maxWidth:'100%', maxHeight:'70%', display: 'block',marginLeft:'auto',marginRight:'auto'}}/>                    
                            <div className='badge text-wrap text-dark position-absolute bottom-0 start-50 translate-middle-x' id='divEmptyStateThree'>
                                <p className='fs-5 fw-normal'>Aucune donnée n’est disponible dans la période choisie. 2</p>
                            </div> 
            </div>             
            </div>
        </div>                    
    )
}

export default TwoFigures;