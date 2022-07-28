import React, { useState } from 'react';
import Zone from './Zone';
import Graphe from './Graphe';
import Donnees from './Donnees';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/edit.css'

function AddBloc() {
  const [graph, setGraph] = useState(sampleGraph)
  const [selectedGraph, setSelectedGraph] = useState(-1)

  return (
    <div className='d-flex flex-column'>
      <div>
        <div className='mb-5'>
          <Zone />
        </div>
        <div className='mb-5'>
          <Graphe graph={graph} selectedGraph={selectedGraph} setSelectedGraph={setSelectedGraph} />     
        </div> 
        <div>
          <Donnees selectedGraph={selectedGraph} />
        </div>
      </div>    
    </div>
  );
}

const sampleGraph = [
  {name: 'Scatter', src: 'scatter.png'}, 
  {name: 'Bar', src: 'bar-chart.png'},
  {name: 'Horizaontal bar', src: 'horizontal-bar-chart.png'},
  {name: 'Pie', src: 'pie-chart.png'},
  {name: 'Sunburst', src: 'sunburst.png'},
  {name: 'Treemap', src: 'treemap-chart.png'},
  {name: 'Table', src: 'table.png'},
  {name: 'Indicator', src: ''},
]

export default AddBloc;