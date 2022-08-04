import '../styles/block.css'
import three_dots from '../images/three_dots.png'
import delete_icon from '../images/delete_icon.png'
import edit_icon from '../images/edit_icon.png'
import { useState } from 'react'
import EChartsReact from 'echarts-for-react'

function TwoFigures({ bgColor, idFigure, idfigone, idfigtwo, deletefunc, orderfunc, editpopup }) {  
    const [open,setOpen] = useState(false);
    const [openn,setOpenn] = useState(false);
    
    const DropdownMenu = (props) => {           
        const DropdownItem = (props) => {               
            return(
                <div className='menu-item'>
                    <img src={props.name} id="img-test"/> {props.children}                
                </div>
            )           
        }

        const handleClick = () => {   
            orderfunc();
            deletefunc();            
        }

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

    const option = {
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
    };

    return(    
        <div className='container mb-3'>    
            <div className='row' id={"subFig"+idFigure}>   
                <div className={`col bg-secondary m-2 rounded position-relative shadow-sm p-3 mb-3 ${bgColor}`} id={"figo"+idfigone} style={{height:'285px'}}>
                    <img src={three_dots} id="threedot-icon" onClick={()=>setOpen(!open)} />
                        {open && (<DropdownMenu id={'idFigone'}>{!open} </DropdownMenu>)}
                        <div className='me-5'>
                            <EChartsReact option={option} />
                        </div> 
                </div>

                <div className= {`col bg-secondary m-2 rounded position-relative shadow-sm p-3 mb-3 ${bgColor}`} id={"figt"+idfigtwo} style={{height:'285px'}}>                    
                    <img src={three_dots} id="threedot-icon" onClick={()=>setOpenn(!openn)} />
                        {openn && (<DropdownMenu id={'idFigtwo'}>{!openn}</DropdownMenu>)}
                        <div className='me-5'>
                            <EChartsReact option={option} />
                        </div> 
                </div>             
            </div>
        </div>                    
    )
}

export default TwoFigures;