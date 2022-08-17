import '../styles/block.css'
import three_dots from '../images/three_dots.png'
import delete_icon from '../images/delete_icon.png'
import edit_icon from '../images/edit_icon.png'
import React,{ useState, useRef, useEffect } from 'react'
import EChartsReact from 'echarts-for-react'
import empty_state from '../images/empty_state.png'

function TwoFigures({ bgColor, idFigure, idfigone, idfigtwo, deletefunc, orderfunc, editpopup, option1, option2 }) {  
    const [open, setOpen] = useState(false)
    const [openn, setOpenn] = useState(false)

    let menuRef = useRef()
    let menuRefTwo = useRef()

    useEffect(() => {
        let handler = (event) => { if(!menuRef.current.contains(event.target)) setOpen(false) }

        let handlerTwo = (event) => { if(!menuRefTwo.current.contains(event.target)) setOpenn(false) }

        document.addEventListener('mousedown', handler)
        document.addEventListener('mousedown', handlerTwo)
        
        return () => {
            document.removeEventListener('mousedown', handler)
            document.removeEventListener('mousedown', handlerTwo)
        }
    })

    const DropdownMenu = (props) => {           
        const DropdownItem = (props) => {               
            return(
                <div className='menu-item'>
                    <img src={props.name} id='img-test'/> {props.children}                
                </div>
            )           
        }

        const handleClick = () => { orderfunc(); deletefunc() }

        return(
            <div className='dropdownmenu'>
                <div onClick={() => handleClick()}>
                    <DropdownItem name={delete_icon}>Supprimer</DropdownItem>
                </div>
                <div onClick={editpopup}>
                    <DropdownItem name={edit_icon}>Modifier</DropdownItem>
                </div>                               
            </div>
        )       
    }    

    return(    
        <div className='container mb-3'>  
            <div className='row' id={'subFig'+idFigure}>                   
            <div className={`col bg-secondary m-2 rounded position-relative shadow-sm p-3 mb-3 ${bgColor}`} id={'figo'+idfigone} style={{height:'340px'}}>
                <div ref={menuRef}>
                    <img src={three_dots} id='threedot-icon' onClick={()=>setOpen(!open)} />
                    <div className='me-5'>
                            <EChartsReact option={option1} />
                        </div>
                        {open && (<DropdownMenu id={'idFigone'}>{!open} </DropdownMenu>)}
                    </div>
                </div>

                <div className= {`col bg-secondary m-2 rounded position-relative shadow-sm p-3 mb-3 ${bgColor}`} id={'figt'+idfigtwo} style={{height:'340px'}}>                    
                    <div ref={menuRefTwo}>
                        <img src={three_dots} id='threedot-icon' onClick={() => setOpenn(!openn)} />
                        {option2 === '' ?     
                            <>                   
                                <img src={empty_state} style={{maxWidth:'100%', maxHeight:'50%', display: 'block', marginLeft:'auto', marginRight:'auto', height: '200px'}}/>
                                <div className='badge text-wrap text-dark position-absolute bottom-0 start-50 translate-middle-x' id='divEmptyStateTwo'>
                                    <p className='fs-5 fw-normal' id='texxt'>Aucune donnée n’est disponible.</p>
                                </div> 
                            </> :
                                <div className='me-5'>
                                    <EChartsReact option={option2} />
                                </div>}
                        {openn && (<DropdownMenu id={'idFigtwo'}>{!openn}</DropdownMenu>)}                 
                    </div>                      
                </div>             
            </div>
        </div>                    
    )
}

export default TwoFigures