import '../styles/dashboard.css';
import React,{ useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Modal, Button } from 'react-bootstrap';
import Blocs from './Blocs';
import Header from './Header';
import AddBloc from './AddBloc';
import OneFigure from './OneFigure';
import TwoFigures from './TwoFigures';
import Verification from './Verification';

function Dashboard() {   
    const [selectedGraph, setSelectedGraph] = useState(-1)
    const [selectedZone, setSelectedZone] = useState(1)
    const [graph, setGraph] = useState(sampleGraph)

    const [hiddenBlocks, setHiddenBlocks] = useState();
    const [inputList, setInputList] = useState([]);
    const [show, setShow] = useState(false);
    const [getid,setGetId] = useState();

    const listId = (inputList.length > 0) ? inputList.length : 0;   


    const handleClose = () => {setShow(false); setSelectedGraph(-1)}
    const handleShow = () => setShow(true)
    const editShow = () => setShow(true)    
    
    const [modal, setModal] = useState(false);
    const [modalTwo, setModalTwo] = useState(false);

    const toggleModal = (e) => {
        setModal(!modal)
        setGetId(e)        
    }

    const toggleModalTwo = (e) => {
        setModalTwo(!modalTwo)
        setGetId(e)        
    }

    const handleOnDragEnd = (result) => {
        const items = Array.from(inputList);
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem);
        setInputList(items);
    }  
    
    const handleDelete = () => {                      
        let i = 1;
        let arr = inputList.filter(x => x.id !== getid);        
        arr.forEach(e => e.id = i++)
        setInputList(arr)
        setModal(false)
    }

    const listerFigures = () => {
        let i = 1;
        inputList.map(e => e.id = i++);
    }

    const deleteFigOne = () => {   
        let i = 1, ar = [], newdata=[], posi = inputList.indexOf(inputList[getid-1])

        ar = inputList.splice(posi, 1, {id: getid, oneBlockVisi: true, twoBlockVisi: false})
        inputList.map(e => newdata.push(e))      
        setInputList(newdata)
        setModalTwo(false)           
    }

    const deleteOneFig = () => {    
        listerFigures();
        deleteFigOne();
    } 

    const addBloc = () => {
        let newFig = (selectedZone === 1) ? {id: listId+1, oneBlockVisi: true, twoBlockVisi: false} : {id: listId+1, oneBlockVisi: false, twoBlockVisi: true}
        let newArr = inputList.concat(newFig);
        setInputList(newArr);
        setHiddenBlocks('none');

        handleClose()
    }

    (modal) ? document.body.classList.add('active-modal') : document.body.classList.remove('active-modal')

    return (            
        <div>
            <Header />      
            <button className='btn btn-primary mx-2' onClick={handleShow}>Ajouter bloc</button>   

            <Blocs oneBlockVisi={hiddenBlocks} twoBlockVisi={hiddenBlocks} />  
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='charts'>
                        {(provided)=>(
                            <ul className='charts list-unstyled' {...provided.droppableProps} ref={provided.innerRef}>                                                            
                                {inputList.map((list,index) =>                                
                                    <Draggable key={list.id} draggableId={list.id.toString()} index={index}>                                                                                
                                        {(provided,snapshot)=>(                                            
                                            <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} id="figs">                                               
                                                {(list.oneBlockVisi) ? 
                                                  <OneFigure idFigureOne={list.id} idFigure={list.id} toggleverif={()=>toggleModal(list.id)} editpopup={()=>editShow()} bgColor={snapshot.isDragging ? 'bg-light' : 'bg-body'} reference={() => handleDelete(list.id)}/> 
                                                : <TwoFigures bgColor={snapshot.isDragging ? 'bg-light' : 'bg-body'} deletefunc={()=>toggleModalTwo(list.id)} editpopup={()=>editShow()} idFigure={list.id} idfigone={list.id} orderfunc={listerFigures} idfigtwo={list.id}/>                                                
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
                        <AddBloc selectedZone={selectedZone} setSelectedZone={setSelectedZone} graph={graph} selectedGraph={selectedGraph} setSelectedGraph={setSelectedGraph} />
                    </Modal.Body>
                
                    <Modal.Footer>
                        <Button variant='primary' onClick={addBloc}>Ajouter bloc</Button>
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

export default Dashboard;