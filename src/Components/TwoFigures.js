import '../styles/block.css'
import three_dots from '../images/three_dots.png'
import delete_icon from '../images/delete_icon.png'
import edit_icon from '../images/edit_icon.png'
import React,{ useState, useRef, useEffect } from 'react'
import EChartsReact from 'echarts-for-react'
import empty_state from '../images/empty_state.png'
import Table from './Table'
import Indicator from './Indicator'

function TwoFigures({ bgColor, idFigure, idfigone, idfigtwo, editpopup, option1, option2, openVerif, selectedGraph }) {  
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
                <div className='menu-item' id={props.id_menu}>
                    <img src={props.name} id='img-test'/> {props.children}                
                </div>
            )           
        }

        return(
            <div className='dropdownmenu'>
                <div onClick={openVerif}>
                    <DropdownItem name={delete_icon} id_menu={props.num}>Supprimer</DropdownItem>
                </div>
                <div onClick={editpopup}>
                    <DropdownItem name={edit_icon} id_menu={props.num}>Modifier</DropdownItem>
                </div>                               
            </div>
        )       
    }    

    return(    
        <div className='container mb-3'>  
            <div className='row' id={'subFig'+idFigure}>                   
                <div className={`col bg-secondary m-2 rounded position-relative shadow-sm p-3 mb-3 ${bgColor}`} id={'figo'+idfigone} style={{height: selectedGraph === 7 ? '350px' : '400px'}}>
                    <div ref={menuRef}>
                        <img src={three_dots} id='threedot-icon' onClick={()=>setOpen(!open)} />
                        <div className='me-5'>
                            { (selectedGraph === 6) ? <Table libelleFigure={option1.libelleFigure} table={option1.table} data={option1.data} />
                            : (selectedGraph === 7) ? <Indicator libelleFigure={option1.libelleFigure} indicator={option1.indicator} indicatorValue={option1.indicatorValue} /> 
                            : <EChartsReact option={option1} notMerge={true} style={{height: '360px'}} /> } 
                        </div>
                        { open && (<DropdownMenu id={'idFigone'} num='one'>{!open} </DropdownMenu>) }                      
                    </div>                 
                </div>

                <div className= {`col bg-secondary m-2 rounded position-relative shadow-sm p-3 mb-3 ${bgColor}`} id={'figt'+idfigtwo} style={{height: selectedGraph === 7 ? '350px' : '400px'}}>                    
                    <div ref={menuRefTwo}>
                        <img src={three_dots} id='threedot-icon' onClick={() => setOpenn(!openn)} />
                        {option2 === '' ?     
                            <>                   
                                <img src={empty_state} style={{maxWidth:'100%', maxHeight:'50%', display: 'block', marginLeft:'auto', marginRight:'auto', height: '200px'}}/>
                                <div className='badge text-wrap text-dark position-absolute bottom-0 start-50 translate-middle-x' id='divEmptyStateTwo'>
                                    <p className='fs-5 fw-normal' id='texxt'>Aucune donnée n’est disponible.</p>
                                </div> 
                            </> : (selectedGraph === 6) ? <Table libelleFigure={option2.libelleFigure} table={option2.table} data={option2.data} />
                                : (selectedGraph === 7) ? <Indicator libelleFigure={option2.libelleFigure} indicator={option2.indicator} indicatorValue={option2.indicatorValue} /> 
                                : <div className='me-5'>
                                        <EChartsReact option={option2} notMerge={true} style={{height: '360px'}} />
                                    { openn && (<DropdownMenu id={'idFigone'} num='one'>{!openn} </DropdownMenu>) }
                                </div>}
                        {openn && (<DropdownMenu id={'idFigtwo'} num='two'>{!openn}</DropdownMenu>)}                 
                    </div>                      
                </div>             
            </div>
        </div>                    
    )
}

export default TwoFigures
