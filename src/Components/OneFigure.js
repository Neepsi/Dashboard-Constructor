import '../styles/block.css'
import three_dots from '../images/three_dots.png'
import delete_icon from '../images/delete_icon.png'
import edit_icon from '../images/edit_icon.png'
import { useState, useRef, useEffect } from 'react'
import React from 'react'
import EChartsReact from 'echarts-for-react'

function OneFigure({ bgColor, idFigure, toggleverif, editpopup, option }) {  
    const [open, setOpen] = useState(false)
    let menuRef = useRef()

    useEffect(() => {
        let handler = (event) => {
            if(!menuRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handler)
        
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    })

    const DropdownMenu = () => {
        const DropdownItem = (props) => {
            return(
                <div className='menu-item'>
                    <img src={props.name} id='img-test'/> {props.children}                
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
        <div className='container mb-5' id={'subFig'+idFigure}>
            <div className='row'>   
                <div className={`col bg-secondary m-2 rounded position-relative shadow-sm p-3 mb-3 ${bgColor}`} style={{height:'340px'}}>
                    <div ref={menuRef}>
                        <img src={three_dots} id='threedot-icon' onClick={() => setOpen(!open)} />
                        <div className='me-5'>
                            <EChartsReact option={option} />
                        </div>
                        {open && (<DropdownMenu></DropdownMenu>)} 
                    </div>                                                                                                                                         
                </div>                              
            </div>
        </div>                    
    )
}

export default OneFigure