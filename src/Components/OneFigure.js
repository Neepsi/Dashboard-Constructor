import '../styles/block.css'
import three_dots from '../images/three_dots.png'
import delete_icon from '../images/delete_icon.png'
import edit_icon from '../images/edit_icon.png'
import { useState, useRef, useEffect } from 'react'
import EChartsReact from 'echarts-for-react'

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

    const options = {
        grid: { top: 8, right: 8, bottom: 24, left: 65 },
        xAxis: {
          type: 'category',
          data:  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320, 1400, 1500, 1700, 2000, 800],
            type: 'bar',
            smooth: true,
          },
        ],
        tooltip: {
          trigger: 'axis',
        },
    };

    return(    
        <div className='container mb-5' id={'subFig'+idFigure}>
            <div className='row'>   

            <div className={`col bg-secondary m-2 rounded position-relative shadow-sm p-3 mb-3 ${bgColor}`}style={{height:'285px'}}>
                    <div ref={menuRef}>
                    <img src={three_dots} id="threedot-icon" onClick={()=>setOpen(!open)} />
                    <div className='me-5'>
                        <EChartsReact option={options} />
                    </div> 
                    {open && (<DropdownMenu></DropdownMenu>)} 
                    </div>                                                                                                                       
                                           
                    
            </div>
                               
            </div>
        </div>                    
    )
}

export default OneFigure;