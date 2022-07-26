import { Button } from 'bootstrap';
import './Test.css';
import Blocks from './Blocks';
import { useId, useState } from 'react';
import Header from './Header';
import Figures from './Figures';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Test = () =>
{   const [hiddenBlocks, setHiddenBlocks] = useState();
    const [inputList, setInputList] = useState(tempData);
    const listId = (inputList.length > 0) ? inputList[inputList.length-1].id : 1

    function handleOnDragEnd(result)
    {
        const items = Array.from(inputList);
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index,0,reorderedItem);
        setInputList(items);
    }
    const addOneBlock =()=>
    {        
        let newFig = {id: listId+1, oneBlockVisi: true, twoBlockVisi: false}
        let newArr = inputList.concat(newFig);
        setInputList(newArr);
        setHiddenBlocks("none");
    }
    const addTwoBlocks =()=>
    {
        let newFig = {id: listId+1, oneBlockVisi: false, twoBlockVisi: true}
        let newArr = inputList.concat(newFig);
        setInputList(newArr);
        setHiddenBlocks("none");
    }

    return (            
            <div>
                <Header />    
                <button class="m-2" id='btnone' onClick={addOneBlock}>Changer Emplacement</button>
                <button id='btntwo' onClick={addTwoBlocks}>Ajouter Figure</button>                    
                <Blocks oneBlockVisi={hiddenBlocks} twoBlockVisi={hiddenBlocks}/>  
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId='charts'>
                                {(provided)=>(
                        <ul className='charts list-unstyled' {...provided.droppableProps} ref={provided.innerRef}>
                            {inputList.map((list,index) => 
                                <Draggable key={list.id} draggableId={list.id.toString()} index={index}>
                                    {(provided)=>(
                                <li key={list.id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                    {(list.oneBlockVisi) ? <Figures twoBlockVisi={"none"} /> : <Figures oneBlockVisi={"none"} /> }
                                </li>
                                )}
                                </Draggable>
                            )}
                            {provided.placeholder}
                        </ul>
                        )}
                            </Droppable>
                        </DragDropContext>                                                        
            </div>
    )
}

const tempData = []

export default Test;