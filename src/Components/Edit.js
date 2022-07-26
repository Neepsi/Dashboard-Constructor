import React, { useState } from "react";
import Zone from "./Zone";
import Graphe from "./Graphe";
import Donnees from "./Donnees";
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'

function Edit() {
  const [graphe, setGraphe] = useState(sampleGraphe)

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <div>
        <div className="mb-5">
          <Zone />
        </div>
        <div className="mb-5">
          <Graphe graphe={graphe} />     
        </div> 
        <div>
          <Donnees />
        </div>
      </div>    </div>
  );
}

const sampleGraphe = [{name: 'Bar Chart', src: 'bar-chart.png'}, {name: 'Line Chart', src: 'line-chart.png'}, {name: 'Bubble Chart', src: 'bubble-graph.png'}, {name: 'Doughnut', src: 'doughnut.png'}, {name: 'Pie', src: 'pie-chart.png'}, {name: 'Scatter', src: 'scatter.png'}, {name: 'Stacked Bar', src: 'stacked.png'}, {name: 'Radar', src: 'analytic-graph.png'}]

export default Edit;