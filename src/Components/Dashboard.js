import '../styles/dashboard.css'
import React,{ useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Modal, Button } from 'react-bootstrap'
import Blocs from './Blocs'
import Header from './Header'
import AddBloc from './AddBloc'
import OneFigure from './OneFigure'
import TwoFigures from './TwoFigures'
import option from '../data/graph.json'
import Verification from './Verification'

function Dashboard() {   
    const [selectedGraph, setSelectedGraph] = useState(-1)
    const [selectedZone, setSelectedZone] = useState(0)
    const [graph, setGraph] = useState(sampleGraph)

    const [hiddenBlocks, setHiddenBlocks] = useState()
    const [inputList, setInputList] = useState([])
    const [show, setShow] = useState(false)
    const [showedit, setShowEdit] = useState(false)
    const [getid,setGetId] = useState()
    const [menuId,setMenuId] = useState()

    const listId = (inputList.length > 0) ? inputList.length : 0   
    const handleClose = () => {setShow(false); setSelectedGraph(-1);}
    const handleCloseEdit =() =>{setShowEdit(false);setSelectedGraph(-1)}
    const handleShow = () => setShow(true)
    const handleShowEdit = (event,param) => {setShowEdit(true); setMenuId(event.target.id); setGetId(param);}  
    

    const [modal, setModal] = useState(false)
    const [modalTwo, setModalTwo] = useState(false)
    const [funcUsed,setFuncUsed] = useState(false);

    const toggleModal = (e) => {
        setModal(!modal)
        setGetId(e)        
    }

    const toggleModalTwo = (event,param) => {
        setModalTwo(!modalTwo)
        setGetId(param)        
        setMenuId(event.target.id)   
    }

    const handleOnDragEnd = (result) => {
        const items = Array.from(inputList)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        setInputList(items)
    }  
    
    const handleDelete = () => {                      
        let i = 1
        let arr = inputList.filter(x => x.id !== getid)        
        arr.forEach(e => e.id = i++)
        setInputList(arr)
        setModal(false)
    }

    const listerFigures = () => {
        let i = 1
        inputList.map(e => e.id = i++)
    }

    const deleteFigOne = () => {   
        /*let i = 1, ar = [], newdata=[], posi = inputList.indexOf(inputList[getid-1])

        ar = inputList.splice(posi, 1, {id: getid, oneBlockVisi: true, twoBlockVisi: false})
        inputList.map(e => newdata.push(e))      
        setInputList(newdata)
        setModalTwo(false)*/         
        let v=''
        inputList.map((x,index)=>(x.id==getid) &&  ((v=index)))
        let figOne = inputList[v].option1, figTwo = inputList[v].option2;
        if(menuId === 'one')
        {
            if(inputList[v].option2==='')
            {
                inputList.splice(v,1,{id: getid, oneBlockVisi: true, twoBlockVisi: false, option: ''})
                setInputList(inputList)
                setModalTwo(false)
            }
            else
            {
                inputList.splice(v,1,{id: getid, oneBlockVisi: true, twoBlockVisi: false, option: figTwo})
                setInputList(inputList)
                setModalTwo(false)
            }
            
        }
        else
        {
            inputList.splice(v,1,{id: getid, oneBlockVisi: true, twoBlockVisi: false, option: figOne})
            setInputList(inputList)
            setModalTwo(false)
        }
    }

    const deleteOneFig = () => {            
        deleteFigOne()
    } 

    const addBloc = () => {
        let newFig = (selectedZone === 1) ? {id: listId+1, oneBlockVisi: true, twoBlockVisi: false, option: option[selectedGraph]} : {id: listId+1, oneBlockVisi: false, twoBlockVisi: true, option1: option[selectedGraph], option2: ''}
        let newArr = inputList.concat(newFig)
        setInputList(newArr)
        setHiddenBlocks('none')
        handleClose()
    }

    const editOnefig= () =>
    {   let v=''
        inputList.map((x,index)=>(x.id==getid) &&  ((v=index)))
        if(inputList[v].oneBlockVisi===true)
        {            
            inputList[v].option=option[selectedGraph];
            setInputList(inputList);
            handleCloseEdit();
            
        }
        else
        {
            if(menuId==='one')
            {
                inputList[v].option1=option[selectedGraph];
                setInputList(inputList);
                handleCloseEdit();
            }
            else
            {
                inputList[v].option2=option[selectedGraph];
                setInputList(inputList);
                handleCloseEdit();
            }            
        }    
        
           
    }
    
    (modal) ? document.body.classList.add('active-modal') : document.body.classList.remove('active-modal')

    return (            
        <div>
            <Header />      
            <button className='btn btn-primary mx-2' onClick={handleShow}>Ajouter bloc</button>   

            <Blocs oneBlockVisi={hiddenBlocks} twoBlockVisi={hiddenBlocks} />  
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='charts'>
                        {(provided) => (
                            <ul className='charts list-unstyled' {...provided.droppableProps} ref={provided.innerRef}>                                                            
                                {inputList.map((list, index) =>                                
                                    <Draggable key={list.id} draggableId={list.id.toString()} index={index}>                                                                                
                                        {(provided,snapshot)=>(                                            
                                            <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} id="figs">                                               
                                                {(list.oneBlockVisi) ? 
                                                  <OneFigure option={list.option} idFigureOne={list.id} idFigure={list.id} toggleverif={()=>toggleModal(list.id)} editpopup={event=>handleShowEdit(event,list.id)} bgColor={snapshot.isDragging ? 'bg-light' : 'bg-body'} reference={() => handleDelete(list.id)}/> 
                                                : <TwoFigures option1={list.option1} option2={list.option2} bgColor={snapshot.isDragging ? 'bg-light' : 'bg-body'} openVerif={event=>toggleModalTwo(event,list.id)} editpopup={event=>handleShowEdit(event,list.id)} idFigure={list.id} idfigone={list.id}  idfigtwo={list.id}/>                                                
                                                }                                                
                                            </li>                                            
                                        )}                                        
                                    </Draggable>
                                )}
                                {modal && <Verification toggleveri={()=>toggleModal()} deleteFig={()=>handleDelete()}/>}
                                {modalTwo && <Verification toggleveri={()=>toggleModalTwo()} deleteFig={()=>deleteOneFig()} />}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>

                <Modal show={show} onHide={handleClose} scrollable={true} centered size='xl'>
                    <Modal.Header closeButton>
                        <Modal.Title>Paramètres du bloc</Modal.Title>
                    </Modal.Header>      

                    <Modal.Body className='modal-scroll'>
                        <AddBloc option={option} selectedZone={selectedZone} setSelectedZone={setSelectedZone} graph={graph} selectedGraph={selectedGraph} setSelectedGraph={setSelectedGraph} />
                    </Modal.Body>
                
                    <Modal.Footer>
                        <Button variant='primary' onClick={addBloc}>Ajouter bloc</Button>                    
                    </Modal.Footer>
            </Modal>

            <Modal show={showedit} onHide={handleCloseEdit} scrollable={true} centered size='xl'>
                    <Modal.Header closeButton>
                        <Modal.Title>Paramètres du bloc</Modal.Title>
                    </Modal.Header>      

                    <Modal.Body className='modal-scroll'>
                        <AddBloc option={option} selectedZone={selectedZone} setSelectedZone={setSelectedZone} graph={graph} selectedGraph={selectedGraph} setSelectedGraph={setSelectedGraph} />
                    </Modal.Body>
                
                    <Modal.Footer>
                        <Button variant='primary' onClick={editOnefig}>Modifier</Button>                    
                    </Modal.Footer>
            </Modal>
                                                     
        </div>
    )
}

const sampleGraph = [
    {name: 'Scatter', src: 'scatter.png'}, 
    {name: 'Bar', src: 'bar-chart.png'},
    {name: 'Horizontal bar', src: 'horizontal-bar-chart.png'},
    {name: 'Pie', src: 'pie-chart.png'},
    {name: 'Sunburst', src: 'sunburst.png'},
    {name: 'Treemap', src: 'treemap-chart.png'},
    {name: 'Table', src: 'table.png'},
    {name: 'Indicator', src: ''},
]

export default Dashboard