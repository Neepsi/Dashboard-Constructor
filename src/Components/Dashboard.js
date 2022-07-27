import '../Styles/dashboard.css';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Modal, Button } from 'react-bootstrap';
import Blocks from './Blocks';
import Header from './Header';
import Figures from './Figures';
import Edit from './Edit';

function Test() {   
    const [hiddenBlocks, setHiddenBlocks] = useState();
    const [inputList, setInputList] = useState(tempData);
    const [show, setShow] = useState(false)
    const listId = (inputList.length > 0) ? inputList.length : 0

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleOnDragEnd = (result) => {
        const items = Array.from(inputList);
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem);
        setInputList(items);
    }

    const addOneBlock = () => {        
        let newFig = {id: listId+1, oneBlockVisi: true, twoBlockVisi: false}
        let newArr = inputList.concat(newFig);
        setInputList(newArr);
        setHiddenBlocks('none');
        
    }

    const addTwoBlocks = () => {
        let newFig = {id: listId+1, oneBlockVisi: false, twoBlockVisi: true}
        let newArr = inputList.concat(newFig);
        setInputList(newArr);
        setHiddenBlocks('none');        
    }    

    return (            
        <div>
            <Header />    

            <button class='m-2' id='btnone' onClick={addOneBlock}>Changer Emplacement</button>
            <button id='btntwo' onClick={addTwoBlocks}>Ajouter Figure</button>  
            <button className='btn btn-primary mx-2' onClick={handleShow}>Ajouter bloc</button>

            <Blocks oneBlockVisi={hiddenBlocks} twoBlockVisi={hiddenBlocks} />  
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='charts'>
                        {(provided)=>(
                            <ul className='charts list-unstyled' {...provided.droppableProps} ref={provided.innerRef}>
                                {inputList.map((list,index) => 
                                    <Draggable key={list.id} draggableId={list.id.toString()} index={index}>
                                        {(provided,snapshot)=>(
                                            <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                                                {(list.oneBlockVisi) ? <Figures twoBlockVisi={'none'} bgColor={snapshot.isDragging ? 'bg-light' : 'bg-body'} /> : <Figures oneBlockVisi={'none'} bgColor={snapshot.isDragging ? 'bg-light' : 'bg-body'}/> }                                                                                                      
                                            </li>
                                        )}                                        
                                    </Draggable>
                                )}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>

                <Modal show={show} onHide={handleClose} scrollable={true} centered size='xl'>
                    <Modal.Header closeButton>
                        <Modal.Title>Parametres du bloc</Modal.Title>
                    </Modal.Header>                                                       
                    <Modal.Body>
                        <Edit />
                    </Modal.Body>
                
                    <Modal.Footer>
                        <Button variant='primary' onClick={handleClose}>Ajouter bloc</Button>
                    </Modal.Footer>
            </Modal>                                              
        </div>
    )
}

const tempData = []

export default Test;