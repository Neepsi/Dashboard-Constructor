import Zone from './Zone'
import Graphe from './Graphe'
import Donnees from './Donnees'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/edit.css'

function AddBloc({ selectedZone, setSelectedZone, graph, selectedGraph, setSelectedGraph, figTitle, setFigTitle, option }) {
  return (
    <div className='d-flex flex-column'>
      <div>
        <div className='mb-5'>
          <Zone selectedZone={selectedZone} setSelectedZone={setSelectedZone} />
        </div>
        <div className='mb-5'>
          <Graphe graph={graph} selectedGraph={selectedGraph} setSelectedGraph={setSelectedGraph} setFigTitle={setFigTitle} />     
        </div> 
        <div className='mb-2'>
          <Donnees selectedGraph={selectedGraph} figTitle={figTitle} setFigTitle={setFigTitle} option={option} />
        </div>
      </div>    
    </div>
  )
}

export default AddBloc