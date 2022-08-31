import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import Generalites from "./Components/Generalites";
import Delais from "./Components/Delais";
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {  
  return (
  <Router>
    <div className="App">
       <Routes>
          <Route path='/' element={<Generalites route='generalites' />}></Route>
          <Route path='/generalites' element={<Generalites route='generalites' />}></Route>
          <Route path='/delais' element={<Delais route='delais' />}></Route>  
       </Routes>                          
    </div>
  </Router>
  );
}

export default App;