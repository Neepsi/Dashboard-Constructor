import '../styles/block.css'
import empty_state from '../images/empty_state.png'
import three_dots from '../images/three_dots.png'
import delete_icon from '../images/delete_icon.png'
import edit_icon from '../images/edit_icon.png'
import {  useState,useEffect, useRef } from 'react'
import Verification from './Verification'

function OneFigure({ bgColor,idFigure,toggleverif,editpopup}) {  
    const [open,setOpen] = useState(false);
    let menuRef= useRef()

    useEffect(()=>{
        let handler = (event) =>{
            if(!menuRef.current.contains(event.target))
            {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown",handler);
        
        return ()=>
        {
            document.removeEventListener("mousedown",handler)
        }
    })

    const DropdownMenu = () =>
    {
        const DropdownItem = (props) =>
        {
            return(
                <div className='menu-item'>
                <img src={props.name} id="img-test"/> {props.children}                
                </div>
            )
        }
               
        return(
            <div className='dropdownmenu'>
                <div onClick={toggleverif}>
                    <DropdownItem name={delete_icon}>Supprimer</DropdownItem>                                     
                </div>
                    {!open}
                <div onClick={editpopup}>
                    <DropdownItem name={edit_icon}>Modifier</DropdownItem>
                </div>  
            </div>
        )
       
    }
    return(    
        <div className='container' id={"subFig"+idFigure}>
            <div className='row'>   

            <div className={`col bg-secondary m-2 rounded position-relative shadow-sm p-3 mb-3 ${bgColor}`}style={{height:'285px'}}>
                    <div ref={menuRef}>
                    <img src={three_dots} id="threedot-icon" onClick={()=>setOpen(!open)} />
                    {open && (<DropdownMenu></DropdownMenu>)} 
                    </div>                                                                                                                       
                                           
                    <img src={empty_state} style={{maxWidth:'100%', maxHeight:'100%',width:'19rem', display: 'block',marginLeft:'auto',marginRight:'auto'}}/>                                                                              
                        <div className='badge text-wrap text-dark position-absolute bottom-0 start-50 translate-middle-x ' id='divEmptyStateOne' >
                            <p className='fs-2 fw-normal' style={{display: 'block'}}>Aucune donnée n’est disponible dans la période choisie.</p>
                        </div>
            </div>
                               
            </div>
        </div>                    
    )
}

export default OneFigure;