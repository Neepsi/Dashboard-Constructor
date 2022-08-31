import React from 'react'
import '../styles/block.css'
import EChartsReact from 'echarts-for-react'
import edit_icon from '../images/edit_icon.png'
import three_dots from '../images/three_dots.png'
import empty_state from '../images/empty_state.png'
import delete_icon from '../images/delete_icon.png'
import { useState, useRef, useEffect } from 'react'

function OneFigure({ bgColor, idFigure, toggleverif, editpopup, option, graph, selectedGraph}) {  
    const [open, setOpen] = useState(false)
    let menuRef = useRef()

    useEffect(() => {
        let handler = (event) => { if(!menuRef.current.contains(event.target)) setOpen(false) }

        document.addEventListener('mousedown', handler)
        
        return () => { document.removeEventListener('mousedown', handler) }
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
                <div className={`col bg-secondary m-2 position-relative rounded shadow-sm p-3 mb-3 ${bgColor}`} style={{height:(selectedGraph === 3) ? '300px' : '400px'}}>
                    <div ref={menuRef}>
                        <img src={three_dots} id='threedot-icon' onClick={() => setOpen(!open)} />
                        {option === '' ?     
                            <>                   
                                <img src={empty_state} style={{maxWidth:'100%', maxHeight:'50%', display: 'block', marginLeft:'auto', marginRight:'auto', height: '200px'}}/>
                                <div className='badge text-wrap text-dark position-absolute bottom-0 start-50 translate-middle-x' id='divEmptyStateTwo'>
                                    <p className='fs-5 fw-normal' id='texxt'>Aucune donnée n’est disponible.</p>
                                </div> 
                            </> : <div className='me-5' id='oneFigEdit'> 
                                    <EChartsReact option={option} notMerge={true} /> 
                                </div>
                            }
                        {open && (<DropdownMenu></DropdownMenu>)} 
                    </div>                                                                                                                                         
                </div>                              
            </div>
        </div>                    
    )
}

export default OneFigure